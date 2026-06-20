// Auto-load Utterances comments on pages with feedback section
document.addEventListener("DOMContentLoaded", function() {
  // Check if this is a feedback page
  const title = document.querySelector("h1");
  if (title && title.textContent.trim().includes("反馈")) {
    const container = document.createElement("div");
    container.className = "utterances-container";
    container.style.marginTop = "2em";
    container.style.paddingTop = "1em";
    container.style.borderTop = "1px solid var(--md-default-fg-color--lightest)";
    
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", document.querySelector('meta[name="utterances-repo"]')?.content || "chenqingzhiv/farminggames-help");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "feedback");
    script.setAttribute("theme", "preferred-color-scheme");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    
    container.appendChild(script);
    
    // Find the last h1 or main content area to append after
    const article = document.querySelector("article.md-content__inner") || 
                    document.querySelector(".md-content__inner") ||
                    document.querySelector("main .md-content__inner");
    if (article) {
      article.appendChild(container);
    }
  }
});
