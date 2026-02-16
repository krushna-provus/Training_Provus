import "./../globals.css"

export const metadata = {
    title : "My App",
    description : "Manually Generated"
}

export default function RootLayout({
    children,
}:{
    children : React.ReactNode
}){
    return <html lang="en">
        <body>
            <header
            className="bg-red-500"
            >
                <h1>Header</h1>
            </header>
            {children}
        </body>
    </html>
}