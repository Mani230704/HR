
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function EmployeeDetailLoading() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <Skeleton className="w-full h-48" /> {/* Banner */}
        <div className="relative">
            <div className="absolute flex items-end p-6 transform -translate-x-1/2 bottom-[-48px] left-1/2 sm:left-auto sm:translate-x-0 sm:bottom-6 sm:left-6">
                <Skeleton className="w-32 h-32 rounded-full border-4 border-background" />
                <div className="ml-6">
                    <Skeleton className="w-48 h-8 mb-2" />
                    <Skeleton className="w-32 h-6" />
                </div>
            </div>
        </div>
        <div className="pt-20 pb-6 px-6 sm:pt-8">
            <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="w-24 h-6" />
                <Skeleton className="w-32 h-6" />
            </div>
        </div>
      </Card>

      <div className="w-full">
        <div className="flex w-full h-10 mb-6 bg-muted rounded-md">
            <Skeleton className="flex-1 h-full rounded-l-md" />
            <Skeleton className="flex-1 h-full" />
            <Skeleton className="flex-1 h-full rounded-r-md" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-3/4 h-5 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="w-1/3 h-6" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-3/4 h-5" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-1/3 h-6" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-3/4 h-5" />
              </div>
            </div>
            <Skeleton className="w-full pt-4 mt-4 border-t h-24" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
