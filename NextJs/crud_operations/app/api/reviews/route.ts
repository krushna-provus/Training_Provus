import { dummyData } from "@/app/lib/dummy-data";
import { NextRequest, NextResponse } from "next/server";
import { Review } from "@/app/types/review";


export async function GET(){
    return NextResponse.json({success : true,reviewData : dummyData});
}

export async function POST(request : NextRequest){
    const creatingReviewData = await request.json();
    const validationResult = Review.safeParse(creatingReviewData);
    if(!validationResult.success){
        return NextResponse.json({
            error : validationResult.error.flatten()
        },{
            status : 400
        }
    )
    }

    const newReview = {
        id : dummyData.length + 1,
        createdAt : new Date(),
        ...validationResult.data
    }

    dummyData.push(newReview);
    return NextResponse.json({success : true,message : "Review Created successfully!"});
}
