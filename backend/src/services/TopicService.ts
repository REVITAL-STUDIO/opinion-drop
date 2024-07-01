import { Topic } from '../models/Topic';
import { TopicDAO } from '../data-access/TopicDAO';
import pool from '../data-access/dbconnection';

export class TopicService {
    private topicDAO: TopicDAO;

    constructor() {
        this.topicDAO = new TopicDAO(pool);
    }
    

    async createTopic(topicData: {
        name: string,
        description: string,
    }): Promise<void> {
        try {
            const newTopic = new Topic(
                topicData.name,
                topicData.description,
            );
            await this.topicDAO.createTopic(newTopic);
        } catch (error) {
            console.error('Error in TopicService createTopic:', error);
            throw new Error('Error creating topic');
        }
    }

    async getTopic(topicId: number): Promise<Topic | null> {
        try {
            return await this.topicDAO.getTopic(topicId);
        } catch (error) {
            console.error('Error in TopicService getTopic:', error);
            throw new Error('Error retrieving topic');
        }
    }

    async getTopics(): Promise<Topic[]> {
        try {
            return await this.topicDAO.getTopics();
        } catch (error) {
            console.error('Error in TopicService getTopics:', error);
            throw new Error('Error retrieving topics');
        }
    }

    async updateTopic(topicData: {
        topicId?: number,
        name: string,
        description: string,
    }): Promise<void> {
        try {
        
            const updatedTopic = new Topic(
                topicData.name,
                topicData.description,
                topicData.topicId
            );
            await this.topicDAO.updateTopic(updatedTopic);
        } catch (error) {
            console.error('Error in TopicService updateTopic:', error);
            throw new Error('Error updating topic');
        }
    }

    async deleteTopic(topicId: number): Promise<void> {
        try {
            await this.topicDAO.deleteTopic(topicId);
        } catch (error) {
            console.error('Error in TopicService deleteTopic:', error);
            throw new Error('Error deleting topic');
        }
    }
    

}