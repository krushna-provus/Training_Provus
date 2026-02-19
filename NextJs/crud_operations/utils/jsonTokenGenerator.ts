import jwt from "jsonwebtoken";

export default function jwtGenerator(email : string){
    const token = jwt.sign(
        {email},
        process.env.JWT_SECERET_STRING!,
        {expiresIn : "10m"}
    );
    return token;
}