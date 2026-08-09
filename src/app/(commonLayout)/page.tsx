import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  console.log(cookieStore.toString());
  const res = await fetch("http://localhost:3000/api/auth/get-session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const session = await res.json();
  console.log(session);
  return (
    <div>
      <Button variant={"outline"}>Click Here</Button>
      <h1>Home</h1>
    </div>
  );
}
