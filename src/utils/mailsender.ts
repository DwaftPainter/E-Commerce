import nodemailer from 'nodemailer'
import SMTPConnection from 'nodemailer/lib/smtp-connection'

const options: SMTPConnection.Options = {
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
}


export const mailSender = async (receiver: any, subject?: any, text?: any, html?: any) => {
    console.log("Host:" + process.env.SMTP_HOST)
    console.log("User:" + process.env.SMTP_USER)
    console.log("Pass:" + process.env.SMTP_PASS)
    const transporter = nodemailer.createTransport(options)

    const info = await transporter.sendMail({
        from: process.env.SMTP_USER, // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body
    })

    console.log('🚀 ~ mailSender ~ info:', info)
}
