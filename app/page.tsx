import BlogFooter from "@/components/blog/BlogFooter";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogHero from "@/components/blog/BlogHero";
import NewsletterSection from "@/components/blog/NewsletterSection";
import PublicFeed from "@/components/blog/PublicFeed";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <main>
        <BlogHero />

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <PublicFeed />
        </section>

        <NewsletterSection />
      </main>

      <BlogFooter />
    </div>
  );
}
