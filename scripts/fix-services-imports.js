const fs = require('fs');
const path = require('path');

// 1. Fix packages/providers/src/index.ts
const providerIndexPath = 'packages/providers/src/index.ts';
if (fs.existsSync(providerIndexPath)) {
  const content = fs.readFileSync(providerIndexPath, 'utf8');
  const filtered = content.split('\n').filter(line => !line.includes('./services/') && !line.includes('./storage/RetentionPolicyService') && !line.includes('./storage/StorageService')).join('\n');
  fs.writeFileSync(providerIndexPath, filtered);
}

// 2. Create packages/services/src/index.ts
const servicesIndexPath = 'packages/services/src/index.ts';
const servicesExport = `
export * from './analytics/AnalyticsService';
export * from './render/AssetService';
export * from './render/CompositionService';
export * from './workflow/EntityService';
export * from './workflow/JobService';
export * from './performance/PerformanceService';
export * from './prompt/PromptService';
export * from './publish/PublishService';
export * from './render/VoiceService';
export * from './research/SearchService';
export * from './script/ScriptService';
export * from './theme/ThemeService';
export * from './version/VersionService';
export * from './storage/RetentionPolicyService';
export * from './storage/StorageAbstraction';
export * from './research/Layers';
export * from './render/Pipeline';
`;
fs.writeFileSync(servicesIndexPath, servicesExport);

// 3. Search and replace `@thronova/providers` with `@thronova/services` in apps and workers
function replaceInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item !== 'node_modules' && item !== 'dist' && item !== '.next') {
        replaceInDir(fullPath);
      }
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('@thronova/providers')) {
        // Only replace if they are importing services (heuristic: lowercase 'Service' or 'engine' or just replace everything that was moved).
        // Since providers only export integrations now, anything like `storageService`, `analyticsService`, etc should come from `@thronova/services`.
        // We can just add `@thronova/services` import for those specific variables.
        
        // This is tricky. Let's just do a naive replace of `@thronova/providers` to `@thronova/services` for specific known services.
        const knownServices = ['storageService', 'analyticsService', 'performanceService', 'scriptService', 'renderService', 'publishService', 'researchService', 'assetService'];
        
        let modified = false;
        for (const s of knownServices) {
           if (content.includes(s)) {
              content = content.replace(/@thronova\/providers/g, '@thronova/services');
              modified = true;
           }
        }
        if (modified) {
          fs.writeFileSync(fullPath, content);
        }
      }
    }
  }
}

replaceInDir('apps/dashboard/src');
replaceInDir('workers');
