import fs from 'fs';
import path from 'path';

const rootDir = 'c:\\Users\\User\\Documents\\GitHub\\Marcos\\educlyapp-1.00.0.01';

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        replaceInDir(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.json') || file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      if (content.includes('Educy')) {
        content = content.replace(/Educy/g, 'Educly');
        changed = true;
      }
      if (content.includes('educy')) {
        content = content.replace(/educy/g, 'educly');
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

// 1. Update vite.config.ts
const viteConfigPath = path.join(rootDir, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  let content = fs.readFileSync(viteConfigPath, 'utf8');
  let changed = false;
  if (content.includes('Educy')) {
    content = content.replace(/Educy/g, 'Educly');
    changed = true;
  }
  if (content.includes('educy')) {
    content = content.replace(/educy/g, 'educly');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(viteConfigPath, content);
    console.log(`Updated: ${viteConfigPath}`);
  }
}

// 2. Update src and public
replaceInDir(path.join(rootDir, 'src'));
replaceInDir(path.join(rootDir, 'public'));

console.log('Finished global replacement of Educy -> Educly');
