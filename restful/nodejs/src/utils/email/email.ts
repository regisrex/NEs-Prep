import { readFile } from 'fs';
import { createTransport } from 'nodemailer';
import { env } from '../env';


export const transporter = createTransport({
    service: env.SMTP_SERVER,
    host: env.SMTP_HOST,
    port: 587,
    secure: true,
    name: 'Sample',
    debug: true,
    auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        // console.log(error.message);
    } else if (success) {
        console.info('Smtp service connected');
    }
});


export function createPaymentReqHtml(paymentMethod: string, clientName: string, amount: string, dueDate: string, recipientName: string, accountNumber: string) {
    return new Promise<string>((resolve, reject) => {
        readFile('./templates/newpayment.template.html', 'utf-8', (err, data) => {
            if (err) reject(err.message)
            const newString = data.replace('{{--client-name--}}', clientName).replace('{{--payment-due-date--}}', dueDate).replace('{{--amount--}}', amount).replace("{{--payment-method--}}", paymentMethod).replace('{{--recipient-name--}}', recipientName).replace('{{--account-number--}}', accountNumber)
            resolve(newString)
        })
    })

}
export function createPaymentApprovalHtml(paymentMethod: string, clientName: string, amount: string, dueDate: string, recipientName: string, accountNumber: string) {
    return new Promise<string>((resolve, reject) => {
        readFile('./templates/approvepayment.template.html', 'utf-8', (err, data) => {
            if (err) reject(err.message)
            const newString = data.replace('{{--client-name--}}', clientName).replace('{{--payment-due-date--}}', dueDate).replace('{{--amount--}}', amount).replace("{{--payment-method--}}", paymentMethod).replace('{{--recipient-name--}}', recipientName).replace('{{--account-number--}}', accountNumber)
            resolve(newString)
        })
    })

}