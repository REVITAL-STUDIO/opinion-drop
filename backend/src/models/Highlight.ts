
export class Highlight {

    private highlightId: string;
    private userId: string;
    private opinionId: number;
    private highlightedText: string;
    private reactionText: string;
    private reactionType: string;
    private createdAt!: Date;
    private updatedAt!: Date;





    constructor(highlightId: string, userId: string, opinionId: number, highlightedText: string, reactionText: string, reactionType: string, createdAt?: Date, updatedAt?: Date) {
        
        this.highlightId = highlightId
        this.userId = userId;
        this.opinionId = opinionId;
        this.highlightedText = highlightedText;
        this.reactionText = reactionText;
        this.reactionType = reactionType;
        this.createdAt = createdAt ?? this.createdAt;
        this.updatedAt = updatedAt ?? this.createdAt;
    }

    public getHighlightData(): Record<string, any> {
        return {
            highlightId: this.highlightId,
            userId: this.userId,
            opinionId: this.opinionId,
            highlightedText: this.highlightedText,
            reactionText: this.reactionText,
            reactionType: this.reactionType,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}