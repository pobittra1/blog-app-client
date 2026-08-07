import { Navbar } from "@/components/layout/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar></Navbar>
      <h1>CommonLayout Page</h1>
      {children}
    </div>
  );
}
