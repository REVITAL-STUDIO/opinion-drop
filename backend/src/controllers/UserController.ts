
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {

            await this.userService.createUser(req.body);
            res.status(201).send('User created successfully');
        } catch (error) {
            console.error('Error in UserController createUser:', error);
            res.status(500).send('Failed to create user');
        }
    }

}