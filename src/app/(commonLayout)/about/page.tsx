export const dynamic = "force-dynamic";

export default async function AboutPage() {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // For simulating error
  // throw new Error("Smoething went wrong!");
  return (
    <div>
      <h1>this is about page component</h1>
    </div>
  );
}
