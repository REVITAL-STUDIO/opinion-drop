import { Opinion } from '../models/Opinion';
import { OpinionDAO } from '../data-access/OpinionDAO';
import pool from '../data-access/dbconnection';
import { UserOpinion } from '../utils/types/dto';
import { uploadImage } from '../utils/aws/uploadToS3';

export class OpinionService {
    private opinionDAO: OpinionDAO;

    constructor() {
        this.opinionDAO = new OpinionDAO(pool);
    }


    async createOpinion(opinionData: {
        userId: string,
        topicId: number,
        title: string,
        textContent: string,
        backgroundImage: Express.Multer.File | null,
        parentOpinionId: number | null,
        images: string[] | null,
        videos: string[] | null,
        documents: string[] | null,
        audios: string[] | null,
    }): Promise<void> {
        try {

            let uploadedImageUrl = null;

            if (opinionData.backgroundImage) {
                uploadedImageUrl = await uploadImage(opinionData.backgroundImage, 'images/opinion-backgrounds');
            }

            const newOpinion = new Opinion(
                opinionData.userId,
                opinionData.topicId,
                opinionData.title,
                opinionData.textContent,
                uploadedImageUrl,
                opinionData.parentOpinionId,
                opinionData.images ?? null,
                opinionData.videos ?? null,
                opinionData.documents ?? null,
                opinionData.audios ?? null,

            );
            await this.opinionDAO.createOpinion(newOpinion);
        } catch (error) {
            console.error('Error in OpinionService createOpinion:', error);
            throw new Error('Error creating opinion');
        }
    }

    async getOpinion(opinionId: number): Promise<UserOpinion | null> {
        try {
            return await this.opinionDAO.getOpinion(opinionId);
        } catch (error) {
            console.error('Error in OpinionService getOpinion:', error);
            throw new Error('Error retrieving opinion');
        }
    }

    async getOpinions(): Promise<UserOpinion[]> {
        try {
            return await this.opinionDAO.getOpinions();
        } catch (error) {
            console.error('Error in OpinionService getOpinions:', error);
            throw new Error('Error retrieving opinions');
        }
    }

    async getOpinionsByTopic(topicId: number): Promise<UserOpinion[]> {
        try {
            return await this.opinionDAO.getOpinionsByTopic(topicId);
        } catch (error) {
            console.error('Error in OpinionService getOpinionsByTopic:', error);
            throw new Error('Error retrieving opinions by topic');
        }
    }

    async getOpinionsByUser(userId: string): Promise<UserOpinion[]> {
        try {
            return await this.opinionDAO.getOpinionsByUser(userId);
        } catch (error) {
            console.error('Error in OpinionService getOpinionsByUser:', error);
            throw new Error('Error retrieving opinions by user');
        }
    }

    async updateOpinion(opinionData: {
        opinionId?: number
        userId: string,
        topicId: number,
        title: string,
        textContent: string,
        backgroundImage: Express.Multer.File | null,
        parentOpinionId: number | null,
        images: string[] | null,
        videos: string[] | null,
        documents: string[] | null,
        audios: string[] | null,
    }): Promise<void> {
        try {

            let uploadedImageUrl = null;

            if (opinionData.backgroundImage) {
                uploadedImageUrl = await uploadImage(opinionData.backgroundImage, 'images/opinion-backgrounds');
            }


            const updatedOpinion = new Opinion(
                opinionData.userId,
                opinionData.topicId,
                opinionData.title,
                opinionData.textContent,
                uploadedImageUrl,
                opinionData.parentOpinionId,
                opinionData.images ?? null,
                opinionData.videos ?? null,
                opinionData.documents ?? null,
                opinionData.audios ?? null,
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