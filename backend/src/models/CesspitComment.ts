export class CesspitComment {

    private commentId!: number;
    private userId: string;
    private topicId: number;
    private parentCommentId: number | null;
    private content: string;
    private likes!: number;
    private createdAt!: Date;
    private updatedAt!: Date;


    constructor(userId: string, topicId: number, content: string, parentCommentId: number | null, likes?: number, commentId?: number, createdAt?: Date, updatedAt?: Date, ) {

        this.userId = userId;
        this.topicId = topicId;
        this.parentCommentId = parentCommentId;
        this.content = content;
        this.likes = likes ?? this.likes;
        this.commentId = commentId ?? this.commentId;
        this.createdAt = createdAt ?? this.createdAt;
        this.updatedAt = updatedAt ?? this.updatedAt;


    }

    public getCommentData(): Record<string, any> {
        return {
            commentId: this.commentId,
            userId: this.userId,
            topicId: this.topicId,
            parentCommentId: this.parentCommentId,
            content: this.content,
            likes: this.likes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

}