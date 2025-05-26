export interface UserAddress {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

export interface UserCompany {
  address: UserAddress;
  department: string;
  name: string;
  title: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  company: UserCompany;
  // Added for application specific features
  performanceRating: number; // Range 1-5
  feedback?: string; // Employee feedback text for AI
  [key: string]: any; // Allow other properties from dummyjson
}

export interface UsersApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface DepartmentPerformance {
  department: string;
  averageRating: number;
}

export interface DepartmentBookmarkSummary {
  department: string;
  bookmarkCount: number;
}
