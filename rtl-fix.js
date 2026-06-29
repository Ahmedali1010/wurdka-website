const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/hp/Downloads/wurdkacompany-main/wurdkacompany-main/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/(?<=['"\s:]|^)ml-/g, 'ms-');
  content = content.replace(/(?<=['"\s:]|^)mr-/g, 'me-');
  content = content.replace(/(?<=['"\s:]|^)pl-/g, 'ps-');
  content = content.replace(/(?<=['"\s:]|^)pr-/g, 'pe-');
  content = content.replace(/(?<=['"\s:]|^)text-left\b/g, 'text-start');
  content = content.replace(/(?<=['"\s:]|^)text-right\b/g, 'text-end');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated RTL in ' + file);
  }
});
