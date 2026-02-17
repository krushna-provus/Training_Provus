import { use } from "react";

console.log("Fetching Executed")
const promise = fetch("https://jsonplaceholder.typicode.com/todos/2").then((res)=>res.json())

export default function UseApi(){
    const data = use(promise);

    return <pre>{JSON.stringify(data,null,2)}</pre>

}