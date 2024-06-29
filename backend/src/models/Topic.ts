export class Topic {

    private topicId!: number;
    private name: string;
    private description: string;
    private createdAt!: Date;





    constructor(name: string, description: string, topicId?: number, createdAt?: Date,) {

        this.name = name;
        this.description = description;
        this.createdAt = createdAt ?? this.createdAt;
        this.topicId = topicId ?? this.topicId;

    }

    public getTopicData(): Record<string, any> {
        return {
            topicId: this.topicId,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt
        };
    }
}