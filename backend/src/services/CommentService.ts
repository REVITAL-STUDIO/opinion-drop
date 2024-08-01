import { Comment } from '../models/Comment';
import { CesspitComment } from '../models/CesspitComment';
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

    async getChildOpinionComments(commentId: number): Promise<UserComment[]> {
        try {
            return await this.commentDAO.getChildOpinionComments(commentId);
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

    async createCesspitComment(commentData: {
        userId: string,
        topicId: number,
        parentCommentId: number | null,
        content: string,
    }): Promise<UserComment> {
        try {
            const newComment = new CesspitComment(
                commentData.userId,
                commentData.topicId,
                commentData.content,
                commentData.parentCommentId,
            );
           return await this.commentDAO.createCesspitComment(newComment);
        } catch (error) {
            console.error('Error in CommentService createCesspitComment:', error);
            throw new Error('Error creating cesspit comment');
        }
    }
    
    async getCesspitComments(topicId: number): Promise<UserComment[]> {
        try {
            return await this.commentDAO.getCesspitComments(topicId);
        } catch (error) {
            console.error('Error in CommentService getCesspitComments:', error);
            throw new Error('Error retrieving cesspit comments for opinion');
        }
    }

    async getChildCesspitComments(commentId: number): Promise<UserComment[]> {
        try {
            return await this.commentDAO.getChildCesspitComments(commentId);
        } catch (error) {
            console.error('Error in CommentService getChildCesspitComments:', error);
            throw new Error('Error retrieving child comments');
        }
    }

    async userHasLikedCesspit(commentId: number, userId: string): Promise<boolean> {
        try {
            return await this.commentDAO.userHasLikedCesspit(commentId, userId);
        } catch (error) {
            console.error('Error in CommentService userHasLikedCesspit:', error);
            throw new Error('Error retrieving user has liked');
        }
    }

    async likeCesspitComment(commentId: number, userId: string): Promise<void> {
        try {
            await this.commentDAO.likeCesspitComment(commentId, userId);
        } catch (error) {
            console.error('Error in CommentService likeCesspitComment:', error);
            throw new Error('Error liking cesspit comment');
        }
    }

    async unlikeCesspitComment(commentId: number, userId: string): Promise<void> {
        try {
            await this.commentDAO.unlikeCesspitComment(commentId, userId);
        } catch (error) {
            console.error('Error in CommentService unlikeCesspitComment:', error);
            throw new Error('Error unliking cesspit comment');
        }
    }

    async updateCesspitComment(commentData: {
        commentId?: number,
        userId: string,
        topicId: number,
        parentCommentId: number | null,
        content: string,
    }): Promise<void> {
        try {
        
            const updatedComment = new CesspitComment(
                commentData.userId,
                commentData.topicId,
                commentData.content,
                commentData.parentCommentId,
                commentData.commentId
            );
            await this.commentDAO.updateCesspitComment(updatedComment);
        } catch (error) {
            console.error('Error in CommentService updateCesspitComment:', error);
            throw new Error('Error updating comment');
        }
    }
    

    async deleteCesspitComment(commentId: number): Promise<void> {
        try {
            await this.commentDAO.deleteCesspitComment(commentId);
        } catch (error) {
            console.error('Error in CommentService deleteCesspitComment:', error);
            throw new Error('Error deleting comment');
        }
    }

}