import type { Request, Response } from 'express';
import User from '../models/User';


export class AuthController {

    static async register(req: Request, res: Response) {
        const { email, password, username } = req.body;
        try {
            const user = new User({ email, password, username });
            await user.save();
            res.status(201).send('Nuevo usuario registrado');
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}