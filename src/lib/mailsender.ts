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
    const transporter = nodemailer.createTransport(options)
    console.log('🚀 ~ tracker 3 ~ mailSender ~ transporter:', transporter)
    const sendMessage = async () => {
        await transporter.sendMail({
            from: process.env.SMTP_USER, // sender address
            to: receiver, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
        })
    }

    await sendMessage()
    console.log("Sent")
}
