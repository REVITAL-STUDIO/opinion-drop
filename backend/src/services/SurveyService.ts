import { SurveyDAO } from '../data-access/SurveyDAO';
import pool from '../data-access/dbconnection';
import { SurveyResponse, TopicSurvey } from '../utils/types/dto';

export class SurveyService {
    private surveyDAO: SurveyDAO;

    constructor() {
        this.surveyDAO = new SurveyDAO(pool);
    }
    

    async getSurveyByTopic(topicId: number): Promise<TopicSurvey | null> {
        try {
            return await this.surveyDAO.getSurveyByTopic(topicId);
        } catch (error) {
            console.error('Error in SurveyService getSurveyByTopic:', error);
            throw new Error('Error retrieving survey');
        }
    }

    async submitResponse(response: SurveyResponse): Promise<void> {
        try {
            await this.surveyDAO.submitResponse(response);
        } catch (error) {
            console.error('Error in SurveyService submitResponse:', error);
            throw new Error('Error submitting survey');
        }
    }
    
    async hasUserSubmittedSurvey(surveyId: number, userId: string): Promise<boolean> {
        try {
            return await this.surveyDAO.hasUserSubmittedSurvey(surveyId, userId);
        } catch (error) {
            console.error('Error in SurveyService hasUserSubmittedSurvey:', error);
            throw new Error('Error retrieving hassubmitted');
        }
    }

}