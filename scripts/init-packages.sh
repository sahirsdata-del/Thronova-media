#!/bin/bash
set -e

PACKAGES=("constants" "config" "events" "templates" "media" "services")

cd packages

for pkg in "${PACKAGES[@]}"; do
  echo "Creating package: $pkg"
  mkdir -p "$pkg/src"
  
  cat <<EOF > "$pkg/package.json"
{
  "name": "@thronova/$pkg",
  "version": "1.0.0",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {}
}
EOF

  cat <<EOF > "$pkg/tsconfig.json"
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  },
  "include": ["src/**/*"]
}
EOF

  touch "$pkg/src/index.ts"
done
