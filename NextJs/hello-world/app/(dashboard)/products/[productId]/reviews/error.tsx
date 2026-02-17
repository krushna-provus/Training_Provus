"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ReviewErrorBoundary({error,reset}:{error : Error,reset : ()=>void}){

    const router = useRouter();
    
    const reload = ()=>{
        router.refresh();
        startTransition(()=>{
            reset();
        })
    }

    return <>
        <div>
            <div>{error.message}</div>
            <button onClick={()=>{reload()}}>Try again</button>
        </div>
    </>
}