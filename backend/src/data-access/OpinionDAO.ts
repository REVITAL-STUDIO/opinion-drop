import { Pool, PoolClient, QueryResult } from 'pg';
import { Opinion } from '../models/Opinion';
import { UserComment, UserOpinion } from '../utils/types/dto';

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


    async getOpinion(opinionId: number): Promise<UserOpinion | null> {
        const query = `
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as text, opinions.background_image as backgroundImage, 
        users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.userId = users.user_id
        WHERE opinions.id = $1
        `;


        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [opinionId]);
            if (result.rows.length == 0) {
                return null;
            }
            const opinionData = result.rows[0] as UserOpinion;


            return opinionData;
        } catch (error) {
            console.error('Error executing get opinion query:', error);
            throw new Error(`Error retrieving opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getOpinions(): Promise<UserOpinion[]> {
        const query = `
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as text, opinions.background_image as backgroundImage, 
               users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.userId = users.user_id
        WHERE parent_opinion_id IS NULL
    `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query);

            const opinions: UserOpinion[] = [];
            for (const row of result.rows) {

                opinions.push(row as UserOpinion);
            }

            return opinions;
        } catch (error) {
            console.error('Error executing get opinions query:', error);
            throw new Error(`Error retrieving opinions: ${error}`);
        } finally {
            client && client.release();

        }
    }

    
    async getRebuttals(): Promise<UserOpinion[]> {
        const query = `
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as text, opinions.background_image as backgroundImage, 
               users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.userId = users.user_id
        WHERE parent_opinion_id IS NOT NULL
    `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query);

            const opinions: UserOpinion[] = [];
            for (const row of result.rows) {

                opinions.push(row as UserOpinion);
            }

            return opinions;
        } catch (error) {
            console.error('Error executing get rebuttals query:', error);
            throw new Error(`Error retrieving rebuttals: ${error}`);
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
            if (resp.rowCount == 0) {
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