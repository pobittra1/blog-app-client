import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPost();
  return data?.data?.map((blog: BlogPost) => ({ id: blog.id })).splice(0, 3);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: blog } = await blogService.getBLogByid(id);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(formattedDate);

  // Estimate reading time (average 200 words per minute)
  const wordCount = blog.content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground transition hover:text-foreground"
        >
          ← Back to Blogs
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Category + Date + Reading Time */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
              {blog.category}
            </span>

            <span>•</span>

            <span>{formattedDate}</span>

            <span>•</span>

            <span>{readingTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {blog.title}
          </h1>

          {/* Description */}
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {blog.description}
          </p>

          {/* Author */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {blog.author?.name?.slice(0, 2).toUpperCase() ?? "AU"}
            </div>

            <div>
              <p className="text-sm font-medium">
                {blog.author?.name ?? "Unknown Author"}
              </p>

              <p className="text-xs text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="mb-10 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {blog.content}
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2 border-t pt-6">
          {blog.tags?.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* ID */}
        <p className="mt-8 text-xs text-muted-foreground">Blog ID: {id}</p>
      </article>
    </main>
  );
}
