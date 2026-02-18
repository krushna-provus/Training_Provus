import { dummyData } from "@/app/lib/dummy-data";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_request : NextRequest,{params} : {params : Promise<{reviewId : string}>}){
    const {reviewId} = await params;
    const reviewIndex = dummyData.findIndex((review)=>review.id === parseInt(reviewId));
    const selectedReview = dummyData[reviewIndex];
    if(selectedReview){
        return NextResponse.json({success : true,review : selectedReview});
    }
    return NextResponse.json({success : false,message : `No review with Id : ${reviewId}`})
}

export async function PATCH(request : NextRequest,{params} : {params : Promise<{reviewId : string}>}){
    const {reviewId} = await params;
    const body = await request.json();
    const {updateReviewText} = body;
    const reviewIndex = dummyData.findIndex((review)=>review.id === parseInt(reviewId));
    if(reviewIndex > -1){
        dummyData[reviewIndex].review = updateReviewText;
        return NextResponse.json({success : true,review : dummyData[reviewIndex]})
    }
    return NextResponse.json({success : false,message : `No review with Id : ${reviewId}`})
}

export async function DELETE(_request : NextRequest,{params} : {params : Promise<{reviewId : string}>}){
    const {reviewId} = await params;
    const reviewIndex = dummyData.findIndex((review)=>review.id === parseInt(reviewId));
    if(reviewIndex > -1){
        const deletedReview = dummyData[reviewIndex];
        dummyData.splice(reviewIndex,1);
        return NextResponse.json({success : true,deletedReview});
    }
    return NextResponse.json({success : false,message : `No review with Id : ${reviewId}`})
     
}
