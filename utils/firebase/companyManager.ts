import { db } from "@/libs/firebase"
import { doc, updateDoc } from "firebase/firestore";

type updateProps = {
    id: string;
    data: {
        name?: string;
        type?: string;
        difficulty?: number | number[];
        espectation?: string;
        domain?: string;
        hadDiscont?: boolean;
        cancelSubscriptionReasons?: Array<string>
    } 
}

export async function updateCompany({id, data}: updateProps) {
    const ref = doc(db, "companies", id)

    await updateDoc(ref, data)
}
