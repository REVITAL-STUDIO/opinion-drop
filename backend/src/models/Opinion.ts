export class Opinion {

    private opinionId!: number;
    private userId: number;
    private topicId: number;
    private title: string;
    private textContent: string;
    private images: string[] | null;
    private videos: string[]| null;
    private documents: string[]| null;
    private audios: string[]| null;
    private createdAt: Date;
    private updatedAt: Date;


    constructor(userId: number, topicId: number, title: string, textContent: string, images: string[], videos: string[], documents: string[], audios: string[], createdAt: Date, updatedAt: Date, opinionId?: number) {

        this.userId = userId;
        this.topicId = topicId;
        this.title = title;
        this.textContent = textContent;
        this.images = images;
        this.videos = videos;
        this.documents = documents;
        this.audios = audios;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.opinionId = opinionId ?? this.opinionId;


    }

    public getOpinionData(): Record<string, any> {
        return {
            userId: this.userId,
            topicId: this.topicId,
            title: this.title,
            textContent: this.textContent,
            images: this.images,
            videos: this.videos,
            documents: this.documents,
            audios: this.audios,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

}