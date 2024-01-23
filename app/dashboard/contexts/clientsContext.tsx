import { createContext } from "react";
import { Clients } from "@/types";

export const ClientsContext = createContext<{
    clients: Clients[] | null;
    setClients: React.Dispatch<React.SetStateAction<Clients[] | null>>
}>({clients: null, setClients: () => {}})