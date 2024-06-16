import { Rating } from '../models/Rating';
import { RatingDAO } from '../data-access/RatingDAO';
import pool from '../data-access/dbconnection';

export class RatingService {
    private ratingDAO: RatingDAO;

    constructor() {
        this.ratingDAO = new RatingDAO(pool);
    }
    

    async createRating(ratingData: {
        userId: number,
        opinionId: number,
        value: number,
        createdAt: Date
    }): Promise<void> {
        try {
            const newRating = new Rating(
                ratingData.userId,
                ratingData.opinionId,
                ratingData.value,
                ratingData.createdAt,
            );
            await this.ratingDAO.createRating(newRating);
        } catch (error) {
            console.error('Error in RatingService createRating:', error);
            throw new Error('Error creating rating');
        }
    }

    async getRating(ratingId: number): Promise<Rating | null> {
        try {
            return await this.ratingDAO.getRating(ratingId);
        } catch (error) {
            console.error('Error in RatingService getRating:', error);
            throw new Error('Error retrieving rating');
        }
    }

    async updateRating(ratingData: {
        ratingId: number
        userId: number,
        opinionId: number,
        value: number,
        createdAt: Date
    }): Promise<void> {
        try {
        
            const updatedRating = new Rating(
                ratingData.userId,
                ratingData.opinionId,
                ratingData.value,
                ratingData.createdAt,
                ratingData.ratingId
            );
            await this.ratingDAO.updateRating(updatedRating);
        } catch (error) {
            console.error('Error in RatingService updateRating:', error);
            throw new Error('Error updating rating');
        }
    }

    async deleteRating(ratingId: number): Promise<void> {
        try {
            await this.ratingDAO.deleteRating(ratingId);
        } catch (error) {
            console.error('Error in RatingService deleteRating:', error);
            throw new Error('Error deleting rating');
        }
    }
    

}