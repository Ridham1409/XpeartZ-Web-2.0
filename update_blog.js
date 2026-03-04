const fs = require('fs');

const images = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744094-24638ea0b3b5?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507238692062-5a042e9eec62?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop'
];

let data = fs.readFileSync('src/lib/blog-data.ts', 'utf8');
const lines = data.split('\n');
const newLines = [];

let imageIndex = 0;
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trim();
    if (trimmed === '},' || trimmed === '}') {
        let img = images[imageIndex % images.length];
        let time = Math.floor(Math.random() * 5 + 4) + ' min read';

        // Fix last line so it ends with single comma
        if (newLines.length > 0) {
            newLines[newLines.length - 1] = newLines[newLines.length - 1].replace(/,\s*$/, '') + ',';
        }

        newLines.push(`    image: '${img}',`);
        newLines.push(`    readingTime: '${time}'`);
        newLines.push(line);
        imageIndex++;
    } else {
        newLines.push(line);
    }
}

fs.writeFileSync('src/lib/blog-data.ts', newLines.join('\n'), 'utf8');
console.log('Processed ' + imageIndex + ' items.');
