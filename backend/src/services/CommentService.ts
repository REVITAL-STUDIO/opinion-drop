import { Comment } from '../models/Comment';
import { CommentDAO } from '../data-access/CommentDAO';
import pool from '../data-access/dbconnection';

export class CommentService {
    private commentDAO: CommentDAO;

    constructor() {
        this.commentDAO = new CommentDAO(pool);
    }
    

    async createComment(commentData: {
        userId: number,
        opinionId: number,
        parentCommentId: number | null,
        content: string,
        createdAt: Date,
        updatedAt: Date
    }): Promise<void> {
        try {
            const newComment = new Comment(
                commentData.userId,
                commentData.opinionId,
                commentData.parentCommentId,
                commentData.content,
                commentData.createdAt,
                commentData.updatedAt,
            );
            await this.commentDAO.createComment(newComment);
        } catch (error) {
            console.error('Error in CommentService createComment:', error);
            throw new Error('Error creating comment');
        }
    }

    async getComment(commentId: number): Promise<Comment | null> {
        try {
            return await this.commentDAO.getComment(commentId);
        } catch (error) {
            console.error('Error in CommentService getComment:', error);
            throw new Error('Error retrieving comment');
        }
    }

    async updateComment(commentData: {
        commentId?: number,
        userId: number,
        opinionId: number,
        parentCommentId: number | null,
        content: string,
        createdAt: Date,
        updatedAt: Date
    }): Promise<void> {
        try {
        
            const updatedComment = new Comment(
                commentData.userId,
                commentData.opinionId,
                commentData.parentCommentId,
                commentData.content,
                commentData.createdAt,
                commentData.updatedAt,
                commentData.commentId
            );
            await this.commentDAO.updateComment(updatedComment);
        } catch (error) {
            console.error('Error in CommentService updateComment:', error);
            throw new Error('Error updating comment');
        }
    }

    async deleteComment(commentId: number): Promise<void> {
        try {
            await this.commentDAO.deleteComment(commentId);
        } catch (error) {
            console.error('Error in CommentService deleteComment:', error);
            throw new Error('Error deleting comment');
        }
    }
    

}