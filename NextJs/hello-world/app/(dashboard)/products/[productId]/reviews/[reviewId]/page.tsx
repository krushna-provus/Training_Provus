import { notFound } from "next/navigation";

function getRandomInteger(count : number){
    return Math.floor((Math.random()*count));
}

export default async function ReviewDetails(
    {params} : {params : Promise<{productId : string,reviewId : string}>}
){

    const randomNumber = getRandomInteger(2);
    if(randomNumber){
        throw new Error(`Error in Review ID with random number ${randomNumber}`);
    }

    const {reviewId,productId} = await params;
    if(parseInt(reviewId) > 1000){
        notFound();
    }
    return <h1>Review of {productId} is {reviewId}</h1>
}