"use client";
import { useRouter } from "next/navigation";

export default function Orders(){

    const router = useRouter();

    function handleClick(){
        router.replace("/");
    }

    return <>
        <div>Order Page</div>
        <button onClick={handleClick}>Place Order</button>
    </>
}