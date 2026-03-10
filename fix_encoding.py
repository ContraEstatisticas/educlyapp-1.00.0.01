import os
import json
import re

# Characters that correspond to bytes 0x80-0xFF in cp1252
valid_chars = []
for i in range(0x80, 0x100):
    try:
        valid_chars.append(bytes([i]).decode('cp1252'))
    except:
        pass
        
chars_str = "".join(valid_chars)
pattern = re.compile(f'[{re.escape(chars_str)}]{{2,}}')

def replacer(match):
    s = match.group(0)
    try:
        # Check if the sequence decodes to valid UTF-8
        decoded = s.encode('cp1252').decode('utf-8')
        return decoded
    except Exception as e:
        # Fallback to Latin-1 just in case
        try:
            return s.encode('latin-1').decode('utf-8')
        except:
            return s

def fix_text(text):
    if not isinstance(text, str): return text
    return pattern.sub(replacer, text)

def traverse(data, changed_flag):
    if isinstance(data, dict):
        return {k: traverse(v, changed_flag) for k, v in data.items()}
    elif isinstance(data, list):
        return [traverse(v, changed_flag) for v in data]
    elif isinstance(data, str):
        fixed = fix_text(data)
        if fixed != data:
            changed_flag[0] = True
        return fixed
    else:
        return data

changed_files = []
for directory in ['public/i18n/lessonContent', 'src/i18n/locales']:
    if not os.path.exists(directory): continue
    for filename in os.listdir(directory):
        if not filename.endswith('.json'): continue
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except:
                continue
        
        changed_flag = [False]
        fixed_data = traverse(data, changed_flag)
        
        if changed_flag[0]:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(fixed_data, f, ensure_ascii=False, indent=2)
            changed_files.append(filepath)

print(f"Fixed encoding in {len(changed_files)} files:")
for f in changed_files: print(f"- {f}")
