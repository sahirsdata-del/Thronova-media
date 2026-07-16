const fs = require('fs');
const path = require('path');

const root = __dirname;
const workspaces = [
  ...fs.readdirSync(path.join(root, 'packages')).map(d => path.join('packages', d)),
  ...fs.readdirSync(path.join(root, 'workers')).map(d => path.join('workers', d)),
  ...fs.readdirSync(path.join(root, 'apps')).map(d => path.join('apps', d))
];

const packageNames = new Set(workspaces.map(w => '@thronova/' + path.basename(w)));
// 'apps/dashboard' is 'thronova-dashboard', handled specially if needed, but we look for @thronova/* imports.

function getImports(dir) {
  let imports = new Set();
  
  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file !== 'node_modules' && file !== 'dist' && file !== '.next') {
          walk(fullPath);
        }
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const regex = /from\s+['"](@thronova\/[^'"]+)['"]/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          imports.add(match[1]);
        }
      }
    }
  }
  walk(path.join(dir, 'src'));
  
  // also check top level files for apps/packages without src, like database/index.ts
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const regex = /from\s+['"](@thronova\/[^'"]+)['"]/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          imports.add(match[1]);
        }
      }
    }
  }
  
  return Array.from(imports);
}

for (const ws of workspaces) {
  const wsPath = path.join(root, ws);
  if (!fs.statSync(wsPath).isDirectory()) continue;
  
  const packageJsonPath = path.join(wsPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) continue;
  
  let pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentPkgName = pkg.name;
  
  // 1. Find imports and inject dependencies
  const importedPackages = getImports(wsPath);
  pkg.dependencies = pkg.dependencies || {};
  let changedDeps = false;
  
  for (const imp of importedPackages) {
    if (imp !== currentPkgName) { // don't depend on self
      if (!pkg.dependencies[imp]) {
        pkg.dependencies[imp] = "*";
        changedDeps = true;
      }
    }
  }
  
  // 2. Standardize packages/
  if (ws.startsWith('packages/')) {
    pkg.version = "1.0.0";
    
    // Set standard fields
    pkg.main = "dist/index.js";
    pkg.types = "dist/index.d.ts";
    
    pkg.scripts = pkg.scripts || {};
    if (ws !== 'packages/database') {
      pkg.scripts.build = "tsc";
    }
    
    // Standardize tsconfig.json
    const tsconfigPath = path.join(wsPath, 'tsconfig.json');
    if (!fs.existsSync(tsconfigPath)) {
      fs.writeFileSync(tsconfigPath, JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "CommonJS",
          moduleResolution: "node",
          esModuleInterop: true,
          forceConsistentCasingInFileNames: true,
          strict: true,
          skipLibCheck: true,
          outDir: "./dist",
          rootDir: "./src",
          declaration: true
        },
        include: ["src/**/*"]
      }, null, 2) + '\n');
    } else {
      let tsconfigStr = fs.readFileSync(tsconfigPath, 'utf8');
      try {
        let tsconfig = JSON.parse(tsconfigStr);
        if (tsconfig.compilerOptions) {
          tsconfig.compilerOptions.outDir = "./dist";
          if (!tsconfig.compilerOptions.rootDir && fs.existsSync(path.join(wsPath, 'src'))) {
            tsconfig.compilerOptions.rootDir = "./src";
          }
          if (tsconfig.include) {
            // ensure src is included
            if (!tsconfig.include.includes("src/**/*") && fs.existsSync(path.join(wsPath, 'src'))) {
               tsconfig.include.push("src/**/*");
            }
          }
          fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n');
        }
      } catch (e) {
        // Ignore parse errors (comments) and do a rough replace
        if (!tsconfigStr.includes('"outDir"')) {
           tsconfigStr = tsconfigStr.replace(/"compilerOptions"\s*:\s*\{/, '"compilerOptions": {\n    "outDir": "./dist",');
           fs.writeFileSync(tsconfigPath, tsconfigStr);
        }
      }
    }
  }
  
  // Save package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Updated ${ws}`);
}
