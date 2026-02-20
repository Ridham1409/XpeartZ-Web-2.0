const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectsDir = path.join(__dirname, 'public', 'projects');

async function processImages() {
    const categories = fs.readdirSync(projectsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    let totalSaved = 0;

    for (const category of categories) {
        const categoryPath = path.join(projectsDir, category);
        const files = fs.readdirSync(categoryPath);

        for (const file of files) {
            if (file.endsWith('.png')) {
                const filePath = path.join(categoryPath, file);
                const webpPath = path.join(categoryPath, file.replace('.png', '.webp'));

                const originalSize = fs.statSync(filePath).size;

                await sharp(filePath)
                    .resize({ width: 1200, withoutEnlargement: true }) // Resize to max 1200px width
                    .webp({ quality: 80 }) // Convert to webp with 80% quality
                    .toFile(webpPath);

                const newSize = fs.statSync(webpPath).size;
                const saved = originalSize - newSize;
                totalSaved += saved;

                console.log(`Converted: ${category}/${file} -> size reduced by ${(saved / 1024).toFixed(2)} KB`);

                // Remove the original PNG
                fs.unlinkSync(filePath);
            }
        }
    }

    console.log(`\nOptimization Complete! Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

processImages().catch(console.error);
