"use client"
import { useEffect, useState } from "react";


export default function List({getItem} : {getItem : ()=>number[]}){
    const [itemList,setItemList] = useState<number[]>([]);

    useEffect(()=>{
        console.log("Executing Even when only theme is changed")
        setItemList(getItem());
    },[getItem])

    return <>
        {itemList.map((item)=>{return <div key={item}>{item}</div>})}
    </>

}