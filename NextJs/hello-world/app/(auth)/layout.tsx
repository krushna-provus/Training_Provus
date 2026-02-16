"use client"

import "./../globals.css"
import Link from "next/link"
import { usePathname } from "next/navigation"

// export const metadata = {
//     title : "My App",
//     description : "Manually Generated"
// }

const navMap : {name : string, href : string}[] =[
    {name : "Login" , href : "/login"},
    {name : "Register" , href : "/register"},
    {name : "Forgot Password" , href : "/forgotPassword"},
]

export default function AuthLayout({
    children,
}:{
    children : React.ReactNode
}){
    const pathName = usePathname();
    return <html lang="en">
        <body>
            {navMap.map((link)=>{
                const isActive = pathName === link.href || pathName.startsWith(link.href) && pathName !== "/";
                return <Link 
                
                    className={isActive ? "text-3xl text-red":"text-xl text-blue"}
                href={link.href} key={link.name}>{link.name}</Link>
            })}
            {children}
        </body>
    </html>
}