"use client"
import { useCallback, useState } from "react"
import List from "./List";


export default function useCallbackHook(){

    const [count,setCount] = useState(0);
    const [dark,setDark] = useState(false);
    //useCallback actually returns the function.
    //useMemo return the function's return value.
    //Both are used for Referential Equality.
    const getItem = useCallback(()=>{
        return [count,count+1,count+2];
    },[count]);

    const themeStyle = {
        backgroundColor : dark ? "black" : "white",
        color : dark ? "white" : "black"
    }

    return <>
        <div style={themeStyle }>
            <div><input type="number" value={count} onChange={()=>setCount((prev)=>prev+1)}/></div>
            <button onClick={()=>{setDark((prev)=>!prev)}}>Toggle Theme</button>
            <List getItem={getItem}/>
        </div>
    </>
}
