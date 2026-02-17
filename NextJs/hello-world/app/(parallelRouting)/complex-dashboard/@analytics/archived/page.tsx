import Card from "@/components/Card";
import Link from "next/link";

export default async function ArchivedAnalytics(){
    return <>
        <Card>
            <div>Archived Analytics</div>
            <Link href={"/complex-dashboard"}>Default</Link>
        </Card>
    </>
}