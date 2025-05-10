import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
      <SignIn />
    </main>
  );
}
