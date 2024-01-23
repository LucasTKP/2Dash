import { db } from "@/libs/firebase"
import { collection, query, where, getDocs } from "firebase/firestore";

type props = {
    businessName: string;
}

export default async function verifyCompany({businessName}: props) {
    const ref = collection(db, "companies");
    const q = query(ref, where("name", "==", businessName));

    return await getDocs(q);
}