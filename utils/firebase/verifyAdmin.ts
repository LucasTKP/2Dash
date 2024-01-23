import axios from "axios"

export default async function verifyAdmin(uid: string) {
    const res = await axios.post('/api/users/admin', {
        action: 'verify',
        uid: uid
    })

    return res
}