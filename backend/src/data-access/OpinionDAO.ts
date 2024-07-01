import { Pool, PoolClient, QueryResult } from 'pg';
import { Opinion } from '../models/Opinion';

export class OpinionDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createOpinion(newOpinion: Opinion): Promise<void> {
        const query = "INSERT INTO opinions (user_id, topic_id, title, text_content, background_image, images, videos, documents, audios) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
        const opinionData = newOpinion.getOpinionData();
        const values = [
            opinionData.userId,
            opinionData.topicId,
            opinionData.title,
            opinionData.textContent,
            opinionData.backgroundImage,
            opinionData.images,
            opinionData.videos,
            opinionData.documents,
            opinionData.audios,
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
                opinionData.text_content,
                opinionData.background_image,
                opinionData.images,
                opinionData.videos,
                opinionData.documents,
                opinionData.audios,
                opinionData.opinion_id,
                opinionData.created_at,
                opinionData.updated_at,
            );
            return opinion;
        } catch (error) {
            console.error('Error executing get opinion query:', error);
            throw new Error(`Error retrieving opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getOpinions(): Promise<Opinion[]> {
        const query = "SELECT * FROM opinions"

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query);

            const opinions: Opinion[] = [];
            for (const row of result.rows) {
                const opinion = new Opinion(
                row.userId,
                row.topicId,
                row.title,
                row.text_content,
                row.background_image,
                row.images,
                row.videos,
                row.documents,
                row.audios,
                row.opinion_id,
                row.created_at,
                row.updated_at,
            );
                opinions.push(opinion);
            }

            return opinions;
        } catch (error) {
            console.error('Error executing get opinions query:', error);
            throw new Error(`Error retrieving opinions: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateOpinion(opinion: Opinion): Promise<void> {
        const query = "UPDATE opinions SET user_id = $1, topic_id = $2, title = $3, text_content = $4, images = $5, videos = $6, documents = $7, audios = $8, background_image = $9 WHERE opinion_id = $10"
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
                opinionData.backgroundImage,
                opinionData.opinionId,

        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const resp = await client.query(query, values);
            if (resp.rowCount == 0){
                throw new Error(`Opinion with ID ${opinionData.opinionId} does not exist.`);
            }
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