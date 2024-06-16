import { Pool, PoolClient, QueryResult } from 'pg';
import { Rating } from '../models/Rating';

export class RatingDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createRating(newRating: Rating): Promise<void> {
        const query = "INSERT INTO ratings (user_id, opinion_id, value, created_at) VALUES ($1, $2, $3, $4)"
        const ratingData = newRating.getRatingData();
        const values = [
            ratingData.userId,
            ratingData.opinionId,
            ratingData.value,
            ratingData.createdAt
            
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing create rating query:', error);
            throw new Error(`Error creating rating: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getRating(ratingId: number): Promise<Rating | null> {
        const query = "SELECT * FROM ratings WHERE rating_id = $1"


        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [ratingId]);
            if (result.rows.length == 0) {
                return null; 
            }
            const ratingData = result.rows[0];
            const rating = new Rating(
                ratingData.number,
                ratingData.opinionId,
                ratingData.value,
                ratingData.createdAt,
                ratingData.ratingId
            );
            return rating;
        } catch (error) {
            console.error('Error executing get rating query:', error);
            throw new Error(`Error retrieving rating: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateRating(rating: Rating): Promise<void> {
        const query = "UPDATE ratings SET user_id = $1, opinion_id = $2, value = $3, created_at = $4 WHERE rating_id = $5"
        const ratingData = rating.getRatingData();

        const values = [
                ratingData.userId,
                ratingData.opinionId,
                ratingData.value,
                ratingData.createdAt,
                ratingData.ratingId
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing update rating query:', error);
            throw new Error(`Error updating rating: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async deleteRating(ratingId: number): Promise<void> {
        const query = "DELETE FROM ratings WHERE rating_id = $1"

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [ratingId]);
        } catch (error) {
            console.error('Error executing delete rating query:', error);
            throw new Error(`Error deleting rating: ${error}`);
        } finally {
            client && client.release();

        }
    }

}