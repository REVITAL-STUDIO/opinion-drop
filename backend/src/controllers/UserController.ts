
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { validate, UserSchemaType } from '../utils/validation/schemas/UserSchema'; 
import admin from '../utils/firebase/firebaseAdmin';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();

    }

    // async createUser(req: Request, res: Response): Promise<void> {
    //     try {

    //         if (!validate(req.body)) {
    //             res.status(400).send('Invalid user data');
    //             return;
    //         }

    //         const userData: UserSchemaType = req.body as UserSchemaType;

    //         await this.userService.createUser(userData);
    //         res.status(201).send('User created successfully');
    //     } catch (error) {
    //         console.error('Error in UserController createUser:', error);
    //         res.status(500).send('Failed to create user');
    //     }
    // }

    async registerUserProvider(req: Request, res: Response) {
        const { idToken } = req.body;

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const { uid, email } = decodedToken;

            if (!email) {
                return res.status(400).send("Email is required");
            }

            const existingUser = await this.userService.findUserByEmail(email);
            if (!existingUser) {
                const userId = await this.userService.createUser(uid, email);
                return res.status(201).json({ userId });
            }

            return res.status(200).json({ message: "User already exists." });
        } catch (error) {
            return res.status(500).send("Error registering user");
        }
    }

    async registerUserCredentials(req: Request, res: Response) {
        const { idToken } = req.body;
    
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const { uid, email } = decodedToken;
    
            if (!email) {
                return res.status(400).send("Email is required");
            }
            
            const existingUser = await this.userService.findUserByEmail(email);
            if (!existingUser) {
                const userId = await this.userService.createUser(uid, email);
                return res.status(201).json({ userId, message: "User created." });
            }
    
            return res.status(200).json({ user: existingUser.getUserData, message: "User already exists." });
        } catch (error) {
            return res.status(500).send("Error registering or signing in user");
        }
    }

    async loginUser(req: Request, res: Response) {
        const { idToken } = req.body;

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const { uid, email } = decodedToken;

            if (!email) {
                return res.status(400).send("Email is required");
            }

            const existingUser = await this.userService.findUserByEmail(email);
            if (existingUser) {
                return res.status(200).json({ message: "Login successful", user: existingUser });
            }

            return res.status(404).json({ message: "User not found" });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).send("Error logging in user");
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