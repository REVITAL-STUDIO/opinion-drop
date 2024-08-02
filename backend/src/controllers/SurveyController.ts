
import { Request, Response } from 'express';
import { SurveyService } from '../services/SurveyService';
import { SurveyResponse } from '../utils/types/dto';

export class SurveyController {
    private surveyService: SurveyService;

    constructor() {
        this.surveyService = new SurveyService();

    }


    async getSurveyByTopic(req: Request, res: Response): Promise<void> {
        try {

            const topicId: number = parseInt(req.params.topicId, 10);
            if (isNaN(topicId)) {
                res.status(400).send('Invalid topic ID');
                return;
            }

            const survey = await this.surveyService.getSurveyByTopic(topicId);
            if (survey) {
                res.status(200).json({
                    status: 'success',
                    message: 'survey retrieved',
                    data: {
                        surveyId: survey.surveyId,
                        questions: survey.questions
                    }
                });
            } else {
                res.status(404).send('survey not found');
            }
        } catch (error) {
            console.error('Error in SurveyController getSurveyByTopic:', error);
            res.status(500).send('Failed to retrieve survey');
        }
    }

    async submitResponse(req: Request, res: Response): Promise<void> {
        try {

            const response: SurveyResponse  = req.body

            await this.surveyService.submitResponse(response);
            
        } catch (error) {
            console.error('Error in SurveyController getSurveyByTopic:', error);
            res.status(500).send('Failed to retrieve survey');
        }
    }

    async hasUserSubmittedSurvey(req: Request, res: Response): Promise<void> {
        try {

            const surveyId: number = parseInt(req.params.surveyId, 10);
            if (isNaN(surveyId)) {
                res.status(400).send('Invalid topic ID');
                return;
            }

            const userId: string = req.body.userId
            const hasSubmitted = await this.surveyService.hasUserSubmittedSurvey(surveyId, userId);
            res.status(200).send({
                status: 'success',
                message: 'has submitted received succussfully',
                data: {
                    userHasSubmitted: hasSubmitted
                }
            });
        } catch (error) {
            console.error('Error in SurveyController hasUserSubmittedSurvey:', error);
            res.status(500).send('Failed to retrieve hassubmitted');
        }
    }


}