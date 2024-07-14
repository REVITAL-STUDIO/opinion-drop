import { Pool, PoolClient, QueryResult } from 'pg';
import { Comment } from '../models/Comment';
import { UserComment } from '../utils/types/dto';

export class CommentDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createComment(newComment: Comment): Promise<void> {
        const query = "INSERT INTO comments (user_id, opinion_id, content, parent_comment_id) VALUES ($1, $2, $3, $4)"
        const commentData = newComment.getCommentData();
        console.log("comment data: ", commentData);
        const values = [
            commentData.userId,
            commentData.opinionId,
            commentData.content,
            commentData.parentCommentId,
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

    async getComment(commentId: number): Promise<UserComment | null> {
        const query = `
        SELECT
          comments.comment_id as id,
          users.username as author,
          comments.content,
          users.profile_picture as authorProfilePicture,
          comments.parent_comment_id as parentCommentId,
          comments.created_at as createdAt,
          comments.updated_at as updatedAt
        FROM comments
        JOIN users ON comments.user_id = users.user_id
        WHERE comments.comment_id = $1
      `;

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [commentId]);
            if (result.rows.length == 0) {
                return null; 
            }
            const commentData = result.rows[0] as UserComment;

            return commentData;
        } catch (error) {
            console.error('Error executing get comment query:', error);
            throw new Error(`Error retrieving comment: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getComments(): Promise<UserComment[]> {
        const query = `
        SELECT
        comments.comment_id as id,
        users.username as author,
        comments.content,
        users.profile_picture as authorProfilePicture,
        comments.parent_comment_id as parentCommentId,
        comments.created_at as createdAt,
        comments.updated_at as updatedAt
      FROM comments
      JOIN users ON comments.user_id = users.user_id
    `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query);

            const comments: UserComment[] = [];
            for (const row of result.rows) {

                comments.push(row as UserComment);
            }

            return comments;
        } catch (error) {
            console.error('Error executing get comments query:', error);
            throw new Error(`Error retrieving comments: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateComment(comment: Comment): Promise<void> {
        const query = "UPDATE comments SET content = $1 WHERE comment_id = $2"
        const commentData = comment.getCommentData();

        const values = [
                commentData.content,
                commentData.commentId
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const resp = await client.query(query, values);
            if (resp.rowCount == 0){
                throw new Error(`Comment with ID ${commentData.commentId} does not exist.`);
            }
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