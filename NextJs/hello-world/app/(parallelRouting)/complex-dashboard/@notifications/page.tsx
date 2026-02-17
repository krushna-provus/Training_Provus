"use client";
import Card from "@/components/Card";
import { useState } from "react";

export default function Notifications(){

    const [count,setCount] = useState(0);

    return <>
        <Card>Notifications
        <div>{count}</div>
        <button onClick={()=>setCount((prev)=>prev+1)}>Click me</button>
        </Card>
    </>
}