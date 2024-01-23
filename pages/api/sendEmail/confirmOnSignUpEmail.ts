import nodemailer from "nodemailer"
import {getAuth} from '../adminFirebase'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function SendFeed(req: NextApiRequest, res: NextApiResponse) {

    const {email} = req.body

    let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: 'contato@2core.com.br', // generated ethereal user
        pass: process.env.PUBLIC_EMAIL_PASS // generated ethereal password
        },
    });

    await new Promise((resolve, reject) => { 
        transporter.verify((error) => {
        if (error) {
            reject(error);
        } else {
            resolve(true);
        }
        });
    }); 

    const link = await getAuth().generateEmailVerificationLink(email)

    await new Promise((resolve, reject) => {
        transporter.sendMail({
            from: '"2Docs" <contato@2core.com.br>', // sender address
            to: `${email}`, // list of receivers
            subject: "Email de confirmação 2Docs ✔", // Subject line
            text: 'Email de confirmação 2Docs.', // plain text body
            html: `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    * {
                        padding: 0;
                        margin: 0;
                        vertical-align: baseline;
                        list-style: none;
                        border: 0
                    }
            
                    body {
                        display: flex;
                        color: #333333;
                        font-family: Arial, Helvetica, sans-serif;
                        background-color: transparent;
                    }
                </style>
            </head>
            
            <body>
            
                <table style="background-color: #ebebeb; padding-top: 15px; margin: 0 auto; max-width: 800px; width: 100%;">
                    <tr>
                        <td>
                            <div style="padding-left: 15px; padding-right: 15px;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/docs-dc26e.appspot.com/o/imagesEmail%2Flogo2DocsBlack.png?alt=media&token=5a0f7977-47fa-474e-ae92-c9cf9184bd5b"
                                    alt="" width="50" />
                            </div>
                        </td>
                    </tr>
            
                    <tr>
                        <td>
                            <div style="padding-left: 15px; padding-right: 15px; margin: 40px 0 0 0; text-align: center;">
                                <h1>Seu email foi cadastrado no 2Docs</h1>
                            </div>
                        </td>
                    </tr>
            
                    <tr>
                        <td>
                            <div style="padding-left: 15px; padding-right: 15px; display: flex; margin: 40px 0 0 0">
                                <img style="margin: auto;"
                                    src="https://firebasestorage.googleapis.com/v0/b/docs-dc26e.appspot.com/o/imagesEmail%2FconfirmedEmail.png?alt=media&token=b7520fd9-f9e4-4bdd-8e6b-41a5ba23aaa7"
                                    alt="" width="315">
                            </div>
                        </td>
                    </tr>
            
                    <tr>
                        <td>
                            <div style="padding-left: 15px; padding-right: 15px; text-align: center; margin: 40px 0 0 0;">
                                <h2>Clique no botão abaixo para <br /> concluir o seu cadastro </h2>
                            </div>
                        </td>
                    </tr>
            
                    <tr>
                        <td>
                            <div style="padding-left: 15px; padding-right: 15px; text-align: center; margin: 40px 0 0 0; cursor: pointer;">
                                <a href="${link}" style="text-decoration: none; background-color: #d6f4e9; border: 2px solid #10b981; border-radius: 8px; padding: 10px 20px; color: #10b981; font-weight: 600; font-size: 14px;" target="_blank">
                                    Confirmar Email
                                </a>
                            </div>
                        </td>
                    </tr>
            
                    <tr>
                        <td style="background-color: #10b981; display: flex; padding: 20px 0; margin: 40px 0 0 0">
                            <a style="margin: auto;" target="_blank" href="https://www.2core.com.br/">
                                <img src="https://firebasestorage.googleapis.com/v0/b/docs-dc26e.appspot.com/o/imagesEmail%2Flogo2CoreWhite.png?alt=media&token=946d631e-52ae-48b5-83ed-bde5265767a5"
                                    alt="" width="45">
                            </a>
                        </td>
                    </tr>
                </table>
            </body>
            
            </html>
            `, 
        }, (err, info) => {
            if (err) {
                reject(err);
            } else {
                res.status(200).send({message:'Feedback enviado!'})
                resolve(info);
            }
        });
    })
}