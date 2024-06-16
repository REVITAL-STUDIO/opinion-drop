import { Pool, PoolClient, QueryResult } from 'pg';
import { Topic } from '../models/Topic';

export class TopicDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createTopic(newTopic: Topic): Promise<void> {
        const query = "INSERT INTO topics (name, description, created_at) VALUES ($1, $2, $3)"
        const topicData = newTopic.getTopicData();
        const values = [
            topicData.name,
            topicData.description,
            topicData.createdAt
            
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing create topic query:', error);
            throw new Error(`Error creating topic: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getTopic(topicId: number): Promise<Topic | null> {
        const query = "SELECT * FROM topics WHERE topic_id = $1"


        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [topicId]);
            if (result.rows.length == 0) {
                return null; 
            }
            const topicData = result.rows[0];
            const topic = new Topic(
                topicData.name,
                topicData.description,
                topicData.createdAt,
                topicData.topicId

            );
            return topic;
        } catch (error) {
            console.error('Error executing get topic query:', error);
            throw new Error(`Error retrieving topic: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateTopic(topic: Topic): Promise<void> {
        const query = "UPDATE topics SET name = $1, description = $2, created_at = $3 WHERE topic_id = $4"
        const topicData = topic.getTopicData();

        const values = [
                topicData.name,
                topicData.description,
                topicData.createdAt,
                topicData.topicId,

        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing update topic query:', error);
            throw new Error(`Error updating topic: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async deleteTopic(topicId: number): Promise<void> {
        const query = "DELETE FROM topics WHERE topic_id = $1"

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [topicId]);
        } catch (error) {
            console.error('Error executing delete topic query:', error);
            throw new Error(`Error deleting topic: ${error}`);
        } finally {
            client && client.release();

        }
    }

}