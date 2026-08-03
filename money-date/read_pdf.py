import os
import pypdf

base_dir = r"c:\Users\dell\Desktop\Sylver\CODE PROJECTS\Nextjs Projects\money-date"
pdf_path = os.path.join(base_dir, "COLOR&TYPOGRAPHY SYSTEM.pdf")

if not os.path.exists(pdf_path):
    pdf_path = os.path.join(base_dir, "money-date2.0", "drive-download-20260801T212507Z-1-001", "COLOR&TYPOGRAPHY SYSTEM.pdf")

try:
    reader = pypdf.PdfReader(pdf_path)
    lines = []
    for idx, page in enumerate(reader.pages):
        lines.append(f"--- PAGE {idx+1} ---")
        lines.append(page.extract_text())
    
    with open("pdf_content.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print("PDF content written to pdf_content.txt successfully.")
except Exception as e:
    print(f"Error reading PDF: {e}")
