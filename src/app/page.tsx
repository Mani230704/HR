
// src/app/page.tsx (Dashboard)
import { getEmployees, getAllDepartments } from '@/lib/api';
import type { User, DepartmentPerformance, DepartmentBookmarkSummary } from '@/lib/types';
import { DepartmentPerformanceChart } from '@/components/charts/DepartmentPerformanceChart';
import { BookmarkTrendsChart } from '@/components/charts/BookmarkTrendsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Star, Bookmark } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import { useBookmarks } from '@/hooks/useBookmarks'; // Added import


// This function would typically fetch bookmarks from a database in a real app.
// For this client-side bookmark example, we can't directly get bookmarks on the server for initial render.
// So, BookmarkTrendsChart will be client-side and use the useBookmarks hook.
// Or, we pass all employees and let the client component do the aggregation.
// For now, the server will prepare employee data, and client component will calculate bookmark stats.

async function getDashboardData() {
  noStore(); // Ensure dynamic rendering as data can change
  const { users: allEmployees } = await getEmployees(100, 0); // Fetch up to 100 users for aggregation
  const departments = await getAllDepartments();

  const departmentPerformance: DepartmentPerformance[] = departments.map(dept => {
    const deptEmployees = allEmployees.filter(emp => emp.company.department === dept);
    const totalRating = deptEmployees.reduce((sum, emp) => sum + (emp.performanceRating || 0), 0);
    const averageRating = deptEmployees.length > 0 ? parseFloat((totalRating / deptEmployees.length).toFixed(1)) : 0;
    return { department: dept, averageRating };
  }).filter(d => d.averageRating > 0); // Only show departments with data


  // For bookmark trends, we need client-side data.
  // This server component will pass all employees to a client component that then uses the useBookmarks hook.
  return { allEmployees, departmentPerformance };
}

// Client component to handle bookmark calculations
function ClientBookmarkTrends({ allEmployees }: { allEmployees: User[] }) {
  "use client";
  const { bookmarkedUsers, isLoading } = useBookmarks(); // hook for client-side bookmarks

  if (isLoading) {
    return (
        <Card>
            <CardHeader><CardTitle>Bookmark Trends</CardTitle></CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center"><p>Loading bookmark data...</p></CardContent>
        </Card>
    );
  }

  const departments = Array.from(new Set(allEmployees.map(emp => emp.company.department))).sort();
  const departmentBookmarkSummary: DepartmentBookmarkSummary[] = departments.map(dept => {
    const bookmarkedInDept = bookmarkedUsers.filter(bu => 
      allEmployees.find(emp => emp.id === bu.id && emp.company.department === dept)
    ).length;
    return { department: dept, bookmarkCount: bookmarkedInDept };
  }).filter(d => d.bookmarkCount > 0);

  return <BookmarkTrendsChart data={departmentBookmarkSummary} />;
}


export default async function DashboardPage() {
  const { allEmployees, departmentPerformance } = await getDashboardData();
  
  const totalEmployees = allEmployees.length;
  const averageCompanyRating = totalEmployees > 0 
    ? parseFloat((allEmployees.reduce((sum, emp) => sum + (emp.performanceRating || 0), 0) / totalEmployees).toFixed(1))
    : 0;

  // For total bookmarks, we need a client component
  function ClientTotalBookmarks() {
    "use client";
    const { bookmarkedUsers, isLoading } = useBookmarks();
    if (isLoading) return <span className="text-2xl font-bold">...</span>;
    return <span className="text-2xl font-bold">{bookmarkedUsers.length}</span>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Currently in the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Avg. Company Rating</CardTitle>
            <Star className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCompanyRating}/5</div>
            <p className="text-xs text-muted-foreground">Overall employee performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Bookmarks</CardTitle>
            <Bookmark className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ClientTotalBookmarks />
            <p className="text-xs text-muted-foreground">Employees you are tracking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <DepartmentPerformanceChart data={departmentPerformance} />
        <ClientBookmarkTrends allEmployees={allEmployees} />
      </div>
    </div>
  );
}
