import { Pool, PoolClient, QueryResult } from 'pg';
import { Highlight } from '../models/Highlight';

export class HighlightDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createHighlight(newHighlight: Highlight): Promise<void> {
        const query = "INSERT INTO highlights (highlight_id, user_id, opinion_id, highlighted_text, reaction_text, reaction_type) VALUES ($1, $2, $3, $4, $5, $6)"
        const highlightData = newHighlight.getHighlightData();
        const values = [
            highlightData.highlightId,
            highlightData.userId,
            highlightData.opinionId,
            highlightData.highlightedText,
            highlightData.reactionText,
            highlightData.reactionType,
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing create highlight query:', error);
            throw new Error(`Error creating highlight: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getUserHighlights(opinionId: number, userId: string): Promise<Highlight[]> {
        const query = "SELECT * FROM highlights WHERE opinion_id = $1 AND user_id = $2"


        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [opinionId, userId]);

            let highlights: Highlight[] = []

            for (const row of result.rows) {
                const highlightData = row
                const highlight = new Highlight(
                    highlightData.highlight_id,
                    highlightData.user_id,
                    highlightData.opinion_id,
                    highlightData.highlighted_text,
                    highlightData.reaction_text,
                    highlightData.reaction_type,
                    highlightData.created_at,
                    highlightData.updated_at,
                );
                highlights.push(highlight);
            }

            return highlights;
        } catch (error) {
            console.error('Error executing get highlights query:', error);
            throw new Error(`Error retrieving highlights: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateHighlight(highlight: Highlight): Promise<void> {
        const query = "UPDATE highlights SET user_id = $1, opinion_id = $2, highlighted_text = $3, reaction_text = $4, reaction_type = $5 WHERE highlight_id = $6"
        const highlightData = highlight.getHighlightData();

        const values = [
            highlightData.userId,
            highlightData.opinionId,
            highlightData.highlightedText,
            highlightData.reactionText,
            highlightData.reactionType,
            highlightData.highlightId
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const resp = await client.query(query, values);
            if (resp.rowCount == 0) {
                throw new Error(`Highlight with ID ${highlightData.highlightId} does not exist.`);
            }
        } catch (error) {
            console.error('Error executing update highlight query:', error);
            throw new Error(`Error updating highlight: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async deleteHighlight(highlightId: string): Promise<void> {
        const query = "DELETE FROM highlights WHERE highlight_id = $1"

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [highlightId]);
        } catch (error) {
            console.error('Error executing delete highlight query:', error);
            throw new Error(`Error deleting highlight: ${error}`);
        } finally {
            client && client.release();

        }
    }

}