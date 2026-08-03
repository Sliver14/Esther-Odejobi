import zipfile
import xml.etree.ElementTree as ET
import os

def docx_to_text(path):
    if not os.path.exists(path):
        return f"File not found: {path}"
    try:
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            root = ET.fromstring(xml_content)
            
            # Namespace map
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            text_parts = []
            for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                p_text = []
                for run in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                    if run.text:
                        p_text.append(run.text)
                text_parts.append(''.join(p_text))
            
            return '\n'.join(text_parts)
    except Exception as e:
        return f"Error reading {path}: {e}"

# Paths
base_dir = r"c:\Users\dell\Desktop\Sylver\CODE PROJECTS\Nextjs Projects\money-date"
path1 = os.path.join(base_dir, "money-date2.0", "Website content for money date 2.0-1.docx")
path2 = os.path.join(base_dir, "Website Proposal for Money Date.docx")

content1 = docx_to_text(path1)
content2 = docx_to_text(path2)

with open("content1.md", "w", encoding="utf-8") as f:
    f.write(content1)

with open("content2.md", "w", encoding="utf-8") as f:
    f.write(content2)

print("Extraction completed successfully. Files content1.md and content2.md written.")
