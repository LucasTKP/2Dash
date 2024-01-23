import { db } from "@/libs/firebase"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Clients } from "@/types";
import axios from 'axios'

type selectProps = {
    id_company: string
}

type deleteProps = {
    id_company: string;
    id_user: string;
}

export async function selectClients({id_company}: selectProps) {
    const clients: Clients[] | any = []
    const ref = collection(db, "companies", id_company, "clients")
    
    const query = await getDocs(ref)

    query.forEach(client => {
        clients.unshift(client.data())
    })

    return clients
}

export async function deleteClient({id_company, id_user}: deleteProps) {
    try {
        await deleteDoc(doc(db, "companies", id_company, "clients", id_user));

        await axios.post('/api/users/delete', {
            id_user: id_user
        })
    } catch(err) {
        return err
    }
}