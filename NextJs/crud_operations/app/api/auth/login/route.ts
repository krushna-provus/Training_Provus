import { dummyUsers } from "@/app/lib/dummy-data";
import { LoginUser, LoginUserSchema } from "@/app/types/users";
import jwtGenerator from "@/utils/jsonTokenGenerator";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request : NextRequest){
    const body : LoginUser = await request.json();
    const validationCheck = LoginUserSchema.safeParse(body);
    if(!validationCheck.success){
        return NextResponse.json({
            succes : false,
            error : validationCheck.error.flatten()
        },{status : 400})
    }
    const userExistIndex = dummyUsers.findIndex((user)=>user.email === body.email);
    if(userExistIndex === -1){
        return NextResponse.json({
            success : false,
            message : `Invalid email : ${body.email} , Try Signing In`
        },{status : 404});
    }
    const passwordValidation = dummyUsers[userExistIndex].password === body.password;
    if(!passwordValidation){
        return NextResponse.json({
            success : false,
            message : "Invalid Password."
        },{status : 401})



    }
    const response =  NextResponse.json({
        success : true,
        userData : dummyUsers[userExistIndex]
    })
    response.cookies.set("token",jwtGenerator(body.email),{
        httpOnly : true,
        secure : true,
        sameSite: "strict",
        path : "/"
    });

    return response;
}

