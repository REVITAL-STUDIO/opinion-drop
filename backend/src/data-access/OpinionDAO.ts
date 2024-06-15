import { Pool, PoolClient, QueryResult } from 'pg';
import { Opinion } from '../models/Opinion';

export class OpinionDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createOpinion(newOpinion: Opinion): Promise<void> {
        const query = "INSERT INTO opinions (user_id, topic_id, title, text_content, images, videos, documents, audios, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
        const opinionData = newOpinion.getOpinionData();
        const values = [
            opinionData.userId,
            opinionData.topicId,
            opinionData.title,
            opinionData.textContent,
            opinionData.images,
            opinionData.videos,
            opinionData.documents,
            opinionData.audios,
            opinionData.createdAt,
            opinionData.updatedAt

        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing create opinion query:', error);
            throw new Error(`Error creating opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getOpinion(opinionId: number): Promise<Opinion | null> {
        const query = "SELECT * FROM opinions WHERE opinion_id = $1"


        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [opinionId]);
            if (result.rows.length == 0) {
                return null; 
            }
            const opinionData = result.rows[0];
            const opinion = new Opinion(
                opinionData.userId,
                opinionData.topicId,
                opinionData.title,
                opinionData.textContent,
                opinionData.images,
                opinionData.videos,
                opinionData.documents,
                opinionData.audios,
                opinionData.createdAt,
                opinionData.updatedAt,
                opinionData.opinionId
            );
            return opinion;
        } catch (error) {
            console.error('Error executing get opinion query:', error);
            throw new Error(`Error retrieving opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateOpinion(opinion: Opinion): Promise<void> {
        const query = "UPDATE opinions SET user_id = $1, topic_id = $2, title = $3, text_content = $4, images = $5, videos = $6, documents = $7, audios = $8, createdAt = $9, updatedAt = $10 WHERE opinion_id = $11"
        const opinionData = opinion.getOpinionData();

        const values = [
                opinionData.userId,
                opinionData.topicId,
                opinionData.title,
                opinionData.textContent,
                opinionData.images,
                opinionData.videos,
                opinionData.documents,
                opinionData.audios,
                opinionData.createdAt,
                opinionData.updatedAt,
                opinionData.opinionId,

        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing update opinion query:', error);
            throw new Error(`Error updating opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async deleteOpinion(opinionId: number): Promise<void> {
        const query = "DELETE FROM opinions WHERE opinion_id = $1"

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [opinionId]);
        } catch (error) {
            console.error('Error executing delete opinion query:', error);
            throw new Error(`Error deleting opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

}