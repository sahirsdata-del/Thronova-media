const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

// Define topological order levels to validate or use
const levels = [
  ['@thronova/config'],
  ['@thronova/constants', '@thronova/types', '@thronova/utils', '@thronova/schemas'],
  ['@thronova/database'],
  ['@thronova/shared'],
  ['@thronova/providers'],
  ['@thronova/services'],
];

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
  
  // Clean up duplicated options
  tsconfig.extends = "../../tsconfig.json";
  
  // Keep only local specific options
  tsconfig.compilerOptions = {
    outDir: "./dist",
    rootDir: "./src"
  };

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

// Update root tsconfig.json (combine base + references)
const rootTsconfig = {
  compilerOptions: {
    target: "ES2022",
    module: "CommonJS",
    moduleResolution: "node",
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    strict: true,
    skipLibCheck: true,
    declaration: true,
    declarationMap: true,
    composite: true
  },
  files: [],
  references: rootReferences
};

fs.writeFileSync('tsconfig.json', JSON.stringify(rootTsconfig, null, 2) + '\n', 'utf8');

if (fs.existsSync('tsconfig.build.json')) {
  fs.unlinkSync('tsconfig.build.json');
}

console.log('Successfully refactored TS Project References with Base Config!');
