import { db, storage } from "@/libs/firebase"
import { doc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

type createProps = {
    id: string;
    email: string;
    senha: string;
    id_company: string;
}

type updateProps = {
    id_company: string;
    id: string;
    data: object;
}

type selectProps = {
    id_company: string;
    id: string;
}

type imageUploadProps = {
    id_company: string;
    file: Blob;
}

export async function createUser({id, email, senha, id_company}: createProps) {
    await setDoc(doc(db, 'companies', id_company), {
        id: id_company
    });

    await setDoc(doc(db, 'companies', id_company, 'clients', id), {
        id,
        email,
        password: senha,
        id_company,
        permission: 3
    });
}

export async function updateUser({id_company, id, data}: updateProps) {
    const ref = doc(db, "companies", id_company, "clients", id)

    await updateDoc(ref, data)
}

export async function selectUser({id_company, id}: selectProps) {
    const ref = collection(db, "companies", id_company, "clients")
    
    const q = query(ref, where("id", "==", id))
    
    const resUser = await getDocs(q)
    const resCompany = await selectCompany(id_company)
    

    return {resUser, resCompany}
}

export async function selectCompany(id_company: string) {
    const ref = collection(db, "companies")

    const q = query(ref, where("id", "==", id_company))

    return  await getDocs(q)
}

export async function updatePhoto({id_company, file}: imageUploadProps): Promise<string> {
    const referencesFile:string = Math.floor(Math.random() * 65536) + file.name;

    const storageRef = ref(storage, id_company +  "/images/" + referencesFile);

    await uploadBytes(storageRef, file)

    return await getDownloadURL(storageRef)
}
