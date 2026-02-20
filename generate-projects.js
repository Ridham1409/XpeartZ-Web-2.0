const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'projects');
const outputFile = path.join(__dirname, 'src', 'lib', 'new-projects.ts');

const categoriesMap = {
    'food': 'Food & Cafe',
    'health': 'Health & Gym',
    'real-estate': 'Real Estate',
    'corporate': 'Corporate & Services',
    'ecommerce': 'E-commerce',
    'beauty': 'Beauty & Jewelry'
};

let projects = [];
let idCounter = 1;

function generateSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function generateTitle(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

Object.keys(categoriesMap).forEach(folder => {
    const categoryPath = path.join(projectsDir, folder);
    if (!fs.existsSync(categoryPath)) return;

    const items = fs.readdirSync(categoryPath);

    // Find all trailing .png files in the root of the category directory
    items.filter(item => item.endsWith('.png')).forEach(imgFile => {
        const nameWithoutExt = imgFile.replace('.png', '');

        projects.push({
            id: idCounter.toString(),
            slug: generateSlug(nameWithoutExt),
            title: generateTitle(nameWithoutExt),
            subtitle: `A premium design for ${categoriesMap[folder]}`,
            category: categoriesMap[folder],
            thumbnail: `/projects/${folder}/${imgFile}`,
            tags: [categoriesMap[folder], 'UI Design', 'Web Design'],
            year: '2026',
            client: generateTitle(nameWithoutExt) + ' Client',
            description: `This is a beautiful ${categoriesMap[folder]} design tailored to elevate the brand's digital presence.`,
            problem: 'The client needed a modern, responsive, and visually striking digital experience.',
            solution: 'We crafted a premium interface focusing on high-quality visuals, seamless typography, and intuitive user journeys.',
            outcome: 'The new design effectively captured the brand essence, leading to higher engagement and a stunning portfolio piece.',
            screenshots: [
                `/projects/${folder}/${imgFile}`
            ]
        });
        idCounter++;
    });
});

const content = `// Auto-generated projects file
export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  category: 'Food & Cafe' | 'Health & Gym' | 'Real Estate' | 'Corporate & Services' | 'E-commerce' | 'Beauty & Jewelry'
  thumbnail: string
  tags: string[]
  year: string
  client: string
  description: string
  problem: string
  solution: string
  outcome: string
  screenshots: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  downloadLink?: string
}

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return projects
  return projects.filter(p => p.category === category)
}
`;

fs.writeFileSync(outputFile, content);
console.log('Successfully generated src/lib/new-projects.ts with ' + projects.length + ' projects.');
