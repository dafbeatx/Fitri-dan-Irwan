import { Suspense } from "react";
import { WeddingClientPage } from "@/components/WeddingClientPage";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#C3A16A] border-t-transparent animate-spin" />
        </div>
      }
    >
      <WeddingClientPage />
    </Suspense>
  );
}
