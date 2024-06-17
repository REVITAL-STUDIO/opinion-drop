import { User } from '../models/User';
import { UserDAO } from '../data-access/UserDAO';
import pool from '../data-access/dbconnection';

export class UserService {
    private userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO(pool);
    }
    

    async createUser(userData: {
        username: string,
        email: string,
        passwordHash: string,
        bio?: string,
        profilePicture?: string,
        politicalAlignment?: string,
        createdAt: Date
    }): Promise<void> {
        try {
            const newUser = new User(
                userData.username,
                userData.email,
                userData.passwordHash,
                userData.createdAt,
                userData.bio,
                userData.profilePicture,
                userData.politicalAlignment
            );
            await this.userDAO.createUser(newUser);
        } catch (error) {
            console.error('Error in UserService createUser:', error);
            throw new Error('Error creating user');
        }
    }

    async getUser(userId: number): Promise<User | null> {
        try {
            return await this.userDAO.getUser(userId);
        } catch (error) {
            console.error('Error in UserService getUser:', error);
            throw new Error('Error retrieving user');
        }
    }

    async updateUser(userData: {
        userId?: number,
        username: string,
        email: string,
        passwordHash: string,
        bio?: string,
        profilePicture?: string,
        politicalAlignment?: string,
        createdAt: Date
    }): Promise<void> {
        try {
        
            const updatedUser = new User(
                userData.username,
                userData.email,
                userData.passwordHash,
                userData.createdAt,
                userData.bio,
                userData.profilePicture,
                userData.politicalAlignment,
                userData.userId
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