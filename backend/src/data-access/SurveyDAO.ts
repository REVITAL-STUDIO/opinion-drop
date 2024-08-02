import { Pool, PoolClient, QueryResult } from 'pg';
import { SurveyResponse, TopicSurvey } from '../utils/types/dto';

export class SurveyDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async getSurveyByTopic(topicId: number): Promise<TopicSurvey | null> {
        const query = `
            SELECT 
            s.survey_id AS surveyId,
            s.topic_id AS topicId,
            json_agg(json_build_object('questionId', sq.question_id, 'questionText', sq.question_text)) AS questions
            FROM 
                surveys s
            JOIN 
                survey_questions sq ON s.survey_id = sq.survey_id
            WHERE 
                s.topic_id = $1
            GROUP BY 
            s.survey_id, s.topic_id;
        `;

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result = await client.query(query, [topicId]);

            if (result.rows.length === 0) {
                return null;
            }
            const survey = result.rows[0];
            return {
                surveyId: survey.surveyid,
                topicId: survey.topicid,
                questions: survey.questions
            };
        } catch (error) {
            console.error('Error fetching survey by topic ID:', error);
            throw new Error(`Error fetching survey by topic ID: ${error}`);
        } finally {
            client && client.release();
        }
    }

    async submitResponse(response: SurveyResponse): Promise<void> {
        const responseQuery = `
              INSERT INTO survey_responses (survey_id, user_id)
              VALUES ($1, $2)
              RETURNING response_id;
          `;

        const answersQuery = `
              INSERT INTO survey_answers (response_id, question_id, answer_value)
              VALUES ($1, $2, $3);
          `;

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();

            const responseResult = await client.query(responseQuery, [response.surveyId, response.userId]);
            const responseId = responseResult.rows[0].response_id;

            for (const [questionId, answerValue] of Object.entries(response.answers)) {
                await client.query(answersQuery, [responseId, parseInt(questionId, 10), answerValue]);
            }
        } catch (error) {
            console.error('Error inserting survey response:', error);
            throw new Error(`Error inserting survey response: ${error}`);
        } finally {
            client && client.release();
        }
    }

    async hasUserSubmittedSurvey(surveyId: number, userId: string): Promise<boolean> {
        const query = `SELECT response_id FROM survey_responses WHERE survey_id = $1 AND user_id = $2`

        let client: PoolClient | undefined;
        let hasSubmitted: boolean = false;
        try {
            client = await this.pool.connect();
            const resp = await client.query(query, [surveyId, userId]);
            if (resp.rows[0]) {
                hasSubmitted = true;
            }
            return hasSubmitted;
        } catch (error) {
            console.error('Error executing hasSubmitted query:', error);
            throw new Error(`Error retrieving hasSubmitted: ${error}`);
        } finally {
            client && client.release();

        }
    }


}