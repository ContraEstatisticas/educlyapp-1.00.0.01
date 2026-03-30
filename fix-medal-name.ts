import fs from 'fs';
import path from 'path';

const medalsFile = path.join(process.cwd(), 'src', 'pages', 'Medals.tsx');
if (fs.existsSync(medalsFile)) {
    let medalsContent = fs.readFileSync(medalsFile, 'utf8');
    
    // Replace the specific medal.name block correctly
    medalsContent = medalsContent.replace(
        /\{medal\.name\}\s*<\/span>\s*<\/div>/,
        '{t(`medal_names.${medal.slug || medal.id}`, medal.name)}\n                  </span>\n                </div>'
    );
    
    fs.writeFileSync(medalsFile, medalsContent, 'utf8');
    console.log("Updated Medals.tsx with short name translation");
}
