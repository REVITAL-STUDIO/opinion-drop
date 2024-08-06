
import { Request, Response } from 'express';
import { HighlightService } from '../services/HighlightService';
import { validate, HighlightSchemaType } from '../utils/validation/schemas/HighlightSchema';


export class HighlightController {
    private highlightService: HighlightService;

    constructor() {
        this.highlightService = new HighlightService();

    }

    async createHighlight(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid highlight data');
                return;
            }

            const highlightData: HighlightSchemaType = req.body as HighlightSchemaType;

            await this.highlightService.createHighlight(highlightData);
            res.status(201).send('Highlight created successfully');
        } catch (error) {
            console.error('Error in HighlightController createHighlight:', error);
            res.status(500).send('Failed to create highlight');
        }
    }

    async getUserHighlights(req: Request, res: Response): Promise<void> {
        try {

            const opinionId: number = parseInt(req.params.opinionId, 10);
            if (isNaN(opinionId)) {
                res.status(400).send('Invalid highlight ID');
                return;
            }

            const userId: string = req.body.userId
            const highlights = await this.highlightService.getUserHighlights(opinionId, userId);

            res.status(200).json({
                status: 'success',
                message: 'user highlight retrieved',
                data: {
                    count: highlights.length,
                    highlights: highlights
                }
            });
        } catch (error) {
            console.error('Error in HighlightController getUserHighlights:', error);
            res.status(500).send('Failed to retrieve highlights');
        }
    }

    async updateHighlight(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid highlight data');
                return;
            }

            const highlightData: HighlightSchemaType = req.body as HighlightSchemaType;

            await this.highlightService.updateHighlight(highlightData);
            res.status(201).send('Highlight updated successfully');
        } catch (error) {
            console.error('Error in HighlightController updateHighlight:', error);
            res.status(500).send('Failed to update highlight');
        }
    }

    async deleteHighlight(req: Request, res: Response): Promise<void> {
        try {

            const highlightId: string = req.params.highlightId;
            if (!highlightId) {
                res.status(400).send('Invalid highlight ID');
                return;
            }

            await this.highlightService.deleteHighlight(highlightId);
            res.status(200).send('Highlight deleted successfully');

        } catch (error) {
            console.error('Error in HighlightController getHighlight:', error);
            res.status(500).send('Failed to retrieve highlight');
        }
    }

}