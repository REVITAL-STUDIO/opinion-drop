export class Topic {

    private topicId!: number;
    private name: string;
    private description: string;
    private createdAt: Date;





    constructor(name: string, description: string, createdAt: Date) {

        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
       
    }
}