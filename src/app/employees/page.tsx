
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
import { Search, XCircle } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce'; // Assuming a useDebounce hook exists or will be created

// A simple debounce hook (can be moved to hooks/useDebounce.ts)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}


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

  const { data, isLoading, isFetching, error, fetchNextPage } = useQuery<{ users: User[]; total: number; hasMore: boolean; } | undefined>({
    queryKey: ['employees', debouncedSearchTerm, departmentFilter, currentPage],
    queryFn: async () => {
        // If departmentFilter is active and no searchTerm, dummyjson doesn't support this directly.
        // We'll fetch all for that page and filter client-side, or tell API to handle it if possible.
        // For dummyjson, we fetch broadly then filter.
        // The API layer needs to be smart about this or we handle it here.
        // getEmployees signature updated to accept limit, skip, searchTerm, departmentFilter
        return getEmployees(itemsPerPage, currentPage * itemsPerPage, debouncedSearchTerm, departmentFilter && !debouncedSearchTerm ? departmentFilter : undefined);
    },
    enabled: !!departments, // Only fetch employees after departments are loaded (or remove if not strictly needed)
    keepPreviousData: true, // Keep previous data while new data is fetching for pagination
  });

  useEffect(() => {
    if (data?.users) {
      if (currentPage === 0 || debouncedSearchTerm || departmentFilter) { // Reset on search/filter or first page
        setAllFetchedEmployees(data.users);
      } else { // Append for pagination
        setAllFetchedEmployees(prev => [...prev, ...data.users]);
      }
      setHasMore(data.hasMore);
    }
  }, [data, currentPage, debouncedSearchTerm, departmentFilter]);

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  // Reset page and employees when search/filter changes
  useEffect(() => {
    setCurrentPage(0);
    setAllFetchedEmployees([]);
  }, [debouncedSearchTerm, departmentFilter]);


  const filteredEmployees = useMemo(() => {
    let employeesToDisplay = allFetchedEmployees;
    // Client-side filtering if dummyjson search doesn't fully support it or for refinement
    if (departmentFilter && debouncedSearchTerm) { 
        // If searching and filtering, dummyjson search is broad. Filter again on client.
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

      {isLoading && currentPage === 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(itemsPerPage)].map((_, i) => (
            <Card key={i} className="h-[380px]"> {/* Approximate height of EmployeeCard */}
              <CardHeader className="relative p-0 h-32 bg-muted" />
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
         <div className="py-12 text-center">
            <Users className="w-16 h-16 mx-auto text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold">No Employees Found</h3>
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
        </>
      )}
    </div>
  );
}

