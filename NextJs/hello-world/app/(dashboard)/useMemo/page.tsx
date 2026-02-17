"use client";

import { useEffect, useMemo, useState } from "react";

//This operation is costly.
function slowFunction(val : number){
    for(let i = 0; i < 1000000000; i++){};
    return val*2;
}


export default function useMemoHook(){

    const [count,setCount] = useState<number>(0);
    const [dark,setDark] = useState<boolean>(false);
    
    //Costly operation is wrapped in useMemo, so it doesn't execute unless dependecy element is changed.
    const doubleNumber = useMemo(()=> slowFunction(count),[count]);


    const themeStyle = useMemo(()=>{
       return  {
        backgroundColor : dark ? "black" : "white",
        color : dark ? "white" : "black"
    }
    },[dark]); 
    //useMemo offers Referential Equality, i.e after useMemo is executed, it re-creates Array and Objects and their refernece is changed causing useEffect to execute if array or object is passed as dependency element in useEffect array.
    //So wrap the Non-Primitive Data types in useMemo();
    useEffect(()=>{
        console.log("Theme Changed ! ");
    },[themeStyle])

    return <>
        <div>
            <div><input type="number" value={count} onChange={()=>{setCount((prev)=>prev+1)}}/></div>
            <div><button onClick={()=>setDark((prevTheme)=>!prevTheme)}>Change Theme</button></div>
            <div style={themeStyle}>{doubleNumber}</div>
        </div>
    </>
}