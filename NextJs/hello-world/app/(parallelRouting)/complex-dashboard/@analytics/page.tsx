import Card from "@/components/Card";
import Link from "next/link";

export default async function Analytics(){

    await new Promise((resolve)=>{
        setTimeout(() => {
            resolve("Delayed")
        }, 3000);
    })

    return <>
        <Card>
            <div>Analytics</div>
            <Link href={"/complex-dashboard/archived"}>Archived</Link>
        </Card>
    </>
}