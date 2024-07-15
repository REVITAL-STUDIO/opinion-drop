import { Request, Response, NextFunction } from 'express';
import admin from './firebaseAdmin';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(403).send('Unauthorized');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Store user info in the request object
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).send('Unauthorized');
    }
};

export default verifyToken;