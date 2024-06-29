
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { validate, UserSchemaType } from '../utils/validation/schemas/UserSchema'; // Adjust the path as per your file structure


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();

    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {

            if (!validate(req.body)) {
                res.status(400).send('Invalid user data');
                return;
            }

            const userData: UserSchemaType = req.body as UserSchemaType;

            await this.userService.createUser(userData);
            res.status(201).send('User created successfully');
        } catch (error) {
            console.error('Error in UserController createUser:', error);
            res.status(500).send('Failed to create user');
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {

            const userId: number = parseInt(req.params.userId, 10);
            if (isNaN(userId)) {
                res.status(400).send('Invalid user ID');
                return;
            }

            const user = await this.userService.getUser(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error('Error in UserController getUser:', error);
            res.status(500).send('Failed to retrieve user');
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {

            const userId: number = parseInt(req.params.userId, 10);
            if (isNaN(userId)) {
                res.status(400).send('Invalid user ID');
                return;
            }

            if (!validate(req.body)) {
                res.status(400).send('Invalid user data');
                return;
            }

            const userData: UserSchemaType = req.body as UserSchemaType;
            userData.userId = userId;
            await this.userService.updateUser(userData);
            res.status(201).send('User updated successfully');
        } catch (error) {
            console.error('Error in UserController createUser:', error);
            res.status(500).send('Failed to create user');
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {

            const userId: number = parseInt(req.params.userId, 10);
            if (isNaN(userId)) {
                res.status(400).send('Invalid user ID');
                return;
            }

            await this.userService.deleteUser(userId);
            res.status(200).send('User deleted successfully');

        } catch (error) {
            console.error('Error in UserController getUser:', error);
            res.status(500).send('Failed to retrieve user');
        }
    }

}