import os
from PIL import Image
import shutil

base_dir = r"c:\Users\dell\Desktop\Sylver\CODE PROJECTS\Nextjs Projects\money-date"
src_dir = os.path.join(base_dir, "money-date2.0", "drive-download-20260801T212431Z-1-001")
dest_dir = os.path.join(base_dir, "public", "assets")

os.makedirs(dest_dir, exist_ok=True)

print("Analyzing assets...")
assets_info = []

for file_name in sorted(os.listdir(src_dir)):
    if file_name.endswith(".png"):
        src_path = os.path.join(src_dir, file_name)
        dest_path = os.path.join(dest_dir, file_name)
        
        # Copy to public/assets
        shutil.copy(src_path, dest_path)
        
        try:
            with Image.open(src_path) as img:
                w, h = img.size
                aspect = w / h
                assets_info.append(f"{file_name}: {w}x{h} (Aspect Ratio: {aspect:.2f})")
        except Exception as e:
            assets_info.append(f"{file_name}: Error opening - {e}")

with open("assets_analysis.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(assets_info))

print("Copied all assets to public/assets and wrote analysis to assets_analysis.txt.")
