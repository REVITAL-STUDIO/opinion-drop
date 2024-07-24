
import { Request, Response } from 'express';
import { OpinionService } from '../services/OpinionService';
import { validate, OpinionSchemaType } from '../utils/validation/schemas/OpinionSchema';



export class OpinionController {
    private opinionService: OpinionService;

    constructor() {
        this.opinionService = new OpinionService();

    }

    async createOpinion(req: Request, res: Response): Promise<void> {
        try {

            const { title, textContent, userId, topicId, parentOpinionId, images, videos, audios, documents } = req.body;
            console.log("createopinion request body: ", req.body);
            if (!title || !textContent || !userId || !topicId) {
                res.status(400).send('Invalid opinion data');
                return;
            }

            const { file } = req;
            console.log("Uploaded file: ", file);

            const opinionData = {
                title,
                textContent,
                userId,
                topicId,
                backgroundImage: null as null | Express.Multer.File,
                parentOpinionId,
                images,
                videos,
                audios,
                documents,

            };

            if (req.file) {
                opinionData.backgroundImage = req.file; 
            }

            await this.opinionService.createOpinion(opinionData);
            res.status(201).send('Opinion created successfully');
        } catch (error) {
            console.error('Error in OpinionController createOpinion:', error);
            res.status(500).send('Failed to create opinion');
        }
    }

    
    // async createOpinionRebuttal(req: Request, res: Response): Promise<void> {
    //     try {

    //         const { title, textContent, userId, topicId, parentOpinionId, images, videos, audios, documents } = req.body;
    //         console.log("createopinion request body: ", req.body);
    //         if (!title || !textContent || !userId || !topicId || parentOpinionId) {
    //             res.status(400).send('Invalid opinion rebuttal data');
    //             return;
    //         }

    //         const { file } = req;
    //         console.log("Uploaded file: ", file);

    //         const rebuttalData = {
    //             title,
    //             textContent,
    //             userId,
    //             topicId,
    //             backgroundImage: null as null | Express.Multer.File,
    //             parentOpinionId,
    //             images,
    //             videos,
    //             audios,
    //             documents,

    //         };

    //         if (req.file) {
    //             rebuttalData.backgroundImage = req.file; // or handle the file as needed
    //         }

    //         await this.opinionService.createOpinionRebuttal(rebuttalData);
    //         res.status(201).send('Rebuttal created successfully');
    //     } catch (error) {
    //         console.error('Error in OpinionController createOpinionRebuttal:', error);
    //         res.status(500).send('Failed to create rebuttal');
    //     }
    // }

    async getOpinion(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);

            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }

            const opinion = await this.opinionService.getOpinion(opinionId);
            if (opinion) {
                res.status(200).json(opinion);
            } else {
                res.status(404).send('Opinion not found');
            }
        } catch (error) {
            console.error('Error in OpinionController getOpinion:', error);
            res.status(500).send('Failed to retrieve opinion');
        }
    }

    async getOpinions(req: Request, res: Response): Promise<void> {
        try {

            const opinions = await this.opinionService.getOpinions();
            res.status(200).json({
                status: 'success',
                message: 'Opinions retrieved successfully',
                data: {
                    count: opinions.length,
                    opinions: opinions
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getOpinions:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve opinions'
            });
        }
    }

    async getOpinionsByTopic(req: Request, res: Response): Promise<void> {
        try {

            const topicId: number = parseInt(req.params.topicId, 10);
            if (isNaN(topicId)) {
                res.status(400).send('Invalid topic ID');
                return;
            }
            const opinions = await this.opinionService.getOpinionsByTopic(topicId);
            res.status(200).json({
                status: 'success',
                message: 'Opinions retrieved successfully',
                data: {
                    count: opinions.length,
                    opinions: opinions
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getOpinionsById:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve opinions'
            });
        }
    }

    async getOpinionsByUser(req: Request, res: Response): Promise<void> {
        try {

            const userId: string = req.params.userId;
            console.log("userid: ", userId);

            if (!userId) {
                res.status(400).send('Invalid user ID');
                return;
            }
            const opinions = await this.opinionService.getOpinionsByUser(userId);
            res.status(200).json({
                status: 'success',
                message: 'Opinions retrieved successfully',
                data: {
                    count: opinions.length,
                    opinions: opinions
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getOpinionsByUser:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve opinions'
            });
        }
    }

    async getOpinionRebuttals(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            console.log("topicid: ", opinionId);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
           
            const opinions = await this.opinionService.getOpinionRebuttals(opinionId);
            res.status(200).json({
                status: 'success',
                message: 'Rebuttals retrieved successfully',
                data: {
                    count: opinions.length,
                    opinions: opinions
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getOpinionsByUser:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve opinions'
            });
        }
    }

    async updateOpinion(req: Request, res: Response): Promise<void> {
        try {
            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }

            if (!validate(req.body)) {
                res.status(400).send('Invalid opinion data');
                return;
            }

            const opinionData: OpinionSchemaType = req.body as OpinionSchemaType;
            opinionData.opinionId = opinionId;
            await this.opinionService.updateOpinion(opinionData);
            res.status(201).send('Opinion updated successfully');
        } catch (error) {
            console.error('Error in OpinionController createOpinion:', error);
            res.status(500).send('Failed to update opinion');
        }
    }

    async deleteOpinion(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }

            await this.opinionService.deleteOpinion(opinionId);
            res.status(200).send('Opinion deleted successfully');

        } catch (error) {
            console.error('Error in OpinionController getOpinion:', error);
            res.status(500).send('Failed to retrieve opinion');
        }
    }

}