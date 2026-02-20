const fs = require('fs');
const path = require('path');

const srcDir = path.join('D:\\', 'Xpeartz.com', 'Design Portfolio');
const destDir = path.join(__dirname, 'public', 'designs');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function generateSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const categories = [
    '1. Food & Cafe',
    '2. Health & Gym',
    '3. Real Estate',
    '4. Corporate & Services',
    '5. E-commerce',
    '6. Beauty & Jewelry'
];

let count = 0;

categories.forEach(category => {
    const categoryPath = path.join(srcDir, category);
    if (!fs.existsSync(categoryPath)) return;

    const projects = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    projects.forEach(projectFold => {
        const codePath = path.join(categoryPath, projectFold, 'code.html');
        if (fs.existsSync(codePath)) {
            const slug = generateSlug(projectFold);
            const destPath = path.join(destDir, `${slug}.html`);

            fs.copyFileSync(codePath, destPath);
            count++;
            console.log(`Copied: ${projectFold} -> ${slug}.html`);
        }
    });

    // Handle root files if any (like screen.png might be accompanied by code.html)
    // Wait, let's also check root files just in case
    const rootCode = path.join(categoryPath, 'code.html');
    if (fs.existsSync(rootCode)) {
        console.log('Found root code.html in ' + category);
    }
});

console.log(`\nSuccess! Copied ${count} design HTML files to public/designs/.`);
