// src/app/page.tsx (Dashboard)
import { getEmployees, getAllDepartments } from '@/lib/api';
import type { User, DepartmentPerformance } from '@/lib/types';
import { DepartmentPerformanceChart } from '@/components/charts/DepartmentPerformanceChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Star, Bookmark } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';

import { ClientBookmarkTrends } from './ClientBookmarkTrends';
import { ClientTotalBookmarks } from './ClientTotalBookmarks';


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


  // For bookmark trends, client-side data is handled by ClientBookmarkTrends component.
  return { allEmployees, departmentPerformance };
}


export default async function DashboardPage() {
  const { allEmployees, departmentPerformance } = await getDashboardData();
  
  const totalEmployees = allEmployees.length;
  const averageCompanyRating = totalEmployees > 0 
    ? parseFloat((allEmployees.reduce((sum, emp) => sum + (emp.performanceRating || 0), 0) / totalEmployees).toFixed(1))
    : 0;

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
