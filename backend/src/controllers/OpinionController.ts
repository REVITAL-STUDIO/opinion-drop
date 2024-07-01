
import { Request, Response } from 'express';
import { OpinionService } from '../services/OpinionService';
import { validate, OpinionSchemaType } from '../utils/validation/schemas/OpinionSchema'; // Adjust the path as per your file structure


export class OpinionController {
    private opinionService: OpinionService;

    constructor() {
        this.opinionService = new OpinionService();

    }

    async createOpinion(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid opinion data');
                return;
            }

            const opinionData: OpinionSchemaType = req.body as OpinionSchemaType;

            await this.opinionService.createOpinion(opinionData);
            res.status(201).send('Opinion created successfully');
        } catch (error) {
            console.error('Error in OpinionController createOpinion:', error);
            res.status(500).send('Failed to create opinion');
        }
    }

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