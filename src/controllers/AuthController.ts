import type { Request, Response } from 'express';
import User from '../models/User';
import { comparePassword, hashPassword } from '../utils/auth';
import Token from '../models/Token';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';
import { generateJWT } from '../utils/jwt';

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const { email, password, username } = req.body;
        try {
            const userExist = await User.findOne({ email });
            if (userExist) {
                const error = new Error('El email ya está registrado');
                res.status(409).send(error.message);
                return
            }
            const user = new User({ email, password, username });
            //Hash password
            user.password = await hashPassword(password);
            //Generate token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id;
            //send email
            AuthEmail.sendConfirmationEmail({ 
                email, 
                username, 
                token: token.token 
            });

            await Promise.allSettled([user.save(), token.save()]);
            res.send("Cuenta creada, revisa tu email para confirmar");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la cuenta' });
        }
    }
    static confirmAccount = async (req: Request, res: Response) => {
        const {token} = req.body;
        try {
            const TokenExist = await Token.findOne({token})
            if (!TokenExist) {
                const error = new Error('El token no es válido o ha expirado');
                res.status(404).send(error.message);
                return
            }
            const user = await User.findById(TokenExist.user)
            user.confirmed = true;
            await Promise.allSettled([user.save(), Token.deleteOne({token}) ])
            res.send('Cuenta confirmada 👌')
            
        } catch (error) {
            console.log(error);

        }
    }

    static login = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            const error = new Error('Usuario no encontrado')
            res.status(404).send(error.message)
            return
        }
        if(!user.confirmed){
            const token = new Token()
            token.token = generateToken()
            token.user = user.id;
            //send email
            AuthEmail.sendConfirmationEmail({ 
                email: user.email, 
                username: user.username, 
                token: token.token 
            });
            await token.save()
            const error = new Error('Cuenta no confirmada, revisa tu email con el nuevo token')
            res.status(401).send(error.message)
            return
        }
        
        //check password
        const passwordCorrect = await comparePassword(password, user.password)
        if(!passwordCorrect){
            const error = new Error('Contraseña incorrecta')
            res.status(401).send(error.message)
            return
        }
        const token = generateJWT({id:user.id})
        res.status(200).send(token)
    }

    static requestConfirmationCode = async (req: Request, res: Response) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('Cuenta no registrada');
                res.status(404).send(error.message);
                return
            }
            if(user.confirmed){
                const error = new Error('La cuenta ya está confirmada');
                res.status(403).send(error.message);
                return
            }

            //Generate token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id;
            //send email
            AuthEmail.sendConfirmationEmail({ 
                email, 
                username:user.username, 
                token: token.token 
            });

            await token.save();
            res.send("Revisa tu email para confirmar");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la cuenta' });
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('Cuenta no registrada');
                res.status(404).send(error.message);
                return
            }

            //Generate token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id;
            //send email
            await AuthEmail.sendPasswordResetToken({ 
                email, 
                username:user.username, 
                token: token.token 
            });
            await token.save();
            res.send("Revisa tu email para restablecer tu contraseña");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al enviar el token' });
        }
    }
    
    static validateToken = async (req: Request, res: Response) => {
        const {token} = req.body;
        try {
            const TokenExist = await Token.findOne({token})
            if (!TokenExist) {
                const error = new Error('El token no es válido o ha expirado');
                res.status(404).send(error.message);
                return
            }
            
            res.send('Ahora define una una contraseña 👌')
            
        } catch (error) {
            console.log(error);

        }
    }

    static updatePassword = async (req: Request, res: Response) => {
        
        const {token} = req.params;
        const {password} = req.body;
        try {
            const TokenExist = await Token.findOne({token})
            if (!TokenExist) {
                const error = new Error('El token no es válido o ha expirado');
                res.status(404).send(error.message);
                return
            }
            const user = await User.findById(TokenExist.user)
            user.password = await hashPassword(password);
            await Promise.allSettled([user.save(), Token.deleteOne({token}) ])
            res.send('Contraseña actualizada 👌')
            
        } catch (error) {
            console.log(error);

        }
    }

    static user = async (req: Request, res: Response) => {
        res.json(req.user)
        return
    }

}