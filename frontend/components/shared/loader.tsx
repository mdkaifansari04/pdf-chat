import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

export function PageLoader() {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <LoaderCircleIcon className="animate-spin" />
    </main>
  );
}

export function Loader({ className }: { className?: string }) {
  return <LoaderCircleIcon className={cn("animate-spin", className)} />;
}
