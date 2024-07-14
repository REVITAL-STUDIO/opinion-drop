import { UserRecord } from 'firebase-admin/auth';

import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { 
                uid: string;
                email?: string;
            };
        }
    }
}