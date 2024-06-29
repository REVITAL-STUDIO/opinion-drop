
export class Reaction {

    private reactionId!: number;
    private userId: number;
    private highlightId: number;
    private type: string;
    private createdAt!: Date;




    constructor(userId: number, highlightId: number, type: string, reactionId?: number, createdAt?: Date) {

        this.userId = userId;
        this.highlightId = highlightId;
        this.type = type;
        this.reactionId = reactionId ?? this.reactionId;
        this.createdAt = createdAt ?? this.createdAt;
    }
}