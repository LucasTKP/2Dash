import {getAuth} from '../adminFirebase'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function setAdmin(req: NextApiRequest, res: NextApiResponse) {
    if(req.body.action == 'assign') {
        try {
            const resAdmin = await getAuth().setCustomUserClaims(req.body.uid, { permission: req.body.level })
            return res.send(resAdmin)
        } catch(e) {
            return res.json(e)
        }
    }

    if(req.body.action == 'verify') {
        try {
            const user = await getAuth().getUser(req.body.uid)
            if (user.customClaims) {
                return res.send(user.customClaims['permission'])
            }
        } catch(e) {
            return res.json(e)
        }
    }
}