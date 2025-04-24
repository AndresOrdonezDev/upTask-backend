import type { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import User from '../models/User';
import { hashPassword } from '../utils/auth';


export class AuthController {

    static async createAccount(req: Request, res: Response) {
        const { email, password, username } = req.body;
        try {
            const userExist = await User.findOne({ email });
            if (userExist) {
                res.status(409).json({ error: 'El email ya está registrado' });
                return 
            }
            const user = new User({ email, password, username });
            user.password = await hashPassword(password);
            await user.save();
            res.send("Cuenta creada, revisa tu email para confirmar");
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la cuenta'});
        }
    }
}