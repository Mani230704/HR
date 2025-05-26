
import type { User, UsersApiResponse } from './types';
const API_BASE_URL = 'https://dummyjson.com';

// Helper to generate mock data
const generateMockData = (user: any): Partial<User> => ({
  performanceRating: parseFloat((Math.random() * 4 + 1).toFixed(1)), // Rating 1-5
  feedback: user.feedback || "This employee demonstrates strong potential and consistently meets expectations. Key strengths include problem-solving and teamwork. Areas for development involve taking more initiative in leadership roles. Overall a valuable member of the team."
});


export async function getEmployees(
  limit: number = 30, 
  skip: number = 0,
  searchTerm?: string, 
  departmentFilter?: string
): Promise<{ users: User[]; total: number; hasMore: boolean }> {
  let url = `${API_BASE_URL}/users`;
  const queryParams = new URLSearchParams();
  queryParams.set('limit', String(limit));
  queryParams.set('skip', String(skip));

  if (searchTerm) {
    url = `${API_BASE_URL}/users/search`;
    queryParams.set('q', searchTerm);
  }
  
  const response = await fetch(`${url}?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  const data: UsersApiResponse = await response.json();
  
  let processedUsers = data.users.map(u => ({ ...u, ...generateMockData(u) } as User));

  if (departmentFilter && !searchTerm) { // Apply department filter if not a search query (dummyjson search is broad)
    processedUsers = processedUsers.filter(user => user.company.department.toLowerCase() === departmentFilter.toLowerCase());
  }
  
  return {
    users: processedUsers,
    total: data.total,
    hasMore: (skip + processedUsers.length) < data.total,
  };
}

export async function getEmployeeById(id: string): Promise<User | null> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch employee with id ${id}`);
  }
  const user: any = await response.json();
  return { ...user, ...generateMockData(user) } as User;
}

export async function getAllDepartments(): Promise<string[]> {
  try {
    // Fetching all users to derive departments. For dummyjson, limit=0 returns all (up to its max, typically 100).
    const response = await fetch(`${API_BASE_URL}/users?limit=0&select=company`);
    if (!response.ok) {
      console.error('Failed to fetch users for departments, using fallback.');
      return ["Sales", "Marketing", "Engineering", "Human Resources", "Support", "Services", "Product Management", "Business Development", "Legal", "Accounting"]; // Fallback
    }
    const data: UsersApiResponse = await response.json();
    const departments = new Set(data.users.map(user => user.company.department));
    if (departments.size === 0) { // If API returned no departments
        return ["Sales", "Marketing", "Engineering", "Human Resources", "Support", "Services", "Product Management", "Business Development", "Legal", "Accounting"]; // Fallback
    }
    return Array.from(departments).sort();
  } catch (error) {
    console.error('Error fetching departments, using fallback:', error);
    return ["Sales", "Marketing", "Engineering", "Human Resources", "Support", "Services", "Product Management", "Business Development", "Legal", "Accounting"]; // Fallback
  }
}
