"""
MkDocs hook: auto-inject Article / FAQPage JSON-LD structured data.

- Article schema on every non-homepage content page (with datePublished when available)
- FAQPage schema on pages whose content contains Q&A sections
- Injects before </head> so it coexists with the WebSite + BreadcrumbList in main.html

Google Rich Results Test: https://search.google.com/test/rich-results
"""
import json
import re
import html as html_mod


def _is_homepage(page):
    """Return True if page is the site homepage."""
    return page.url in ("", "/", "index.md")


def _extract_faq_pairs(markdown_text):
    """Extract Q&A pairs from markdown content.

    Supports two formats:

    1. Bold Q&A (most common):
       **Q: Some question?**
       A: Some answer.

    2. Heading Q&A:
       ### Some question?
       Answer paragraph.
    """
    pairs = []

    # Pattern 1: **Q: ...**  followed by  A: ...
    # Match **Q:** or **Q：** through to the next blank line or heading
    bold_q_pattern = re.compile(
        r'\*\*[Qq][：:]\s*(.+?)\*\*\s*\n+\s*[Aa][：:]\s*(.+?)(?=\n\s*\n|\n##|\n---|\Z)',
        re.DOTALL
    )
    for m in bold_q_pattern.finditer(markdown_text):
        question = m.group(1).strip()
        answer = m.group(2).strip()
        if question and answer:
            pairs.append({"question": question, "answer": answer})

    # Pattern 2: ### Question?  followed by an answer paragraph
    heading_q_pattern = re.compile(
        r'^###\s+([^\n]+?\?)\s*\n+\s*(.+?)(?=\n\s*\n|\n###|\n##|\n---|\Z)',
        re.MULTILINE | re.DOTALL
    )
    for m in heading_q_pattern.finditer(markdown_text):
        question = m.group(1).strip()
        answer = m.group(2).strip()
        if question and answer:
            if len(question) > 15 or question.endswith("?"):
                pairs.append({"question": question, "answer": answer})

    return pairs


def on_page_content(html, page, config, files):
    """Inject Article or FAQPage JSON-LD before </head>."""
    if _is_homepage(page):
        return html

    site_name = config.get("site_name", "Farming Games Help")
    site_url = config.get("site_url", "https://farminggames.help").rstrip("/")
    page_url = page.url.rstrip("/")
    full_url = f"{site_url}/{page_url}" if page_url else site_url

    title = str(page.title or page.meta.get("title", "") or "")
    description_raw = page.meta.get("description", "")
    if description_raw:
        description = str(description_raw)
    else:
        description = f"{title} guide for farming games"

    # Try to parse FAQ pairs from the source markdown
    faq_pairs = []
    try:
        if hasattr(page.file, "abs_src_path") and page.file.abs_src_path:
            with open(page.file.abs_src_path, "r", encoding="utf-8") as f:
                source = f.read()
            faq_pairs = _extract_faq_pairs(source)
    except Exception:
        pass

    if faq_pairs:
        # Build FAQPage schema
        main_entity = []
        for pair in faq_pairs:
            main_entity.append({
                "@type": "Question",
                "name": pair["question"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": pair["answer"],
                },
            })

        schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": main_entity,
        }
    else:
        # Build Article schema for all non-homepage content pages
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": html_mod.unescape(description),
            "author": {
                "@type": "Organization",
                "name": site_name,
            },
            "publisher": {
                "@type": "Organization",
                "name": site_name,
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": full_url,
            },
        }
        date_val = page.meta.get("date", "")
        if date_val:
            schema["datePublished"] = str(date_val)
            schema["dateModified"] = str(date_val)

    script = f'<script type="application/ld+json">{json.dumps(schema, default=str, ensure_ascii=False)}</script>'

    # Since on_page_content receives content HTML (without <head>), just append
    html += f"\n{script}\n"

    return html
