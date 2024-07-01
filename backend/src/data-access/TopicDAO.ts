import { Pool, PoolClient, QueryResult } from 'pg';
import { Topic } from '../models/Topic';

export class TopicDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createTopic(newTopic: Topic): Promise<void> {
        const query = "INSERT INTO topics (name, description) VALUES ($1, $2)"
        const topicData = newTopic.getTopicData();
        const values = [
            topicData.name,
            topicData.description,

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
                topicData.topic_id,
                topicData.created_at,

            );
            return topic;
        } catch (error) {
            console.error('Error executing get topic query:', error);
            throw new Error(`Error retrieving topic: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getTopics(): Promise<Topic[]> {
        const query = "SELECT * FROM topics"

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query);

            const topics: Topic[] = [];
            for (const row of result.rows) {
                const topic = new Topic(
                    row.name,
                    row.description,
                    row.topic_id,
                    row.created_at
                );
                topics.push(topic);
            }

            return topics;
        } catch (error) {
            console.error('Error executing get topics query:', error);
            throw new Error(`Error retrieving topics: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateTopic(topic: Topic): Promise<void> {
        const query = "UPDATE topics SET name = $1, description = $2 WHERE topic_id = $3"
        const topicData = topic.getTopicData();
        console.log("topic data: ", topicData);
        const values = [
            topicData.name,
            topicData.description,
            topicData.topicId,

        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const resp = await client.query(query, values);
            if (resp.rowCount == 0) {
                throw new Error(`Topic with ID ${topicData.topicId} does not exist.`);
            }
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