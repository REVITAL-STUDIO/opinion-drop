import { Opinion } from '../models/Opinion';
import { OpinionDAO } from '../data-access/OpinionDAO';
import pool from '../data-access/dbconnection';

export class OpinionService {
    private opinionDAO: OpinionDAO;

    constructor() {
        this.opinionDAO = new OpinionDAO(pool);
    }
    

    async createOpinion(opinionData: {
        userId: number,
        topicId: number,
        title: string,
        textContent: string,
        images?: string[],
        videos?: string[],
        documents?: string[],
        audios?: string[],
        createdAt: Date,
        updatedAt: Date
    }): Promise<void> {
        try {
            const newOpinion = new Opinion(
                opinionData.userId,
                opinionData.topicId,
                opinionData.title,
                opinionData.textContent,
                opinionData.images ?? null,
                opinionData.videos?? null,
                opinionData.documents?? null,
                opinionData.audios?? null,
                opinionData.createdAt,
                opinionData.updatedAt

            );
            await this.opinionDAO.createOpinion(newOpinion);
        } catch (error) {
            console.error('Error in OpinionService createOpinion:', error);
            throw new Error('Error creating opinion');
        }
    }

    async getOpinion(opinionId: number): Promise<Opinion | null> {
        try {
            return await this.opinionDAO.getOpinion(opinionId);
        } catch (error) {
            console.error('Error in OpinionService getOpinion:', error);
            throw new Error('Error retrieving opinion');
        }
    }

    async updateOpinion(opinionData: {
        opinionId?: number
        userId: number,
        topicId: number,
        title: string,
        textContent: string,
        images?: string[],
        videos?: string[],
        documents?: string[],
        audios?: string[],
        createdAt: Date,
        updatedAt: Date
    }): Promise<void> {
        try {
        
            const updatedOpinion = new Opinion(
                opinionData.userId,
                opinionData.topicId,
                opinionData.title,
                opinionData.textContent,
                opinionData.images ?? null,
                opinionData.videos?? null,
                opinionData.documents?? null,
                opinionData.audios?? null,
                opinionData.createdAt,
                opinionData.updatedAt,
                opinionData.opinionId
            );
            await this.opinionDAO.updateOpinion(updatedOpinion);
        } catch (error) {
            console.error('Error in OpinionService updateOpinion:', error);
            throw new Error('Error updating opinion');
        }
    }

    async deleteOpinion(opinionId: number): Promise<void> {
        try {
            await this.opinionDAO.deleteOpinion(opinionId);
        } catch (error) {
            console.error('Error in OpinionService deleteOpinion:', error);
            throw new Error('Error deleting opinion');
        }
    }
    

}