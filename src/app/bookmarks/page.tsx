"use client";

import { useBookmarks } from '@/hooks/useBookmarks';
import { EmployeeCard } from '@/components/EmployeeCard';
import { Button } from '@/components/ui/button';
import { BookmarkX, Users, Briefcase, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function BookmarksPage() {
  const { bookmarkedUsers, isLoading, removeBookmark } = useBookmarks();
  const { toast } = useToast();

  const handlePromote = (employeeName: string) => {
    toast({
      title: "Action: Promote",
      description: `Promote action triggered for ${employeeName}. (This is a placeholder action)`,
    });
  };

  const handleAssignToProject = (employeeName: string) => {
     toast({
      title: "Action: Assign to Project",
      description: `Assign to Project action triggered for ${employeeName}. (This is a placeholder action)`,
    });
  };


  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="p-4 border rounded-lg shadow bg-card animate-pulse h-[380px]">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted" />
              <div className="w-3/4 h-6 mx-auto mb-2 bg-muted" />
              <div className="w-1/2 h-4 mx-auto mb-4 bg-muted" />
              <div className="w-full h-10 bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (bookmarkedUsers.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg border-muted-foreground/30 min-h-[400px]">
          <Users className="w-16 h-16 text-muted-foreground/50" />
          <h3 className="mt-4 text-xl font-semibold">No Bookmarked Employees</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You haven't bookmarked any employees yet. Visit the employee directory to add some.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
      <Alert>
        <Zap className="w-4 h-4" />
        <AlertTitle>Manage Your Key Talent</AlertTitle>
        <AlertDescription>
          From here, you can quickly access profiles of your bookmarked employees and initiate actions like "Promote" or "Assign to Project".
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bookmarkedUsers.map(employee => (
          <div key={employee.id} className="relative group">
            <EmployeeCard employee={employee} />
            <div className="absolute bottom-0 left-0 right-0 p-2 space-y-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="flex gap-2 p-2 rounded-md bg-card/90 backdrop-blur-sm">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handlePromote(`${employee.firstName} ${employee.lastName}`)}
                >
                  <Briefcase className="w-3.5 h-3.5 mr-1.5" /> Promote
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleAssignToProject(`${employee.firstName} ${employee.lastName}`)}
                >
                  <Users className="w-3.5 h-3.5 mr-1.5" /> Assign
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
