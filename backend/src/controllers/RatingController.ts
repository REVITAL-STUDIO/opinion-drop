
import { Request, Response } from 'express';
import { RatingService } from '../services/RatingService';
import { validate, RatingSchemaType } from '../utils/validation/schemas/RatingSchema'; 


export class RatingController {
    private ratingService: RatingService;

    constructor() {
        this.ratingService = new RatingService();

    }

    async createRating(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid rating data');
                return;
            }

            const ratingData: RatingSchemaType = req.body as RatingSchemaType;

            await this.ratingService.createRating(ratingData);
            res.status(201).send('Rating created successfully');
        } catch (error) {
            console.error('Error in RatingController createRating:', error);
            res.status(500).send('Failed to create rating');
        }
    }

    async getRating(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.ratingId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid rating ID');
                return;
            }

            const userId: string = req.body.userId
            const rating = await this.ratingService.getRating(opinionId, userId);
            if (rating) {
                res.status(200).json(rating);
            } else {
                res.status(404).send('Rating not found');
            }
        } catch (error) {
            console.error('Error in RatingController getRating:', error);
            res.status(500).send('Failed to retrieve rating');
        }
    }

    async updateRating(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid rating data');
                return;
            }

            const ratingData: RatingSchemaType = req.body as RatingSchemaType;

            await this.ratingService.updateRating(ratingData);
            res.status(201).send('Rating created successfully');
        } catch (error) {
            console.error('Error in RatingController createRating:', error);
            res.status(500).send('Failed to create rating');
        }
    }

    async deleteRating(req: Request, res: Response): Promise<void> {
        try {

            const ratingId: number = parseInt(req.params.ratingId, 10);
            if (isNaN(ratingId)) {
                res.status(400).send('Invalid rating ID');
                return;
            }

            await this.ratingService.deleteRating(ratingId);
            res.status(200).send('Rating deleted successfully');

        } catch (error) {
            console.error('Error in RatingController getRating:', error);
            res.status(500).send('Failed to retrieve rating');
        }
    }

}