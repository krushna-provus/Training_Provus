import { dummyUsers } from "@/app/lib/dummy-data";
import { CreateUserSchema, User } from "@/app/types/users";
import jwtGenerator from "@/utils/jsonTokenGenerator";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request : NextRequest){
    const body = await request.json();
    const validationCheck = CreateUserSchema.safeParse(body);
    if(!validationCheck.success){
        return NextResponse.json({
            error : validationCheck.error.flatten()
        },{status : 400})
    }
    const storeUser : User = {
        id : dummyUsers.length + 1,
        createdAt : new Date(),
        ...body
    }
    dummyUsers.push(storeUser);
    const response =  NextResponse.json({
        success : true,
        message : "User signed up successfully"
    })
    response.cookies.set("token",jwtGenerator(body.email),{
        httpOnly : true,
        secure : true,
        sameSite: "strict",
        path : "/"
    });

    return response;
}