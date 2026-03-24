const fs = require('fs');

require.extensions['.tsx'] = require.extensions['.ts'] = (module, filename) => {
    let content = fs.readFileSync(filename, 'utf8');
    // Strip out all imports
    content = content.replace(/import\s+.*?\s+from\s+['"].*?['"];?/g, '');
    // Replace JSX with a simple string or null
    content = content.replace(/<[A-Z][A-Za-z]+ \/>/g, 'null');
    // Convert export const to const
    content = content.replace(/export const /g, 'const ');
    
    // Append module.exports at the end naturally.
    content += '\nmodule.exports = { IMG, HERO_SLIDES, DEALS, FEATURES, CARS, BLOG_POSTS };\n';
    
    module._compile(content, filename);
};

try {
    const data = require('./constants/data.tsx');
    fs.writeFileSync('../backend/database/seeders/data.json', JSON.stringify({
        DEALS: data.DEALS,
        CARS: data.CARS,
        BLOG_POSTS: data.BLOG_POSTS,
        HERO_SLIDES: data.HERO_SLIDES,
        FEATURES: data.FEATURES,
        GALLERY_IMAGES: [
            { src: data.IMG.toba,      cols: "md:col-span-2", rows: "md:row-span-2", tag: "Alam" },
            { src: data.IMG.waterfall, cols: "md:col-span-1", rows: "md:row-span-1", tag: "Alam" },
            { src: data.IMG.highlands, cols: "md:col-span-1", rows: "md:row-span-2", tag: "Aktivitas" },
            { src: data.IMG.elephant,  cols: "md:col-span-1", rows: "md:row-span-1", tag: "Wildlife" },
            { src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80", cols: "md:col-span-1", rows: "md:row-span-1", tag: "Budaya" },
            { src: data.IMG.orangutan, cols: "md:col-span-2", rows: "md:row-span-1", tag: "Wildlife" },
            { src: data.IMG.jungle,    cols: "md:col-span-1", rows: "md:row-span-1", tag: "Alam" },
            { src: data.IMG.toba,      cols: "md:col-span-1", rows: "md:row-span-1", tag: "Aktivitas" },
        ]
    }, null, 2));
    console.log("Successfully extracted data to data.json");
} catch (e) {
    console.error(e);
}
