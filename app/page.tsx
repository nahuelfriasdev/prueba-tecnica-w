import BlogFooter from "@/components/blog/BlogFooter";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogHero from "@/components/blog/BlogHero";
import NewsletterSection from "@/components/blog/NewsletterSection";
import PublicFeed from "@/components/blog/PublicFeed";
import clientPromise from "@/lib/mongodb";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("wortise");

  const articles = await db
    .collection("articles")
    .find({})
    .sort({ createdAt: -1 })
    .limit(15)
    .toArray();

  const initialArticles = {
    articles: JSON.parse(JSON.stringify(articles)),
  };

  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main>
        <BlogHero />

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <Suspense fallback={<div>Loading...</div>}>
            <PublicFeed initialData={initialArticles} />
          </Suspense>
        </section>

        <NewsletterSection />
      </main>

      <BlogFooter />
    </div>
  );
}
