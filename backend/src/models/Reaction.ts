
export class Reaction {

    private reactionId!: number;
    private userId: number;
    private highlightId: number;
    private type: string;
    private createdAt: Date;




    constructor(userId: number, highlightId: number, type: string, createdAt: Date) {

        this.userId = userId;
        this.highlightId = highlightId;
        this.type = type;
        this.createdAt = createdAt;
    }
}