import { z } from "zod";
const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters"),
  tags: z.string(),
});

export function CreateBlogFromCLient() {
  return (
    <div>
      <h1>CreateBlogFromCLient</h1>
    </div>
  );
}
