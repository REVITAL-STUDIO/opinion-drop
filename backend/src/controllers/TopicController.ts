
import { Request, Response } from 'express';
import { TopicService } from '../services/TopicService';
import { validate, TopicSchemaType } from '../utils/validation/schemas/TopicSchema'; // Adjust the path as per your file structure


export class TopicController {
    private topicService: TopicService;

    constructor() {
        this.topicService = new TopicService();

    }

    async createTopic(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid topic data');
                return;
            }

            const topicId: number = parseInt(req.params.topicId, 10);
            if (isNaN(topicId)) {
                res.status(400).send('Invalid topic ID');
                return;
            }

            const topicData: TopicSchemaType = req.body as TopicSchemaType;
            topicData.topicId = topicId;

            await this.topicService.createTopic(topicData);
            res.status(201).send('topic created successfully');
        } catch (error) {
            console.error('Error in TopicController createTopic:', error);
            res.status(500).send('Failed to create topic');
        }
    }

    async getTopic(req: Request, res: Response): Promise<void> {
        try {

            const topicId: number = parseInt(req.params.topicId, 10);
            if (isNaN(topicId)) {
                res.status(400).send('Invalid topic ID');
                return;
            }

            const topic = await this.topicService.getTopic(topicId);
            if (topic) {
                res.status(200).json(topic);
            } else {
                res.status(404).send('topic not found');
            }
        } catch (error) {
            console.error('Error in TopicController getTopic:', error);
            res.status(500).send('Failed to retrieve topic');
        }
    }

    async getTopics(req: Request, res: Response): Promise<void> {
        try {

            const topics = await this.topicService.getTopics();
            res.status(200).json({
                status: 'success',
                message: 'Topics retrieved successfully',
                data: {
                    count: topics.length,
                    topics: topics
                }
            });
        } catch (error) {
            console.error('Error in TopicController getTopics:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve topics'
            });
        }
    }

    async updateTopic(req: Request, res: Response): Promise<void> {
        try {
            const topicId: number = parseInt(req.params.topicId, 10);
            if (isNaN(topicId)) {
                res.status(400).send('Invalid topic ID');
                return;
            }

            if (!validate(req.body)) {
                res.status(400).send('Invalid topic data');
                return;
            }

            const topicData: TopicSchemaType = req.body as TopicSchemaType;
            topicData.topicId = topicId;
            await this.topicService.updateTopic(topicData);
            res.status(201).send('topic updated successfully');
        } catch (error) {
            console.error('Error in TopicController createTopic:', error);
            res.status(500).send('Failed to update topic');
        }
    }

    async deleteTopic(req: Request, res: Response): Promise<void> {
        try {

            const topicId: number = parseInt(req.params.topicId, 10);
            if (isNaN(topicId)) {
                res.status(400).send('Invalid topic ID');
                return;
            }

            await this.topicService.deleteTopic(topicId);
            res.status(200).send('topic deleted successfully');

        } catch (error) {
            console.error('Error in TopicController getTopic:', error);
            res.status(500).send('Failed to retrieve topic');
        }
    }

}