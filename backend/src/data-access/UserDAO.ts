import { Pool, PoolClient, QueryResult } from 'pg';
import { User } from '../models/User';

export class UserDAO {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }


    async createUser(newUser: User): Promise<void> {
        const query = "INSERT INTO users (username, email, password_hash, bio, profile_picture, political_alignment) VALUES ($1, $2, $3, $4, $5, $6)"
        const userData = newUser.getUserData();
        const values = [
            userData.username,
            userData.email,
            userData.passwordHash,
            userData.bio,
            userData.profilePicture,
            userData.politicalAlignment,
        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            await client.query(query, values);
        } catch (error) {
            console.error('Error executing create user query:', error);
            throw new Error(`Error creating user: ${error}`);
        } finally {
            client && client.release();

        }
    }

    async getUser(userId: number): Promise<User | null> {
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
                userData.username,
                userData.email,
                userData.password_hash,
                userData.bio,
                userData.profile_picture,
                userData.political_alignment,
                userData.user_id,
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

        const query = "UPDATE users SET username = $1, email = $2, password_hash = $3, bio = $4, profile_picture = $5, political_alignment = $6 WHERE user_id = $7"
        const userData = user.getUserData();
        console.log("user data: ", userData);
        const values = [
            userData.username,
            userData.email,
            userData.passwordHash,
            userData.bio,
            userData.profilePicture,
            userData.politicalAlignment,
            userData.userId

        ];

        let client: PoolClient | undefined;

        try {
            client = await this.pool.connect();
            const resp = await client.query(query, values);
            if (resp.rowCount == 0){
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

}