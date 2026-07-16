export declare class ResearchService {
    startResearch(ideaId: string, title: string, category: string, projectId: string): Promise<{
        job: import("../workflow/JobService").BaseJob;
        version: import("../version/VersionService").ResearchVersionData;
        entities: import("../workflow/EntityService").TopicEntityData;
    }>;
}
export declare const researchService: ResearchService;
