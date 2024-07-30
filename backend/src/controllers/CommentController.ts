
import { Request, Response } from 'express';
import { CommentService } from '../services/CommentService';
import { validate, CommentSchemaType } from '../utils/validation/schemas/CommentSchema'; 


export class CommentController {
    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();

    }

    async createOpinionComment(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }

            const commentData: CommentSchemaType = req.body as CommentSchemaType;
            const comment = await this.commentService.createOpinionComment(commentData);
            res.status(200).json({
                status: 'success',
                message: 'Comment successfully posted',
                data: {
                    comment: comment
                }
            });        
        } catch (error) {
            console.error('Error in CommentController createOpinionComment:', error);
            res.status(500).send('Failed to create comment');
        }
    }

    async getComment(req: Request, res: Response): Promise<void> {
        try {

            const commentId: number = parseInt(req.params.commentId, 10);
            if (isNaN(commentId)) {
                res.status(400).send('Invalid comment ID');
                return;
            }

            const comment = await this.commentService.getComment(commentId);
            if (comment) {
                res.status(200).json(comment);
            } else {
                res.status(404).send('Comment not found');
            }
        } catch (error) {
            console.error('Error in CommentController getComment:', error);
            res.status(500).send('Failed to retrieve comment');
        }
    }

    async getOpinionComment(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }

            const comments = await this.commentService.getOpinionComments(opinionId);
            res.status(200).json({
                status: 'success',
                message: 'Comments retrieved successfully',
                data: {
                    count: comments.length,
                    comments: comments
                }
            });
        } catch (error) {
            console.error('Error in CommentController getOpinionComments:', error);
            res.status(500).send('Failed to retrieve comments for opinion');
        }
    }

    async getChildComments(req: Request, res: Response): Promise<void> {
        try {

            const commentId: number = parseInt(req.params.commentId, 10);
            if (isNaN(commentId)) {
                res.status(400).send('Invalid commentId ID');
                return;
            }

            const comments = await this.commentService.getChildComments(commentId);
            res.status(200).json({
                status: 'success',
                message: 'Child Comments retrieved successfully',
                data: {
                    count: comments.length,
                    comments: comments
                }
            });
        } catch (error) {
            console.error('Error in CommentController getChildComments:', error);
            res.status(500).send('Failed to retrieve child comments');
        }
    }

    
    async likeComment(req: Request, res: Response): Promise<void> {
        try {

            const commentId: number = parseInt(req.params.commentId, 10);
            if (isNaN(commentId)) {
                res.status(400).send('Invalid comment ID');
                return;
            }
            const userId: string = req.body.userId
            await this.commentService.likeComment(commentId, userId);
            res.status(201).send('comment liked successfully');
        } catch (error) {
            console.error('Error in CommentController likeComment:', error);
            res.status(500).send('Failed to like comment');
        }
    }

    async unlikeComment(req: Request, res: Response): Promise<void> {
        try {

            const commentId: number = parseInt(req.params.commentId, 10);
            if (isNaN(commentId)) {
                res.status(400).send('Invalid comment ID');
                return;
            }
            const userId: string = req.body.userId
            await this.commentService.unlikeComment(commentId, userId);
            res.status(201).send('comment liked successfully');
        } catch (error) {
            console.error('Error in CommentController unlikeComment:', error);
            res.status(500).send('Failed to unlike comment');
        }
    }

    async userHasLiked(req: Request, res: Response): Promise<void> {
        try {

            const commentId: number = parseInt(req.params.commentId, 10);
            if (isNaN(commentId)) {
                res.status(400).send('Invalid comment ID');
                return;
            }
            const userId: string = req.body.userId
            const hasLiked: boolean = await this.commentService.userHasLiked(commentId, userId);
            res.status(201).send({
                status: 'success',
                message: 'has liked received succussfully',
                data: {
                    userHasLiked: hasLiked
                }
            });
        } catch (error) {
            console.error('Error in CommentController userHasLiked:', error);
            res.status(500).send('Failed to retrieve has liked');
        }
    }

    async updateComment(req: Request, res: Response): Promise<void> {
        try {

            const commentId: number = parseInt(req.params.commentId, 10);
            if (isNaN(commentId)) {
                res.status(400).send('Invalid comment ID');
                return;
            }

            if (!validate(req.body)) {
                res.status(400).send('Invalid comment data');
                return;
            }

            const commentData: CommentSchemaType = req.body as CommentSchemaType;
            commentData.commentId = commentId;
            await this.commentService.updateComment(commentData);
            res.status(201).send('comment updated successfully');
        } catch (error) {
            console.error('Error in CommentController createComment:', error);
            res.status(500).send('Failed to create comment');
        }
    }

    async deleteComment(req: Request, res: Response): Promise<void> {
        try {

            const commentId: number = parseInt(req.params.commentId, 10);
            if (isNaN(commentId)) {
                res.status(400).send('Invalid comment ID');
                return;
            }

            await this.commentService.deleteComment(commentId);
            res.status(200).send('Comment deleted successfully');

        } catch (error) {
            console.error('Error in CommentController getComment:', error);
            res.status(500).send('Failed to retrieve comment');
        }
    }

}