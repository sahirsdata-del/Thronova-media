const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const packages = globSync('{packages,workers}/*/package.json');
const packageMap = new Map();

packages.forEach(pkgPath => {
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  packageMap.set(pkgJson.name, path.dirname(path.resolve(pkgPath)));
});

const rootReferences = [];

packages.forEach(pkgPath => {
  const pkgDir = path.dirname(path.resolve(pkgPath));
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  
  const tsconfigPath = path.join(pkgDir, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) return;

  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  
  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.composite = true;
  tsconfig.compilerOptions.declarationMap = true;

  const allDeps = { ...pkgJson.dependencies, ...pkgJson.peerDependencies };
  const refs = [];
  
  for (const [depName, version] of Object.entries(allDeps)) {
    if (depName.startsWith('@thronova/') && packageMap.has(depName)) {
      const depDir = packageMap.get(depName);
      let relPath = path.relative(pkgDir, depDir);
      if (!relPath.startsWith('.')) relPath = './' + relPath;
      refs.push({ path: relPath });
    }
  }

  tsconfig.references = refs;
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n', 'utf8');
  
  let rootRelPath = path.relative(__dirname, pkgDir);
  if (!rootRelPath.startsWith('.')) rootRelPath = './' + rootRelPath;
  rootReferences.push({ path: rootRelPath });
});

const rootTsconfig = {
  files: [],
  references: rootReferences
};

fs.writeFileSync('tsconfig.build.json', JSON.stringify(rootTsconfig, null, 2) + '\n', 'utf8');
console.log('Successfully set up TS Project References!');
