
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
            if (!title || !textContent || !userId || !topicId) {
                res.status(400).send('Invalid opinion data');
                return;
            }

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

    async getFavoriteOpinions(req: Request, res: Response): Promise<void> {
        try {

            const userId: string = req.params.userId;

            if (!userId) {
                res.status(400).send('Invalid user ID');
                return;
            }

            const opinions = await this.opinionService.getFavoriteOpinions(userId);
            res.status(200).json({
                status: 'success',
                message: 'favorite opinions retrieved successfully',
                data: {
                    count: opinions.length,
                    opinions: opinions
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getFavoriteOpinions:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve favorite opinions'
            });
        }
    }

    async getRebuttalsByUser(req: Request, res: Response): Promise<void> {
        try {

            const userId: string = req.params.userId;

            if (!userId) {
                res.status(400).send('Invalid user ID');
                return;
            }
            const rebuttalsAndOpinions = await this.opinionService.getRebuttalsByUser(userId);
            res.status(200).json({
                status: 'success',
                message: 'user rebuttals retrieved successfully',
                count: rebuttalsAndOpinions.rebuttals.length,
                data: {
                    rebuttals: rebuttalsAndOpinions.rebuttals,
                    rebuttaledOpinions: rebuttalsAndOpinions.rebuttaledOpinions
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getRebuttalsByUser:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve rebuttals'
            });
        }
    }

    async getOpinionRebuttals(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
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

    async likeOpinion(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const userId: string = req.body.userId
            await this.opinionService.likeOpinion(opinionId, userId);
            res.status(200).send('Opinion liked successfully');

        } catch (error) {
            console.error('Error in OpinionController likeOpinion:', error);
            res.status(500).send('Failed to like opinion');
        }
    }

    async userHasLiked(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const userId: string = req.body.userId
            const hasLiked: boolean = await this.opinionService.userHasLiked(opinionId, userId);
            res.status(200).send({
                status: 'success',
                message: 'has liked received succussfully',
                data: {
                    userHasLiked: hasLiked
                }
            });
        } catch (error) {
            console.error('Error in OpinionController userHasLiked:', error);
            res.status(500).send('Failed to retrieve has liked');
        }
    }

    async unlikeOpinion(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const userId: string = req.body.userId
            await this.opinionService.unlikeOpinion(opinionId, userId);
            res.status(200).send('Opinion unliked successfully');

        } catch (error) {
            console.error('Error in OpinionController unlikeOpinion:', error);
            res.status(500).send('Failed to unlike opinion');
        }
    }

    async getNumLikes(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const numLikes = await this.opinionService.getNumLikes(opinionId);
            res.status(200).send({
                status: 'success',
                message: 'likes count received succussfully',
                data: {
                    numLikes: numLikes
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getNumLikes:', error);
            res.status(500).send('Failed to get like count');
        }
    }

    async getNumDislikes(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const numDislikes = await this.opinionService.getNumDislikes(opinionId);
            res.status(200).send({
                status: 'success',
                message: 'dislikes count received succussfully',
                data: {
                    numDislikes: numDislikes
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getNumDislikes:', error);
            res.status(500).send('Failed to get dislike count');
        }
    }

    async dislikeOpinion(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const userId: string = req.body.userId
            await this.opinionService.dislikeOpinion(opinionId, userId);
            res.status(200).send('Opinion disliked successfully');

        } catch (error) {
            console.error('Error in OpinionController dislikeOpinion:', error);
            res.status(500).send('Failed to dislike opinion');
        }
    }

    async userHasDisliked(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid comment ID');
                return;
            }
            const userId: string = req.body.userId
            const hasDisliked: boolean = await this.opinionService.userHasDisliked(opinionId, userId);
            res.status(201).send({
                status: 'success',
                message: 'has disliked received succussfully',
                data: {
                    userHasDisliked: hasDisliked
                }
            });
        } catch (error) {
            console.error('Error in OpinionController userHasDisliked:', error);
            res.status(500).send('Failed to retrieve has disliked');
        }
    }

    async undislikeOpinion(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const userId: string = req.body.userId
            await this.opinionService.undislikeOpinion(opinionId, userId);
            res.status(200).send('Opinion undisliked successfully');

        } catch (error) {
            console.error('Error in OpinionController undislikeOpinion:', error);
            res.status(500).send('Failed to undislike opinion');
        }
    }

    async favoriteOpinion(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const userId: string = req.body.userId
            await this.opinionService.favoriteOpinion(opinionId, userId);
            res.status(200).send('Opinion favorited successfully');

        } catch (error) {
            console.error('Error in OpinionController favoriteOpinion:', error);
            res.status(500).send('Failed to favorite opinion');
        }
    }

    async unfavoriteOpinion(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const userId: string = req.body.userId
            await this.opinionService.unfavoriteOpinion(opinionId, userId);
            res.status(200).send('Opinion unfavorited successfully');

        } catch (error) {
            console.error('Error in OpinionController unfavoriteOpinion:', error);
            res.status(500).send('Failed to unfavorite opinion');
        }
    }

    async userHasFavorited(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const userId: string = req.body.userId
            const hasFavorited: boolean = await this.opinionService.userHasFavorited(opinionId, userId);
            res.status(200).send({
                status: 'success',
                message: 'has favorited received succussfully',
                data: {
                    userHasFavorited: hasFavorited
                }
            });
        } catch (error) {
            console.error('Error in OpinionController userHasFavorited:', error);
            res.status(500).send('Failed to retrieve has favorited');
        }
    }

    async getAvgRating(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid opinion ID');
                return;
            }
            const avgRating = await this.opinionService.getAvgRating(opinionId);
            res.status(200).send({
                status: 'success',
                message: 'society rating received',
                data: {
                    avgRating: avgRating
                }
            });
        } catch (error) {
            console.error('Error in OpinionController getAvgRating', error);
            res.status(500).send('Failed to get avg rating');
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