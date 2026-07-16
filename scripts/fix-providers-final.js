const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, search, replace) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(search)) {
      content = content.split(search).join(replace);
      fs.writeFileSync(filePath, content);
    }
  }
}

replaceInFile('apps/dashboard/src/app/api/cron/analytics/route.ts', '@thronova/providers', '@thronova/services');
replaceInFile('apps/dashboard/src/app/api/storage/stats/route.ts', '@thronova/providers', '@thronova/services');
replaceInFile('workers/cleanup/src/index.ts', '@thronova/providers', '@thronova/services');

// Fix the deep imports in services
function fixDeepImports(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      fixDeepImports(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/@thronova\/providers\/src\/[a-zA-Z0-9\/]+/g, '@thronova/providers');
      fs.writeFileSync(fullPath, content);
    }
  }
}

fixDeepImports('packages/services/src');
