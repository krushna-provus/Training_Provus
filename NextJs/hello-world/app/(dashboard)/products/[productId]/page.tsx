import { Metadata } from "next";

type Props = {
    params : Promise<{productId : string}>;
}

export const generateMetadata = async ({params} : Props) : Promise<Metadata>=>{
    const id = (await params).productId;
    return {
        title : `Details : ${id}`
    }
}

export default async function ProductDetails(
    {params,} :  Props
){
    const {productId} = await params;
    return <h1>Details of Prodct {productId}</h1>
}