import nodemailer from "nodemailer"
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function SendFeed(req: NextApiRequest, res: NextApiResponse) {

  const {name, email, feed, emoji} = req.body

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

  await new Promise((resolve, reject) => {
    transporter.sendMail({
      from: '"2Docs" <contato@2core.com.br>', // sender address
      to: "contato@2core.com.br", // list of receivers
      subject: "Novo feedback recebido ✔", // Subject line
      text: `Um feedback foi enviado pelo 2dash sobre o 2docs.`, // plain text body
      html: `
        <h2>Nome: ${name}</h2>
        <h2>Email: ${email}</h2>
        <h3>Feedback: ${feed}</h3>
        <h3>${emoji}</h3>
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