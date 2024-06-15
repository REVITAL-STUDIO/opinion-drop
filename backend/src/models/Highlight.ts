
export class Highlight {

    private userId: number;
    private opinionId: number;
    private reactionId: number;
    private highlightedText: string;
    private createdAt: Date;




    constructor(userId: number, opinionId: number, reactionId: number, highlightedText: string, createdAt: Date) {

        this.userId = userId;
        this.opinionId = opinionId;
        this.reactionId = reactionId;
        this.highlightedText = highlightedText;
        this.createdAt = createdAt;
    }
}