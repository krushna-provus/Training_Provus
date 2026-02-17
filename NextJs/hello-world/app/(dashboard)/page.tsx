import Link from "next/link"

export default function Home(){
    return <>
        <h1>Home Page</h1>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/blog"}>Blog</Link>
        <Link href={"/articles/breaking-news-123?lang=en"}>Articles</Link>
    </>
}