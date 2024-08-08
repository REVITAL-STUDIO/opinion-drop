
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { validate, UserSchemaType } from '../utils/validation/schemas/UserSchema';
import admin from '../utils/firebase/firebaseAdmin';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();

    }

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
                const user = await this.userService.createUser(uid, email);
                return res.status(201).json({
                    status: 'success',
                    message: 'user registerd!',
                    data: {
                        user: user
                    }
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'User already exists',
                data: {
                    user: existingUser
                }
            });
        }
        catch (error) {
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
                const user = await this.userService.createUser(uid, email);
                return res.status(201).json({
                    status: 'success',
                    message: 'user registerd!',
                    data: {
                        user: user
                    }
                });
            }

            return res.status(400).send("User with that email already exists");
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
                return res.status(201).json({
                    status: 'success',
                    message: 'user exists!',
                    data: {
                        user: existingUser
                    }
                });
            }

            return res.status(404).send("User not found" );
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).send("Error logging in user");
        }
    }


    async getUser(req: Request, res: Response): Promise<void> {
        try {

            const userId: string = req.params.userId;
            if (!userId) {
                res.status(400).send('Invalid user ID');
                return;
            }

            const user = await this.userService.getUser(userId);
            if (user) {
                res.status(200).json({
                    status: 'success',
                    message: 'user info retrieved successfully',
                    data: {
                        userData: user,
                    }
                });
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

        const { userId, username, email, profilePicture, politicalAlignment, bio} = req.body;
        console.log("REQUEST BODY: ", req.body);
        if (!userId) {
            res.status(400).send('Invalid user data');
            return;
        }

        const { file } = req;

        const userData = {
            userId,
            username,
            email,
            profilePicture,
            profilePictureFile: null as null | Express.Multer.File,
            politicalAlignment,
            bio
        };

        if (req.file) {
            userData.profilePictureFile = req.file; 
        }

            const user = await this.userService.updateUser(userData);
            res.status(201).json({
                status: 'success',
                message: 'user updated successfully',
                data: {
                    userData: user,
                }
            });
        } catch (error) {
            console.error('Error in UserController updateUser:', error);
            res.status(500).send('Failed to update user');
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