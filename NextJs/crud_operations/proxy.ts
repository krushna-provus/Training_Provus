import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from "jose";


export default async function authProxy(request : NextRequest){

  const token = request.cookies.get("token")?.value;
    
  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }
    try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECERET_STRING
    );

    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
