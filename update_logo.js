const fs = require('fs');
const path = require('path');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.git' || file === '.vscode') return;
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.html') || file.endsWith('.ejs')) {
                results.push(file);
            }
        }
    });
    return results;
}
const files = walk(__dirname);
let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Kalikamai Youth<br>Society')) {
        content = content.replace(/Kalikamai Youth<br>Society/g, 'कालिकामाई युवा<br>समाज');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
        count++;
    }
});
console.log(`Finished updating ${count} files.`);
