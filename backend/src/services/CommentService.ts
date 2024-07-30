import { Comment } from '../models/Comment';
import { CommentDAO } from '../data-access/CommentDAO';
import pool from '../data-access/dbconnection';
import { UserComment } from '../utils/types/dto';

export class CommentService {
    private commentDAO: CommentDAO;

    constructor() {
        this.commentDAO = new CommentDAO(pool);
    }
    

    async createOpinionComment(commentData: {
        userId: string,
        opinionId: number,
        parentCommentId: number | null,
        content: string,
    }): Promise<UserComment> {
        try {
            const newComment = new Comment(
                commentData.userId,
                commentData.opinionId,
                commentData.content,
                commentData.parentCommentId,
            );
           return await this.commentDAO.createComment(newComment);
        } catch (error) {
            console.error('Error in CommentService createOpinionComment:', error);
            throw new Error('Error creating opinion comment');
        }
    }

    async getComment(commentId: number): Promise<UserComment | null> {
        try {
            return await this.commentDAO.getComment(commentId);
        } catch (error) {
            console.error('Error in CommentService getComment:', error);
            throw new Error('Error retrieving comment');
        }
    }

    async getOpinionComments(opinionId: number): Promise<UserComment[]> {
        try {
            return await this.commentDAO.getOpinionComments(opinionId);
        } catch (error) {
            console.error('Error in CommentService getOpinionComments:', error);
            throw new Error('Error retrieving comments for opinion');
        }
    }

    async getChildComments(commentId: number): Promise<UserComment[]> {
        try {
            return await this.commentDAO.getChildComments(commentId);
        } catch (error) {
            console.error('Error in CommentService getChildComments:', error);
            throw new Error('Error retrieving child comments');
        }
    }

    async likeComment(commentId: number, userId: string): Promise<void> {
        try {
            await this.commentDAO.likeComment(commentId, userId);
        } catch (error) {
            console.error('Error in CommentService likeComment:', error);
            throw new Error('Error liking comment');
        }
    }

    async unlikeComment(commentId: number, userId: string): Promise<void> {
        try {
            await this.commentDAO.unlikeComment(commentId, userId);
        } catch (error) {
            console.error('Error in CommentService unlikeComment:', error);
            throw new Error('Error unliking comment');
        }
    }

    async userHasLiked(commentId: number, userId: string): Promise<boolean> {
        try {
            return await this.commentDAO.userHasLiked(commentId, userId);
        } catch (error) {
            console.error('Error in CommentService userHasLiked:', error);
            throw new Error('Error retrieving user has liked');
        }
    }


    async updateComment(commentData: {
        commentId?: number,
        userId: string,
        opinionId: number,
        parentCommentId: number | null,
        content: string,
    }): Promise<void> {
        try {
        
            const updatedComment = new Comment(
                commentData.userId,
                commentData.opinionId,
                commentData.content,
                commentData.parentCommentId,
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