const fs = require('fs');
const path = require('path');

const dashPkg = JSON.parse(fs.readFileSync('apps/dashboard/package.json', 'utf8'));
const dashTsconfig = JSON.parse(fs.readFileSync('apps/dashboard/tsconfig.json', 'utf8'));

// We need packageMap from before, but let's just hardcode the logic
const { globSync } = require('glob');
const packages = globSync('{packages,workers}/*/package.json');
const packageMap = new Map();
packages.forEach(pkgPath => {
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  packageMap.set(pkgJson.name, path.dirname(path.resolve(pkgPath)));
});

const refs = [];
const allDeps = { ...dashPkg.dependencies, ...dashPkg.devDependencies };
for (const [depName] of Object.entries(allDeps)) {
  if (depName.startsWith('@thronova/') && packageMap.has(depName)) {
    const depDir = packageMap.get(depName);
    let relPath = path.relative(path.resolve('apps/dashboard'), depDir);
    if (!relPath.startsWith('.')) relPath = './' + relPath;
    refs.push({ path: relPath });
  }
}

dashTsconfig.references = refs;
fs.writeFileSync('apps/dashboard/tsconfig.json', JSON.stringify(dashTsconfig, null, 2) + '\n', 'utf8');
