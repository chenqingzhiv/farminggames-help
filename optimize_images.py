#!/usr/bin/env python
"""
Image optimization script for farminggames.help:
1. Convert all JPG/PNG images to WebP format
2. Update all file references (markdown, HTML) from .jpg/.png to .webp
3. Add loading="lazy" to all image tags
"""

import os, subprocess, re, glob, shutil, sys

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))

# ---- Step 1: Find all images ----
image_extensions = ('.jpg', '.jpeg', '.png', '.gif')
all_images = []
for root, dirs, files in os.walk(os.path.join(REPO_ROOT, 'docs')):
    if '.git' in root:
        continue
    for f in files:
        if f.lower().endswith(image_extensions):
            all_images.append(os.path.join(root, f))

print(f"Found {len(all_images)} images to convert")

# ---- Step 2: Convert to WebP ----
# Use the confirmed ffmpeg path
ffmpeg_path = shutil.which('ffmpeg')
if not ffmpeg_path:
    ffmpeg_path = r'C:\Users\37784\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe'

print(f"Using ffmpeg: {ffmpeg_path}")

converted = 0
skipped = 0
errors = []
total = len(all_images)

for i, img_path in enumerate(all_images, 1):
    webp_path = os.path.splitext(img_path)[0] + '.webp'
    if os.path.exists(webp_path):
        try:
            size_jpg = os.path.getsize(img_path)
            size_webp = os.path.getsize(webp_path)
            if size_webp < size_jpg * 0.95:
                skipped += 1
                continue
        except:
            pass

    cmd = [
        ffmpeg_path, '-y', '-i', img_path,
        '-c:v', 'libwebp',
        '-quality', '80',
        '-preset', 'picture',
        webp_path
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        if result.returncode == 0:
            converted += 1
            old_size = os.path.getsize(img_path)
            new_size = os.path.getsize(webp_path)
            pct = (1 - new_size / old_size) * 100
            print(f"  [{i}/{total}] {os.path.basename(img_path)}: {old_size//1024}KB -> {new_size//1024}KB ({pct:.0f}% reduction)")
        else:
            errors.append((img_path, result.stderr[:200]))
    except Exception as e:
        errors.append((img_path, str(e)))

print(f"\nConverted: {converted}, Skipped: {skipped}, Errors: {len(errors)}")
if errors:
    for img, err in errors[:5]:
        bname = os.path.basename(img)
        print(f"  Error on {bname}: {err[:100]}")

# ---- Step 3: Update references in docs files ----
def replace_ext_in_file(filepath, old_ext, new_ext):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    # Markdown: ![alt](path.jpg) -> ![alt](path.webp)
    content = re.sub(
        r'(!\[.*?\]\()([^)]+?)\.' + re.escape(old_ext) + r'(\))',
        r'\1\2.' + new_ext + r'\3', content
    )
    # HTML: <img src="path.jpg"> -> <img src="path.webp">
    content = re.sub(
        r'(<img\s+[^>]*?src=[\"\'])([^\"\']+?)\.' + re.escape(old_ext) + r'([\"\'])',
        r'\1\2.' + new_ext + r'\3', content
    )
    # <a href="path.jpg"> -> <a href="path.webp">
    content = re.sub(
        r'(<a\s+[^>]*?href=[\"\'])([^\"\']+?)\.' + re.escape(old_ext) + r'([\"\'])',
        r'\1\2.' + new_ext + r'\3', content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def add_loading_lazy(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    # Add loading="lazy" to <img> tags that don't have it
    content = re.sub(
        r'(<img\s+[^>]*?src=[\"\'][^\"\']+[\"\'])(?![^>]*?loading=)',
        r'\1 loading="lazy"', content
    )
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

doc_files = []
for ext in ('*.md', '*.html', '*.yml', '*.yaml'):
    doc_files.extend(glob.glob(os.path.join(REPO_ROOT, 'docs', '**', ext), recursive=True))
    doc_files.extend(glob.glob(os.path.join(REPO_ROOT, 'overrides', '**', ext), recursive=True))
doc_files.append(os.path.join(REPO_ROOT, 'mkdocs.yml'))

ref_updates = 0
for filepath in doc_files:
    u1 = replace_ext_in_file(filepath, 'jpg', 'webp')
    u2 = replace_ext_in_file(filepath, 'png', 'webp')
    u3 = replace_ext_in_file(filepath, 'jpeg', 'webp')
    u4 = replace_ext_in_file(filepath, 'gif', 'webp')
    ll = add_loading_lazy(filepath)
    if u1 or u2 or u3 or u4 or ll:
        rel = os.path.relpath(filepath, REPO_ROOT)
        print(f"  Updated refs: {rel}")
        ref_updates += 1

print(f"\nUpdated {ref_updates} files with new references")

# ---- Summary ----
total_webp = len(glob.glob(os.path.join(REPO_ROOT, 'docs', '**', '*.webp'), recursive=True))
total_jpg = len(glob.glob(os.path.join(REPO_ROOT, 'docs', '**', '*.jpg'), recursive=True))
total_png = len(glob.glob(os.path.join(REPO_ROOT, 'docs', '**', '*.png'), recursive=True))
print(f"\n=== Summary ===")
print(f"WebP files: {total_webp}")
print(f"Remaining JPG: {total_jpg}")
print(f"Remaining PNG: {total_png}")
print("Done!")
