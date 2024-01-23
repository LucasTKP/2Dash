// CLIENTS TYPES
export type Clients = {
    id: string;
    name?: string;
    senha?: string;
    photo_url: string;
    email: string;
    permission: number;
    status: boolean;
    verifiedEmail?: boolean;
}

// USERS TYPES  
export type User = {
    id: string;
    name?: string;
    photo: string;
    email: string;
    telefone?: string;
    id_company: string;
    name_company?: string;
    tickets?: Array<{id: string, msg: string, date: string}>;
    plan: string;
    usage: number;
    expiration_plan_days: number | string;
    verifiedEmail?: boolean;
    domain: string;
    hadDiscont: boolean;
}