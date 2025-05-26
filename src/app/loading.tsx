
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl space-y-8">
        <Skeleton className="w-1/2 h-12 mx-auto" />
        <div className="space-y-4">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-3/4 h-24" />
        </div>
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg shadow bg-card">
              <Skeleton className="w-24 h-24 mx-auto mb-4 rounded-full" />
              <Skeleton className="w-3/4 h-6 mx-auto mb-2" />
              <Skeleton className="w-1/2 h-4 mx-auto mb-4" />
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
