const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  for (const [search, replace] of replacements) {
    if (content.includes(search)) {
      content = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
      modified = true;
    }
  }
  if (modified) fs.writeFileSync(filePath, content);
}

replaceInFile('packages/services/src/publish/PublishService.ts', [
  ['./JobService', '../workflow/JobService']
]);

replaceInFile('packages/services/src/render/AssetService.ts', [
  ['./JobService', '../workflow/JobService']
]);

replaceInFile('packages/services/src/render/RenderService.ts', [
  ['./JobService', '../workflow/JobService']
]);

replaceInFile('packages/services/src/render/VoiceService.ts', [
  ['./JobService', '../workflow/JobService']
]);

replaceInFile('packages/services/src/research/ResearchService.ts', [
  ['./JobService', '../workflow/JobService'],
  ['./VersionService', '../version/VersionService'],
  ['./EntityService', '../workflow/EntityService']
]);

replaceInFile('packages/services/src/script/ScriptService.ts', [
  ['./JobService', '../workflow/JobService']
]);

replaceInFile('packages/services/src/storage/StorageService.ts', [
  ['./LocalStorageProvider', '@thronova/providers']
]);
