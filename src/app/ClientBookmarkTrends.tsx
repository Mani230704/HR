"use client";

import { useEffect, useState } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import type { User, DepartmentBookmarkSummary } from '@/lib/types';
import { BookmarkTrendsChart } from '@/components/charts/BookmarkTrendsChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ClientBookmarkTrendsProps {
  allEmployees: User[];
}

export function ClientBookmarkTrends({ allEmployees }: ClientBookmarkTrendsProps) {
  const { bookmarkedUsers, isLoading: isLoadingBookmarks } = useBookmarks();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoadingBookmarks) {
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
