#!/bin/bash
set -e

cd packages/services/src

mkdir -p research script render workflow publish analytics performance storage prompt theme version

cd ../../providers/src/services

mv ResearchService.ts SearchService.ts ../../../services/src/research/
mv ScriptService.ts ../../../services/src/script/
mv RenderService.ts CompositionService.ts VoiceService.ts AssetService.ts ../../../services/src/render/
mv WorkflowService.ts JobService.ts EntityService.ts ../../../services/src/workflow/
mv PublishService.ts ../../../services/src/publish/
mv AnalyticsService.ts ../../../services/src/analytics/
mv PerformanceService.ts ../../../services/src/performance/
mv TemplateService.ts ../../../services/src/render/
mv ThemeService.ts ../../../services/src/theme/
mv VersionService.ts ../../../services/src/version/
mv PromptService.ts ../../../services/src/prompt/

cd ../
rm -rf services

# move Storage services that were already nested
mv storage/RetentionPolicyService.ts ../../services/src/storage/
mv storage/StorageService.ts ../../services/src/storage/
