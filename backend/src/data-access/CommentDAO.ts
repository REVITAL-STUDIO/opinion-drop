import { Pool, PoolClient, QueryResult } from 'pg';
import { Comment } from '../models/Comment';

export class CommentDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createComment(newComment: Comment): Promise<void> {
        const query = "INSERT INTO comments (user_id, opinion_id, parent_comment_id, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)"
        const commentData = newComment.getCommentData();
        const values = [
            commentData.userId,
            commentData.opinionId,
            commentData.parentCommentId,
            commentData.content,
            commentData.createdAt,
            commentData.updatedAt
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing create comment query:', error);
            throw new Error(`Error creating comment: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getComment(commentId: number): Promise<Comment | null> {
        const query = "SELECT * FROM comments WHERE comment_id = $1"


        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [commentId]);
            if (result.rows.length == 0) {
                return null; 
            }
            const commentData = result.rows[0];
            const comment = new Comment(
                commentData.userId,
                commentData.opinionId,
                commentData.parentCommentId,
                commentData.content,
                commentData.createdAt,
                commentData.updatedAt,
                commentData.commentId
            );
            return comment;
        } catch (error) {
            console.error('Error executing get comment query:', error);
            throw new Error(`Error retrieving comment: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateComment(comment: Comment): Promise<void> {
        const query = "UPDATE comments SET content = $1, updated_at = $2 WHERE comment_id = $3"
        const commentData = comment.getCommentData();

        const values = [
                commentData.content,
                commentData.updatedAt,
                commentData.commentId
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing update comment query:', error);
            throw new Error(`Error updating comment: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async deleteComment(commentId: number): Promise<void> {
        const query = "DELETE FROM comments WHERE comment_id = $1"

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [commentId]);
        } catch (error) {
            console.error('Error executing delete comment query:', error);
            throw new Error(`Error deleting comment: ${error}`);
        } finally {
            client && client.release();

        }
    }

}