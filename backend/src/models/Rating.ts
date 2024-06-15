export class Rating {

    private userId: number;
    private opinionId: number;
    private value: number;
    private createdAt: Date;




    constructor(userId: number, opinionId: number, value: number, createdAt: Date) {

        this.userId = userId;
        this.opinionId = opinionId;
        this.value = value;
        this.createdAt = createdAt;
    }
}