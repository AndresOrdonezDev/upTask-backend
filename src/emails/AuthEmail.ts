import { transporter } from "../config/nodemailer"

interface IEmail{
    email:string,
    username:string,
    token:string
}

export class AuthEmail {
    static sendConfirmationEmail = async(user:IEmail) =>{
        try {
            await transporter.sendMail({
                from:`UpTask <${process.env.USER_EMAIL}>`,
                to: user.email,
                subject: 'Verifica tu cuenta',
                html: `<p>Hola👋🏻 ${user.username} , para verificar tu cuenta, visita el siguiente enlace 👇🏻 </p>
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Verificar cuenta</a>
                    <p>Tu código de activación es: <b>${user.token}</b></p>
                    <p>Tu código expira en: <b>10 Minutos</b></p>`
            })
        } catch (error) {
            console.log(error);
        }
    }
    static sendPasswordResetToken = async(user:IEmail) =>{
        try {
            await transporter.sendMail({
                from:`UpTask <${process.env.USER_EMAIL}>`,
                to: user.email,
                subject: 'Restablecer contraseña',
                html: `<p>Hola👋🏻 ${user.username} , para restablecer tu contraseña, visita el siguiente enlace 👇🏻 </p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Actualizar contraseña</a>
                    <p>Tu código de token es: <b>${user.token}</b></p>
                    <p>Tu código expira en: <b>10 Minutos</b></p>`
            })
        } catch (error) {
            console.log(error);
        }
    }
}