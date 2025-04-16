import { Request, Response, NextFunction } from 'express';


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    if (
        Object.keys(req.body).length === 0 ||
        Object.values(req.body).some(value => typeof value === 'string' && value.trim() === '')
    ) {
        res.status(400).send('Todos los campos son obligatorios');
        return;
    }

    next();
};

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(email)) {
        res.status(400).send('El correo no es válido');
        return;
    }
    next();
}

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter and one number
    if (!passwordRegex.test(password)) {
        res.status(400).send('La contraseña debe tener al menos 8 caracteres, una letra y un número');
        return;
    }
    next();
}

export const confirmPassword = (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        res.status(400).send('Las contraseñas no coinciden');
        return;
    }
    next();
}