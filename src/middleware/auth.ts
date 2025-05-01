import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('Usuario no autorizado')
        res.status(500).send(error.message)
        return
    }
    const token = bearer.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id).select('_id username email')
            if (user) {
                req.user = user
                next()
            } else {
                res.status(500).send('Token no válido')
                return
            }
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Token no válido' })
        return
    }
    
}