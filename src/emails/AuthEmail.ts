import { transporter } from "../config/nodemailer"

interface IEmail{
    email:string,
    username:string,
    token:string
}

export class AuthEmail {
    static sendConfirmationEmail = async(user:IEmail) =>{
        await transporter.sendMail({
            from:`UpTask <${process.env.USER_EMAIL}>`,
            to: user.email,
            subject: 'Verifica tu cuenta',
            html: `<p>Hola👋🏻 ${user.username} , para verificar tu cuenta, visita el siguiente enlace 👇🏻 </p>
                <a href="http://localhost:5173">Verificar cuenta</a>
                <p>Tu código de activación es: <b>${user.token}</b></p>
                <p>Tu código expira en: <b>10 Minutos</b></p>`
        })
    }
}