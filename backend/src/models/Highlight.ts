
export class Highlight {

    private highlightId!: number;
    private userId: number;
    private opinionId: number;
    private reactionId: number;
    private highlightedText: string;
    private createdAt!: Date;




    constructor(userId: number, opinionId: number, reactionId: number, highlightedText: string, highlightId?: number, createdAt?: Date) {

        this.userId = userId;
        this.opinionId = opinionId;
        this.reactionId = reactionId;
        this.highlightedText = highlightedText;
        this.highlightId = highlightId ?? this.highlightId;
        this.createdAt = createdAt ?? this.createdAt;
    }
}