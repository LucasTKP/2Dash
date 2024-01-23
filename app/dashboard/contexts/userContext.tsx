import { createContext } from "react";
import { User } from "@/types";

export const UserContext = createContext<{
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}>({user: null, setUser: () => {}})