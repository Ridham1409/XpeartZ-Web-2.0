const fs = require('fs');
const path = require('path');

const sourceDir = path.join('d:', 'Xpeartz.com', 'Design Portfolio');
const targetDir = path.join(__dirname, 'public', 'projects');

const categories = [
    { folder: '1. Food & Cafe', slug: 'food' },
    { folder: '2. Health & Gym', slug: 'health' },
    { folder: '3. Real Estate', slug: 'real-estate' },
    { folder: '4. Corporate & Services', slug: 'corporate' },
    { folder: '5. E-commerce', slug: 'ecommerce' },
    { folder: '6. Beauty & Jewelry', slug: 'beauty' }
];

categories.forEach(category => {
    const catPath = path.join(sourceDir, category.folder);
    if (!fs.existsSync(catPath)) return;

    const projects = fs.readdirSync(catPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !dirent.name.includes('Previews'))
        .map(dirent => dirent.name);

    projects.forEach(projectName => {
        const screenPath = path.join(catPath, projectName, 'screen.png');
        if (fs.existsSync(screenPath)) {
            const targetCatDir = path.join(targetDir, category.slug);
            if (!fs.existsSync(targetCatDir)) {
                fs.mkdirSync(targetCatDir, { recursive: true });
            }
            // Save it as projectName.png in the target directory
            const destPath = path.join(targetCatDir, `${projectName}.png`);
            fs.copyFileSync(screenPath, destPath);
            console.log(`Copied ${projectName}/screen.png -> ${category.slug}/${projectName}.png`);
        } else {
            console.log(`Missing screen.png in ${projectName}`);
        }
    });
});

console.log('Finished copying high quality images.');
