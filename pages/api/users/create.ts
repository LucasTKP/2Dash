import { getAuth } from '../adminFirebase'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.body.verified && req.body.uid) {
            const response = await getAuth()
            .createUser({
                uid: req.body.uid,
                email: req.body.email,
                password: req.body.senha,
                displayName: req.body.id_company,
                emailVerified: true
            })
            return res.json(response)
        } else {
            const response = await getAuth()
            .createUser({
                email: req.body.email,
                password: req.body.senha,
                displayName: req.body.id_company,
                emailVerified: req.body.verified == undefined ? false : true
            })
            return res.json(response)
        }
    } catch (err) {
        throw err
    }
}