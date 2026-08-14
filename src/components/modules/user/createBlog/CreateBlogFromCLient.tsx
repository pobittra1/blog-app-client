import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
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
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    validators: {
      onSubmit: blogSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");

      const blogData = {
        ...value,
        tags: value.tags
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };

      console.log(blogData);

      try {
        // post logic

        toast.success("Post Created", { id: toastId });
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <div>
      <h1>CreateBlogFromCLient</h1>
    </div>
  );
}
