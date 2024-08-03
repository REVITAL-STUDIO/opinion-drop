import { User } from '../models/User';
import { UserDAO } from '../data-access/UserDAO';
import pool from '../data-access/dbconnection';

export class UserService {
    private userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO(pool);
    }
    

    async createUser(firebaseUUID: string, email: string) {
        return this.userDAO.createUser(firebaseUUID, email);
    }

    async findUserByEmail(email: string) {
        return this.userDAO.findUserByEmail(email);
    }


    async getUser(userId: string): Promise<User | null> {
        try {
            return await this.userDAO.getUser(userId);
        } catch (error) {
            console.error('Error in UserService getUser:', error);
            throw new Error('Error retrieving user');
        }
    }

    async updateUser(userData: {
        userId: number,
        username: string,
        email: string,
        bio: string | null,
        profilePicture: string | null,
        politicalAlignment: string | null,
    }): Promise<void> {
        try {        
            const updatedUser = new User(
                userData.userId,
                userData.username,
                userData.email,
                userData.bio,
                userData.profilePicture,
                userData.politicalAlignment,
            );
            await this.userDAO.updateUser(updatedUser);
        } catch (error) {
            console.error('Error in UserService updateUser:', error);
            throw new Error('Error updating user');
        }
    }

    async deleteUser(userId: number): Promise<void> {
        try {
            await this.userDAO.deleteUser(userId);
        } catch (error) {
            console.error('Error in UserService deleteUser:', error);
            throw new Error('Error deleting user');
        }
    }
    

}