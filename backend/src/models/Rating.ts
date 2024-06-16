export class Rating {

    private ratingId!: number;
    private userId: number;
    private opinionId: number;
    private value: number;
    private createdAt: Date;




    constructor(userId: number, opinionId: number, value: number, createdAt: Date, ratingId?: number) {

        this.userId = userId;
        this.opinionId = opinionId;
        this.value = value;
        this.createdAt = createdAt;
        this.ratingId = ratingId ?? this.ratingId;

    }

    public getRatingData(): Record<string, any> {
        return {
            ratingId: this.ratingId,
            userId: this.userId,
            opinionId: this.opinionId,
            value: this.value,
            createdAt: this.createdAt
        };
    }

}