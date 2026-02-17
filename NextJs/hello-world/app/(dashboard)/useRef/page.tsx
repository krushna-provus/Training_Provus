"use client";

import { useState } from "react";

// function usePrevious<T>(value : T){
//     const ref = useRef<T|undefined>(undefined);

//     useEffect(()=>{
//         ref.current = value;
//     },[value])

//     return ref.current; // Not allowed in React 19+
// }


export default function useRefHooK(){
    
    const [name,setName] = useState<string>("");
    //const prevName = usePrevious(name);

    return <>
        <div>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div>
            My name is {name}.
        </div>
    </>
}
