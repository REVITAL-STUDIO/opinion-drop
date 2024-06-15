export class Opinion {

    private userId: number;
    private topicId: number;
    private title: string;
    private textContent: string;
    private images: string[];
    private videos: string[];
    private documents: string[];
    private audios: string[];
    private createdAt: Date;
    private updatedAt: Date;


    constructor(userId: number, topicId: number, title: string, textContent: string, images: string[], videos: string[], documents: string[], audios: string[], createdAt: Date, updatedAt: Date) {

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


    }
}