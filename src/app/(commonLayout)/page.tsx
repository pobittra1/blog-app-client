import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  console.log(cookieStore.get("better-auth.session_token"));
  const res = await fetch("http://localhost:4000/api/auth/get-session");
  console.log(res.json());
  return (
    <div>
      <Button variant={"outline"}>Click Here</Button>
      <h1>Home</h1>
    </div>
  );
}
