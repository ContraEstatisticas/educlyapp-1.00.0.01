import os
import json
import re

# Build custom mapping for decoding mojibake
# CP1252 undefined bytes: 81, 8D, 8F, 90, 9D
# In Python, they are often decoded to U+0081, U+008D, U+008F, U+0090, U+009D

valid_chars = []
for i in range(0x80, 0x100):
    if i in (0x81, 0x8d, 0x8f, 0x90, 0x9d):
        valid_chars.append(chr(i)) # Map directly to U+00xx
    else:
        valid_chars.append(bytes([i]).decode('cp1252'))
        
chars_str = "".join(valid_chars)
pattern = re.compile(f'[{re.escape(chars_str)}]{{2,}}')

def custom_encode(s):
    b = bytearray()
    for char in s:
        code = ord(char)
        if code in (0x81, 0x8d, 0x8f, 0x90, 0x9d):
            b.append(code)
        else:
            b.extend(char.encode('cp1252'))
    return bytes(b)

def replacer(match):
    s = match.group(0)
    try:
        # Check if the sequence decodes to valid UTF-8
        decoded = custom_encode(s).decode('utf-8')
        return decoded
    except Exception as e:
        # Try stripping the last character if it didn't match perfectly
        # Sometimes a trailing quote or punctuation matches valid_chars but is not part of the mojibake
        for i in range(1, len(s) - 1):
            sub_s = s[:-i]
            try:
                decoded = custom_encode(sub_s).decode('utf-8')
                return decoded + s[-i:]
            except:
                pass
        
        # Fallback to Latin-1
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
