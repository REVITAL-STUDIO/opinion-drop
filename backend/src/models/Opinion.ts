export class Opinion {

    private opinionId!: number;
    private userId: number;
    private topicId: number;
    private title: string;
    private textContent: string;
    private backgroundImage: string | null;
    private images: string[] | null;
    private videos: string[] | null;
    private documents: string[] | null;
    private audios: string[] | null;
    private createdAt!: Date;
    private updatedAt!: Date;


    constructor(userId: number, topicId: number, title: string, textContent: string, backgroundImage: string | null, images: string[] | null, videos: string[] | null, documents: string[] | null, audios: string[] | null, opinionId?: number, createdAt?: Date, updatedAt?: Date) {

        this.userId = userId;
        this.topicId = topicId;
        this.title = title;
        this.textContent = textContent;
        this.backgroundImage = backgroundImage;
        this.images = images;
        this.videos = videos;
        this.documents = documents;
        this.audios = audios;
        this.opinionId = opinionId ?? this.opinionId;
        this.createdAt = createdAt ?? this.createdAt;
        this.updatedAt = updatedAt ?? this.updatedAt;
    }

    public getOpinionData(): Record<string, any> {
        return {
            userId: this.userId,
            topicId: this.topicId,
            title: this.title,
            textContent: this.textContent,
            backgroundImage: this.backgroundImage,
            images: this.images,
            videos: this.videos,
            documents: this.documents,
            audios: this.audios,
            opinionId: this.opinionId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

}