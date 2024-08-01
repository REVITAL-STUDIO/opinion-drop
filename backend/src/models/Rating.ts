export class Rating {

    private ratingId!: number;
    private userId: string;
    private opinionId: number;
    private value: number;
    private createdAt!: Date;




    constructor(userId: string, opinionId: number, value: number, ratingId?: number, createdAt?: Date, ) {

        this.userId = userId;
        this.opinionId = opinionId;
        this.value = value;
        this.ratingId = ratingId ?? this.ratingId;
        this.createdAt = createdAt ?? this.createdAt;


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