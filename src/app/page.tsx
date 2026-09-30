import { Suspense } from "react";
import { WeddingClientPage } from "@/components/WeddingClientPage";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory-50 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
        </div>
      }
    >
      <WeddingClientPage />
    </Suspense>
  );
}
