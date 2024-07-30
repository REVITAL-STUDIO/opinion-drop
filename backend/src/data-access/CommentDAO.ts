import { Pool, PoolClient, QueryResult } from 'pg';
import { Comment } from '../models/Comment';
import { UserComment } from '../utils/types/dto';

export class CommentDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createComment(newComment: Comment): Promise<UserComment> {
        const query = `
                    INSERT INTO comments (user_id, opinion_id, content, parent_comment_id)
                    VALUES ($1, $2, $3, $4)
                    RETURNING 
                        comment_id AS id, 
                        user_id AS userId, 
                        opinion_id AS opinionId, 
                        content As textContent, 
                        likes,
                        parent_comment_id AS parentCommentId, 
                        created_at AS createdAt
    `;

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
            const result = await client.query(query, values);
            const newComment: UserComment = result.rows[0];
            console.log("new comment returning back: ", newComment);
            return newComment
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
          comments.content as textContent,
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
        comments.content as textContent,
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

    async getOpinionComments(opinionId: number): Promise<UserComment[]> {
        const query = `
        SELECT comments.comment_id as id, comments.content as textContent, 
               users.username as author, users.profile_picture as authorProfileImage, comments.parent_comment_id as parentcommentid, comments.likes, comments.created_At as createdAt
        FROM comments
        JOIN users ON comments.user_id = users.user_id
        WHERE parent_comment_id IS NULL AND opinion_id = $1
        ORDER BY comments.created_at DESC
    `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [opinionId]);

            const comments: UserComment[] = [];
            for (const row of result.rows) {

                comments.push(row as UserComment);
            }

            return comments;
        } catch (error) {
            console.error('Error executing getOpinionsComments query:', error);
            throw new Error(`Error retrieving comments for opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getChildComments(commentId: number): Promise<UserComment[]> {
        const query = `
        SELECT 
            c.comment_id as id, 
            c.user_id as userId, 
            c.opinion_id as opinionId, 
            c.parent_comment_id as parentCommentId, 
            c.content as textContent, 
            c.likes as likes, 
            c.created_at as createdAt, 
            c.updated_at as updatedAt,
            u.username as author,  
            p_author.username as parentCommentAuthor  
        FROM comments c
        JOIN users u ON c.user_id = u.user_id  
        LEFT JOIN comments parent_c ON c.parent_comment_id = parent_c.comment_id 
        LEFT JOIN users p_author ON parent_c.user_id = p_author.user_id  
        WHERE c.parent_comment_id IS NOT NULL AND c.parent_comment_id = $1
        ORDER BY c.created_at ASC
        `;
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [commentId]);

            const comments: UserComment[] = [];
            for (const row of result.rows) {

                comments.push(row as UserComment);
            }

            return comments;
        } catch (error) {
            console.error('Error executing getOpinionsComments query:', error);
            throw new Error(`Error retrieving comments for opinion: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async likeComment(commentId: number, userId: string): Promise<void> {
        const query = "UPDATE comments SET likes = likes + 1 WHERE comment_id = $1"
        const likeQuery = `INSERT INTO comment_likes (user_id, comment_id)
        VALUES ($1, $2)`

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [commentId]);
            await client.query(likeQuery, [userId, commentId]);
        } catch (error) {
            console.error('Error executing like comment query:', error);
            throw new Error(`Error liking comment: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async unlikeComment(commentId: number, userId: string): Promise<void> {
        const query = "UPDATE comments SET likes = likes - 1 WHERE comment_id = $1"
        const unlikeQuery = `DELETE FROM comment_likes WHERE user_id = $1 AND comment_id = $2`

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [commentId]);
            await client.query(unlikeQuery, [userId, commentId]);
        } catch (error) {
            console.error('Error executing like comment query:', error);
            throw new Error(`Error liking comment: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async userHasLiked(commentId: number, userId: string): Promise<boolean> {
        const query = `SELECT liked_at FROM comment_likes WHERE comment_id = $1 AND user_id = $2`

        let client: PoolClient | undefined;
         let hasLiked: boolean = false;
        try {
            client = await this.pool.connect();
            const resp = await client.query(query, [commentId, userId]);
            if(resp.rows[0]){
                hasLiked = true;
            }
            return hasLiked;
        } catch (error) {
            console.error('Error executing hasLiked query:', error);
            throw new Error(`Error retrieving hasliked: ${error}`);
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
            if (resp.rowCount == 0) {
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