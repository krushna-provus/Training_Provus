import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse>{
    const response =  NextResponse.json({
        success : true,
        message : "Logged out successfully!"
    });
    response.cookies.delete("token");
    return response;
}
