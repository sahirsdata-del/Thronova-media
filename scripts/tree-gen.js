const fs = require('fs');
const path = require('path');

const IGNORE = ['node_modules', '.next', '.git', 'dist', '.DS_Store'];

function generateTree(dir, prefix = '') {
  let output = '';
  const items = fs.readdirSync(dir)
    .filter(item => !IGNORE.includes(item))
    .sort((a, b) => {
      const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
      const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isLast = i === items.length - 1;
    const itemPath = path.join(dir, item);
    const isDir = fs.statSync(itemPath).isDirectory();

    output += prefix + (isLast ? '└── ' : '├── ') + item + '\n';
    
    if (isDir) {
      output += generateTree(itemPath, prefix + (isLast ? '    ' : '│   '));
    }
  }
  return output;
}

const root = process.cwd();
console.log('.');
console.log(generateTree(root));
