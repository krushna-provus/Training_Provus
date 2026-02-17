import Link from "next/link";


export default async function NewsArticle(
    {params,searchParams} : {params : Promise<{articleId : string}>; searchParams : Promise<{lang ?: "en" | "es" | "fr"}>}
){
    const {articleId} = await params;
    const {lang} = await searchParams;

    return <>
        <div>Reading Article {articleId} in Language {lang}</div>

        <Link href={"/articles/breaking-news-123?lang=en"}>English</Link>
        <Link href={"/articles/breaking-news-123?lang=es"}>Spansih</Link>
        <Link href={"/articles/breaking-news-123?lang=fr"}>French</Link>

    </>
}

