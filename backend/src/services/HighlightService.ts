import { Highlight } from '../models/Highlight';
import { HighlightDAO } from '../data-access/HighlightDAO';
import pool from '../data-access/dbconnection';

export class HighlightService {
    private highlightDAO: HighlightDAO;

    constructor() {
        this.highlightDAO = new HighlightDAO(pool);
    }
    

    async createHighlight(highlightData: {
        highlightId: string,
        userId: string,
        opinionId: number,
        highlightedText: string,
        reactionText: string,
        reactionType: string,
    }): Promise<void> {
        try {
            const newHighlight = new Highlight(
                highlightData.highlightId,
                highlightData.userId,
                highlightData.opinionId,
                highlightData.highlightedText,
                highlightData.reactionText,
                highlightData.reactionType,
            );
            await this.highlightDAO.createHighlight(newHighlight);
        } catch (error) {
            console.error('Error in HighlightService createHighlight:', error);
            throw new Error('Error creating highlight');
        }
    }

    async getUserHighlights(opinionId: number, userId: string): Promise<Highlight[]> {
        try {
            return await this.highlightDAO.getUserHighlights(opinionId, userId);
        } catch (error) {
            console.error('Error in HighlightService getHighlights:', error);
            throw new Error('Error retrieving highlights');
        }
    }

    async updateHighlight(highlightData: {
        highlightId: string,
        userId: string,
        opinionId: number,
        highlightedText: string,
        reactionText: string,
        reactionType: string,
    }): Promise<void> {
        try {
        
            const updatedHighlight = new Highlight(
                highlightData.highlightId,
                highlightData.userId,
                highlightData.opinionId,
                highlightData.highlightedText,
                highlightData.reactionText,
                highlightData.reactionType,
            );
            await this.highlightDAO.updateHighlight(updatedHighlight);
        } catch (error) {
            console.error('Error in HighlightService updateHighlight:', error);
            throw new Error('Error updating highlight');
        }
    }

    async deleteHighlight(highlightId: string): Promise<void> {
        try {
            await this.highlightDAO.deleteHighlight(highlightId);
        } catch (error) {
            console.error('Error in HighlightService deleteHighlight:', error);
            throw new Error('Error deleting highlight');
        }
    }
    

}