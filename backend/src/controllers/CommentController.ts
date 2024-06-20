
import { Request, Response } from 'express';
import { CommentService } from '../services/CommentService';
import { validate, CommentSchemaType } from '../utils/validation/schemas/CommentSchema'; // Adjust the path as per your file structure


export class CommentController {
    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();

    }

    async createComment(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid comment data');
                return;
            }

            const commentData: CommentSchemaType = req.body as CommentSchemaType;

            await this.commentService.createComment(commentData);
            res.status(201).send('Comment created successfully');
        } catch (error) {
            console.error('Error in CommentController createComment:', error);
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

    async updateComment(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid comment data');
                return;
            }

            const commentData: CommentSchemaType = req.body as CommentSchemaType;

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