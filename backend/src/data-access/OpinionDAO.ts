import { Pool, PoolClient, QueryResult } from 'pg';
import { Opinion } from '../models/Opinion';
import { UserOpinion, RebuttalsAndOpinions } from '../utils/types/dto';

export class OpinionDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createOpinion(newOpinion: Opinion): Promise<void> {
        const query = "INSERT INTO opinions (user_id, topic_id, title, text_content, background_image, images, videos, documents, audios, parent_opinion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
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
            opinionData.parentOpinionId
        ];

        let client: PoolClient | undefined;

        console.log("got to opinion dao create method");
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
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as textContent, opinions.background_image as backgroundImage, 
        users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.user_id = users.user_id
        WHERE opinions.opinion_id = $1
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
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as textcontent, opinions.background_image as backgroundImage, 
               users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.user_id = users.user_id
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

    async getOpinionsByTopic(topicId: number): Promise<UserOpinion[]> {
        const query = `
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as textContent, opinions.background_image as backgroundImage, 
               users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.user_id = users.user_id
        WHERE parent_opinion_id IS NULL AND topic_id = $1
    `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [topicId]);

            const opinions: UserOpinion[] = [];
            for (const row of result.rows) {

                opinions.push(row as UserOpinion);
            }

            return opinions;
        } catch (error) {
            console.error('Error executing getOpinionsByTopic query:', error);
            throw new Error(`Error retrieving opinions by topic: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getOpinionsByUser(userId: string): Promise<UserOpinion[]> {
        const query = `
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as textcontent, opinions.background_image as backgroundImage, 
               users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.user_id = users.user_id
        WHERE parent_opinion_id IS NULL AND users.user_id = $1
    `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [userId]);

            const opinions: UserOpinion[] = [];
            for (const row of result.rows) {

                opinions.push(row as UserOpinion);
            }
            console.log("in server opinions by user: ", opinions);
            return opinions;
        } catch (error) {
            console.error('Error executing getOpinionsByUser query:', error);
            throw new Error(`Error retrieving opinions by user: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getFavoriteOpinions(userId: string): Promise<UserOpinion[]> {
        const query = `
        SELECT favorite_opinion_ids
        FROM users
        WHERE user_id = $1;
        `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [userId]);
            const favoriteOpinionIds: number[] = result.rows[0].favorite_opinion_ids;

            const opinions: UserOpinion[] = [];
            for (const id of favoriteOpinionIds) {

                const opinion = await this.getOpinion(id);
                if (opinion) {
                    opinions.push(opinion);
                }
            }
            console.log("in server favorite opinions by user: ", opinions);
            return opinions;
        } catch (error) {
            console.error('Error executing getFavoriteOpinions query:', error);
            throw new Error(`Error retrieving favorite opinions: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getRebuttalsByUser(userId: string): Promise<RebuttalsAndOpinions> {
        const query = `
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as textcontent, opinions.background_image as backgroundImage, 
               users.username as author, users.profile_picture as authorProfileImage, opinions.parent_opinion_id as parentOpinionId
        FROM opinions
        JOIN users ON opinions.user_id = users.user_id
        WHERE parent_opinion_id IS NOT NULL AND users.user_id = $1
    `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [userId]);

            const rebuttals: UserOpinion[] = [];
            for (const row of result.rows) {

                rebuttals.push(row as UserOpinion);
            }
            console.log("in server rebuttals by user: ", rebuttals);

            const rebuttaledOpinions: UserOpinion[] = [];

            for (const rebuttal of rebuttals) {
                const rebuttaledOpinionId = rebuttal.parentopinionid;
                console.log("id rebuttalledopinion: ", rebuttaledOpinionId);
                const rebuttaledOpinion = await this.getOpinion(rebuttaledOpinionId!);
                if (rebuttaledOpinion && !rebuttaledOpinions.find(opinion => opinion.id == rebuttaledOpinion.id)) {
                    rebuttaledOpinions.push(rebuttaledOpinion);
                }
                console.log("in server rebuttaledopinions by user: ", rebuttaledOpinions);

            }

            return {
                rebuttals: rebuttals,
                rebuttaledOpinions: rebuttaledOpinions
            };
        } catch (error) {
            console.error('Error executing getRebuttalsByUser query:', error);
            throw new Error(`Error retrieving rebuttals by user: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getOpinionRebuttals(opinionId: number): Promise<UserOpinion[]> {
        const query = `
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as textContent, opinions.background_image as backgroundImage, 
        users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.user_id = users.user_id
        WHERE parent_opinion_id = $1
    `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [opinionId]);

            const opinions: UserOpinion[] = [];
            console.log("query results: ", result.rows)
            for (const row of result.rows) {

                opinions.push(row as UserOpinion);
            }
            console.log("rebuttals: ", opinions)
            return opinions;
        } catch (error) {
            console.error('Error executing getOpinionRebuttals query:', error);
            throw new Error(`Error retrieving opinion rebuttals: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getRebuttals(): Promise<UserOpinion[]> {
        const query = `
        SELECT opinions.opinion_id as id, opinions.title, opinions.text_content as textContent, opinions.background_image as backgroundImage, 
               users.username as author, users.profile_picture as authorProfileImage
        FROM opinions
        JOIN users ON opinions.user_id = users.user_id
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

    async likeOpinion(opinionId: number, userId: string): Promise<void> {
        const query = "UPDATE opinions SET likes = likes + 1 WHERE opinion_id = $1"
        const likeQuery = `INSERT INTO opinion_likes (user_id, opinion_id)
        VALUES ($1, $2)`
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [opinionId]);
            await client.query(likeQuery, [userId, opinionId]);
        } catch (error) {
            console.error('Error executing like opinion query:', error);
            throw new Error(`Error liking opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async userHasLiked(commentId: number, userId: string): Promise<boolean> {
        const query = `SELECT liked_at FROM opinion_likes WHERE opinion_id = $1 AND user_id = $2`

        let client: PoolClient | undefined;
        let hasLiked: boolean = false;
        try {
            client = await this.pool.connect();
            const resp = await client.query(query, [commentId, userId]);
            if (resp.rows[0]) {
                hasLiked = true;
            }
            return hasLiked;
        } catch (error) {
            console.error('Error executing hasLiked query:', error);
            throw new Error(`Error retrieving hasliked: ${error}`);
        } finally {
            client && client.release();

        }
    }


    async unlikeOpinion(opinionId: number, userId: string): Promise<void> {
        const query = "UPDATE opinions SET likes = likes - 1 WHERE opinion_id = $1"
        const unlikeQuery = `DELETE FROM opinion_likes WHERE user_id = $1 AND opinion_id = $2`

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [opinionId]);
            await client.query(unlikeQuery, [userId, opinionId]);
        } catch (error) {
            console.error('Error executing like opinion query:', error);
            throw new Error(`Error liking opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getNumLikes(opinionId: number): Promise<number> {
        const query = `SELECT COUNT(*) AS numlikes
        FROM opinion_likes
        WHERE opinion_id = $1;`

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result = await client.query(query, [opinionId]);
            const numLikes = parseInt(result.rows[0].numlikes, 10);
            return numLikes;
        } catch (error) {
            console.error('Error executing get likes query:', error);
            throw new Error(`Error geting like count: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async dislikeOpinion(opinionId: number, userId: string): Promise<void> {
        const query = "UPDATE opinions SET dislikes = dislikes + 1 WHERE opinion_id = $1"
        const dislikeQuery = `INSERT INTO opinion_dislikes (user_id, opinion_id)
        VALUES ($1, $2)`
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [opinionId]);
            await client.query(dislikeQuery, [userId, opinionId]);
        } catch (error) {
            console.error('Error executing dislike opinion query:', error);
            throw new Error(`Error disliking opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async userHasDisliked(commentId: number, userId: string): Promise<boolean> {
        const query = `SELECT disliked_at FROM opinion_dislikes WHERE opinion_id = $1 AND user_id = $2`

        let client: PoolClient | undefined;
        let hasLiked: boolean = false;
        try {
            client = await this.pool.connect();
            const resp = await client.query(query, [commentId, userId]);
            if (resp.rows[0]) {
                hasLiked = true;
            }
            return hasLiked;
        } catch (error) {
            console.error('Error executing hasDisliked query:', error);
            throw new Error(`Error retrieving hasDisliked: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async undislikeOpinion(opinionId: number, userId: string): Promise<void> {
        const query = "UPDATE opinions SET dislikes = dislikes - 1 WHERE opinion_id = $1"
        const undislikeQuery = `DELETE FROM opinion_dislikes WHERE user_id = $1 AND opinion_id = $2`

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [opinionId]);
            await client.query(undislikeQuery, [userId, opinionId]);
        } catch (error) {
            console.error('Error executing dislike opinion query:', error);
            throw new Error(`Error disliking opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getNumDislikes(opinionId: number): Promise<number> {
        const query = `SELECT COUNT(*) AS numdislikes
        FROM opinion_dislikes
        WHERE opinion_id = $1;`

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result = await client.query(query, [opinionId]);
            const numDislikes = parseInt(result.rows[0].numdislikes, 10);
            return numDislikes;
        } catch (error) {
            console.error('Error executing get dislikes query:', error);
            throw new Error(`Error geting dislike count: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async favoriteOpinion(opinionId: number, userId: string): Promise<void> {
        const query = `UPDATE users SET favorite_opinion_ids = array_append(favorite_opinion_ids, $1)
        WHERE user_id = $2`

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [opinionId, userId]);
        } catch (error) {
            console.error('Error executing favorite opinion query:', error);
            throw new Error(`Error favoriting opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async unfavoriteOpinion(opinionId: number, userId: string): Promise<void> {
        const query = `UPDATE users SET favorite_opinion_ids = array_remove(favorite_opinion_ids, $1)
        WHERE user_id = $2`

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [opinionId, userId]);
        } catch (error) {
            console.error('Error executing unfavorite opinion query:', error);
            throw new Error(`Error unfavoriting opinion: ${error}`);
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