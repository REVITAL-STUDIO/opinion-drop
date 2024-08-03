import { Pool, PoolClient, QueryResult } from 'pg';
import { User } from '../models/User';

export class UserDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }



    async createUser(firebaseUUID: string, email: string): Promise<User | null> {
        const query = `
            INSERT INTO users (user_id, username, email)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const userName = await this.generateUniqueUsername();
        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [firebaseUUID, userName, email]);


            if (result.rows.length > 0) {
                const row = result.rows[0];
                return new User(
                    row.user_id,
                    row.username,
                    row.email,
                    row.bio,
                    row.profile_picture,
                    row.political_alignment,
                    row.created_at,
                    row.updated_at
                );
            }

            return null;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error(`Error creating user: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE email = $1"


        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [email]);


            if (result.rows.length > 0) {
                const row = result.rows[0];
                return new User(
                    row.user_id,
                    row.username,
                    row.email,
                    row.bio,
                    row.profile_picture,
                    row.political_alignment,
                    row.created_at,
                    row.updated_at
                );
            }
            return null; 

        } catch (error) {
            console.error('Error retrieving user by email:', error);
            throw new Error(`Error retrieving user by email: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getUser(userId: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE user_id = $1"


        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const result: QueryResult = await client.query(query, [userId]);
            if (result.rows.length == 0) {
                return null; // user does not exist
            }
            const userData = result.rows[0];
            console.log("userData: ", userData);
            const user = new User(
                userData.user_id,
                userData.username,
                userData.email,
                userData.bio,
                userData.profile_picture,
                userData.political_alignment,
                userData.favoriteOpinionIds,
                userData.created_at,
                userData.updated_at,

            );
            console.log("user: ", user);
            return user;
        } catch (error) {
            console.error('Error executing get user query:', error);
            throw new Error(`Error retrieving user: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async updateUser(user: User): Promise<void> {

        const query = "UPDATE users SET username = $1, email = $2, bio = $3, profile_picture = $4, political_alignment = $5 WHERE user_id = $6"
        const userData = user.getUserData();
        console.log("user data: ", userData);
        const values = [
            userData.username,
            userData.email,
            userData.bio,
            userData.profilePicture,
            userData.politicalAlignment,
            userData.userId

        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const resp = await client.query(query, values);
            if (resp.rowCount == 0) {
                throw new Error(`User with ID ${userData.userId} does not exist.`);
            }
        } catch (error) {
            console.error('Error executing update user query:', error);
            throw new Error(`Error updating user: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async deleteUser(userId: number): Promise<void> {
        const query = "DELETE FROM users WHERE user_id = $1"

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, [userId]);
        } catch (error) {
            console.error('Error executing delete user query:', error);
            throw new Error(`Error deleting user: ${error}`);
        } finally {
            client && client.release();

        }
    }

    private generateRandomNumber = () => Math.floor(Math.random() * 10000);

    private generateUniqueUsername = async () => {
        let isUnique = false;
        let username = '';

        while (!isUnique) {
            username = `anonymous${this.generateRandomNumber()}`;
            const res = await this.pool.query('SELECT 1 FROM users WHERE username = $1', [username]);
            if (res.rowCount === 0) {
                isUnique = true;
            }
        }

        return username;
    };

}