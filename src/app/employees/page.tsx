
// src/app/employees/page.tsx
"use client"; // For form interactions and client-side state

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEmployees, getAllDepartments } from '@/lib/api';
import type { User } from '@/lib/types';
import { EmployeeCard } from '@/components/EmployeeCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, XCircle, Users } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allFetchedEmployees, setAllFetchedEmployees] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const itemsPerPage = 12;


  const { data: departments, isLoading: isLoadingDepartments } = useQuery<string[]>({
    queryKey: ['departments'],
    queryFn: getAllDepartments,
  });

  const { data, isLoading, isFetching, error } = useQuery<{ users: User[]; total: number; hasMore: boolean; } | undefined>({
    queryKey: ['employees', debouncedSearchTerm, departmentFilter, currentPage],
    queryFn: async () => {
        return getEmployees(itemsPerPage, currentPage * itemsPerPage, debouncedSearchTerm, departmentFilter && !debouncedSearchTerm ? departmentFilter : undefined);
    },
    enabled: !!departments, 
    keepPreviousData: true, 
  });

  useEffect(() => {
    if (data?.users) {
      if (currentPage === 0 || debouncedSearchTerm || departmentFilter) { 
        setAllFetchedEmployees(data.users);
      } else { 
        setAllFetchedEmployees(prev => {
          // Avoid duplicates when loading more
          const newUsers = data.users.filter(newUser => !prev.some(existingUser => existingUser.id === newUser.id));
          return [...prev, ...newUsers];
        });
      }
      setHasMore(data.hasMore);
    }
  }, [data, currentPage, debouncedSearchTerm, departmentFilter]);

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  useEffect(() => {
    setCurrentPage(0);
    setAllFetchedEmployees([]);
  }, [debouncedSearchTerm, departmentFilter]);


  const filteredEmployees = useMemo(() => {
    let employeesToDisplay = allFetchedEmployees;
    if (departmentFilter && debouncedSearchTerm) { 
        employeesToDisplay = employeesToDisplay.filter(emp => emp.company.department.toLowerCase() === departmentFilter.toLowerCase());
    }
    return employeesToDisplay;
  }, [allFetchedEmployees, departmentFilter, debouncedSearchTerm]);


  if (error) return <p className="text-destructive">Error loading employees: {(error as Error).message}</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employee Directory</h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={(value) => setDepartmentFilter(value === 'all' ? '' : value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {isLoadingDepartments ? (
                <SelectItem value="loading" disabled>Loading...</SelectItem>
              ) : (
                departments?.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {(searchTerm || departmentFilter) && (
             <Button variant="ghost" size="icon" onClick={() => { setSearchTerm(''); setDepartmentFilter(''); }}>
                <XCircle className="w-5 h-5 text-muted-foreground" />
             </Button>
          )}
        </div>
      </div>

      {(isLoading || isFetching) && currentPage === 0 && filteredEmployees.length === 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(itemsPerPage)].map((_, i) => (
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
      ) : filteredEmployees.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg border-muted-foreground/30 min-h-[400px]">
            <Users className="w-16 h-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold">No Employees Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEmployees.map(employee => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button onClick={handleLoadMore} disabled={isFetching}>
                {isFetching ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
           {isFetching && currentPage > 0 && (
             <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => ( // Show a few skeleton loaders when loading more
                 <Card key={`load-more-skeleton-${i}`} className="h-[380px]">
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
          )}
        </>
      )}
    </div>
  );
}
