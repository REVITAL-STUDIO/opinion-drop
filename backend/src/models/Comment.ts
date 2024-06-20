export class Comment {

    private commentId!: number;
    private userId: number;
    private opinionId: number;
    private parentCommentId: number | null;
    private content: string;
    private createdAt: Date;
    private updatedAt: Date;


    constructor(userId: number, opinionId: number, parentCommentId: number | null, content: string, createdAt: Date, updatedAt: Date, commentId?: number) {

        this.userId = userId;
        this.opinionId = opinionId;
        this.parentCommentId = parentCommentId ?? null;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.commentId = commentId ?? this.commentId;


    }

    public getCommentData(): Record<string, any> {
        return {
            commentId: this.commentId,
            userId: this.userId,
            opinoinId: this.opinionId,
            parentCommentId: this.parentCommentId,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

}