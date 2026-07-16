const fs = require('fs');
const path = require('path');

const dirs = [
  'packages/config', 'packages/constants', 'packages/database', 'packages/events',
  'packages/media', 'packages/providers', 'packages/schemas', 'packages/services',
  'packages/shared', 'packages/templates', 'packages/types', 'packages/utils',
  'workers/analytics', 'workers/cleanup', 'workers/notification', 'workers/render',
  'workers/research', 'workers/script', 'workers/upload',
  'apps/dashboard'
];

const result = {};

for (const dir of dirs) {
  result[dir] = {};
  const pkgPath = path.join(__dirname, dir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    result[dir].packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  }
  const tsPath = path.join(__dirname, dir, 'tsconfig.json');
  if (fs.existsSync(tsPath)) {
    result[dir].tsconfig = JSON.parse(fs.readFileSync(tsPath, 'utf8'));
  }
}

fs.writeFileSync('workspace-info.json', JSON.stringify(result, null, 2));
