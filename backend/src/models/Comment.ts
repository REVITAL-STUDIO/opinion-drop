export class Comment {

    private commentId!: number;
    private userId: number;
    private opinionId: number;
    private parentCommentId: number | null;
    private content: string;
    private likes!: number;
    private createdAt!: Date;
    private updatedAt!: Date;


    constructor(userId: number, opinionId: number, content: string, parentCommentId: number | null, likes?: number, commentId?: number, createdAt?: Date, updatedAt?: Date, ) {

        this.userId = userId;
        this.opinionId = opinionId;
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
            opinionId: this.opinionId,
            parentCommentId: this.parentCommentId,
            content: this.content,
            likes: this.likes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

}