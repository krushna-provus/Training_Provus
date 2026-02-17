"use client"
import { useContext,createContext, SetStateAction } from "react";

export const ComplexDashboardContext = createContext<{
    toggle : React.Dispatch<SetStateAction<boolean>>,
    value : boolean,
}|null>(null);

export function useComplexDashboard(){
    const ctx = useContext(ComplexDashboardContext);
    if(!ctx) throw new Error("Context must be provided");
    return ctx;
}

