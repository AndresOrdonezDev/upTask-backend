import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const config = () => {
    return {
        host: process.env.HOST_EMAIL,
        port: +process.env.PORT_EMAIL,
        secure: true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL,
        },
        tls: {
            rejectUnauthorized: false
        }
    }
}

export const transporter = nodemailer.createTransport(config());