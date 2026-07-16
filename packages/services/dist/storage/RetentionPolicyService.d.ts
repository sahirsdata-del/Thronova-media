export declare class RetentionPolicyService {
    private readonly RETENTION;
    /**
     * Evaluates whether a specific file can be safely deleted according to business rules.
     */
    canDeleteFile(category: string, filePath: string, fileAgeMs: number): Promise<boolean>;
    private hasExpired;
    private isSafeFromDatabase;
}
export declare const retentionPolicyService: RetentionPolicyService;
