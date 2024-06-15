import { User } from '../models/User';
import { UserDAO } from '../data-access/UserDAO';
import pool from '../data-access/dbconnection';

export class UserService {
    private userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO(pool);
    }

    

}