import axios from 'axios'
import { User } from 'firebase/auth'

export default async function verifyEmail(currentUser: User) {
    await axios.post('/api/sendEmail/confirmOnSignUpEmail', {
        email: currentUser.email
    })
}