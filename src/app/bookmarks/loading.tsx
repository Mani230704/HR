import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function BookmarksLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="w-1/2 h-10 md:w-1/3" /> {/* Title skeleton */}
      <Skeleton className="w-full h-20" /> {/* Alert skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
           <Card key={i} className="h-[380px]">
              <CardHeader className="relative p-0 h-32 bg-muted animate-pulse" />
              <CardContent className="flex flex-col items-center pt-12 space-y-2">
                <Skeleton className="w-24 h-24 rounded-full -mt-16 border-4 border-card" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-1/3 h-5 mt-1" />
              </CardContent>
              <CardFooter className="p-4 border-t">
                 <Skeleton className="w-full h-10" />
              </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
