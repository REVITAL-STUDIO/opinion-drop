import { Opinion } from '../models/Opinion';
import { OpinionDAO } from '../data-access/OpinionDAO';
import pool from '../data-access/dbconnection';
import { UserOpinion, RebuttalsAndOpinions } from '../utils/types/dto';
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

    // async createOpinionRebuttal(rebuttalData: {
    //     userId: string,
    //     topicId: number,
    //     title: string,
    //     textContent: string,
    //     backgroundImage: Express.Multer.File | null,
    //     parentOpinionId: number | null,
    //     images: string[] | null,
    //     videos: string[] | null,
    //     documents: string[] | null,
    //     audios: string[] | null,
    // }): Promise<void> {
    //     try {

    //         let uploadedImageUrl = null;

    //         if (rebuttalData.backgroundImage) {
    //             uploadedImageUrl = await uploadImage(rebuttalData.backgroundImage, 'images/opinion-backgrounds');
    //         }

    //         const newRebuttal = new Opinion(
    //             rebuttalData.userId,
    //             rebuttalData.topicId,
    //             rebuttalData.title,
    //             rebuttalData.textContent,
    //             uploadedImageUrl,
    //             rebuttalData.parentOpinionId,
    //             rebuttalData.images ?? null,
    //             rebuttalData.videos ?? null,
    //             rebuttalData.documents ?? null,
    //             rebuttalData.audios ?? null,

    //         );
    //         await this.opinionDAO.createOpinion(newRebuttal);
    //     } catch (error) {
    //         console.error('Error in OpinionService createOpinion:', error);
    //         throw new Error('Error creating opinion');
    //     }
    // }

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
    async getFavoriteOpinions(userId: string): Promise<UserOpinion[]> {
        try {
            return await this.opinionDAO.getFavoriteOpinions(userId);
        } catch (error) {
            console.error('Error in OpinionService getFavoriteOpinions:', error);
            throw new Error('Error retrieving favorite opinions');
        }
    }

    async getRebuttalsByUser(userId: string): Promise<RebuttalsAndOpinions> {
        try {
            return await this.opinionDAO.getRebuttalsByUser(userId);
        } catch (error) {
            console.error('Error in RebuttalService getRebuttalsByUser:', error);
            throw new Error('Error retrieving rebuttals by user');
        }
    }

    async getOpinionRebuttals(opinionId: number): Promise<UserOpinion[]> {
        try {
            return await this.opinionDAO.getOpinionRebuttals(opinionId);
        } catch (error) {
            console.error('Error in OpinionService getOpinionRebuttals:', error);
            throw new Error('Error retrieving opinion rebuttals');
        }
    }

    async likeOpinion(opinionId: number, userId: string): Promise<void> {
        try {
            await this.opinionDAO.likeOpinion(opinionId, userId);
        } catch (error) {
            console.error('Error in OpinionService likeOpinion:', error);
            throw new Error('Error liking opinion ');
        }
    }

    async unlikeOpinion(opinionId: number, userId: string): Promise<void> {
        try {
            await this.opinionDAO.unlikeOpinion(opinionId, userId);
        } catch (error) {
            console.error('Error in OpinionService unlikeOpinion:', error);
            throw new Error('Error unliking opinion ');
        }
    }

    async dislikeOpinion(opinionId: number, userId: string): Promise<void> {
        try {
            await this.opinionDAO.dislikeOpinion(opinionId, userId);
        } catch (error) {
            console.error('Error in OpinionService dislikeOpinion:', error);
            throw new Error('Error disliking opinion ');
        }
    }

    async undislikeOpinion(opinionId: number, userId: string): Promise<void> {
        try {
            await this.opinionDAO.undislikeOpinion(opinionId, userId);
        } catch (error) {
            console.error('Error in OpinionService undislikeOpinion:', error);
            throw new Error('Error undisliking opinion ');
        }
    }

    async favoriteOpinion(opinionId: number, userId: string): Promise<void> {
        try {
            await this.opinionDAO.favoriteOpinion(opinionId, userId);
        } catch (error) {
            console.error('Error in OpinionService favoriteOpinion:', error);
            throw new Error('Error favoriting opinion ');
        }
    }

    async unfavoriteOpinion(opinionId: number, userId: string): Promise<void> {
        try {
            await this.opinionDAO.unfavoriteOpinion(opinionId, userId);
        } catch (error) {
            console.error('Error in OpinionService unfavoriteOpinion:', error);
            throw new Error('Error unfavoriting opinion ');
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