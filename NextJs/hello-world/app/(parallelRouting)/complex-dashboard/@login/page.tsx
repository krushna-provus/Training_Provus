"use client";

import Card from "@/components/Card";
import { useComplexDashboard } from "../loginContext/loginContext";

export default function Login(){
    const {toggle} = useComplexDashboard();

    return <Card>
        <div>Login to Continue</div>
        <button onClick={()=>toggle(true)}>Login</button>
    </Card>
}