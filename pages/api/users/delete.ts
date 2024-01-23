import { getAuth } from '../adminFirebase'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function DeleteUser(req: NextApiRequest, res: NextApiResponse) {
    try {
    await getAuth()
        .deleteUser(req.body.id_user)
        return res.send('')
    } catch (err) {
        return res.send('')
    }
}