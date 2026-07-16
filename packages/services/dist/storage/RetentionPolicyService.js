"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retentionPolicyService = exports.RetentionPolicyService = void 0;
const database_1 = require("@thronova/database");
class RetentionPolicyService {
    // Retention thresholds in ms
    RETENTION = {
        TEMP_ASSETS: 24 * 60 * 60 * 1000,
        TEMP_RENDERS: 72 * 60 * 60 * 1000,
        FAILED_RENDERS: 7 * 24 * 60 * 60 * 1000,
        TEMP_VOICE: 24 * 60 * 60 * 1000,
        TEMP_IMAGES: 24 * 60 * 60 * 1000,
        TEMP_SUBTITLES: 24 * 60 * 60 * 1000,
    };
    /**
     * Evaluates whether a specific file can be safely deleted according to business rules.
     */
    async canDeleteFile(category, filePath, fileAgeMs) {
        const filename = filePath.split("/").pop();
        if (!filename)
            return false;
        // 1. Check basic time-based retention
        if (!this.hasExpired(category, fileAgeMs)) {
            return false; // Still within retention period
        }
        // 2. Database confirmation: File is no longer required
        // Ensure we don't delete files that are currently referenced by pending or active projects
        return await this.isSafeFromDatabase(filename);
    }
    hasExpired(category, ageMs) {
        switch (category) {
            case "tempAssets":
                return ageMs > this.RETENTION.TEMP_ASSETS;
            case "tempRenders":
                // Usually renders are 72 hours post-upload. We assume ageMs > 72h meets this basic condition.
                return ageMs > this.RETENTION.TEMP_RENDERS;
            case "tempVoice":
                return ageMs > this.RETENTION.TEMP_VOICE;
            case "tempSubtitles":
                return ageMs > this.RETENTION.TEMP_SUBTITLES;
            case "failedRenders":
                return ageMs > this.RETENTION.FAILED_RENDERS;
            default:
                // By default, unknown temp categories fallback to 24h
                return ageMs > 24 * 60 * 60 * 1000;
        }
    }
    async isSafeFromDatabase(filename) {
        // 1. Check if the file is an active video output that hasn't finished publishing
        const videoOutput = await database_1.prisma.videoOutput.findFirst({
            where: {
                fileUrl: { contains: filename }
            }
        });
        if (videoOutput && videoOutput.status !== "COMPLETED" && videoOutput.status !== "PUBLISHED") {
            // If it's a video output and not published/completed, DO NOT delete
            return false;
        }
        // 2. Check if the file is an active asset for a project that isn't done
        const renderedAsset = await database_1.prisma.renderedAsset.findFirst({
            where: {
                url: { contains: filename }
            },
            include: {
                project: true
            }
        });
        if (renderedAsset && renderedAsset.project.status !== "COMPLETED") {
            return false;
        }
        // 3. Check SceneAssets
        const sceneAsset = await database_1.prisma.sceneAsset.findFirst({
            where: {
                asset: {
                    versions: {
                        some: { url: { contains: filename } }
                    }
                }
            }
        });
        if (sceneAsset && sceneAsset.status !== "APPROVED" && sceneAsset.status !== "DOWNLOADED") {
            // If the asset is still in use by an active workflow, don't delete
            return false;
        }
        return true; // No blocking dependencies found in the DB
    }
}
exports.RetentionPolicyService = RetentionPolicyService;
exports.retentionPolicyService = new RetentionPolicyService();
