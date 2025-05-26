"use client"

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/types';

const BOOKMARKS_STORAGE_KEY = 'performpulse-bookmarks';

export function useBookmarks() {
  const [bookmarkedUsers, setBookmarkedUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
        if (storedBookmarks) {
          setBookmarkedUsers(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error("Failed to load bookmarks from localStorage", error);
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedUsers));
      } catch (error) {
        console.error("Failed to save bookmarks to localStorage", error);
      }
    }
  }, [bookmarkedUsers, isLoaded]);

  const addBookmark = useCallback((user: User) => {
    setBookmarkedUsers((prev) => {
      if (prev.find(u => u.id === user.id)) return prev; // Already bookmarked
      return [...prev, user];
    });
  }, []);

  const removeBookmark = useCallback((userId: number) => {
    setBookmarkedUsers((prev) => prev.filter(u => u.id !== userId));
  }, []);

  const isBookmarked = useCallback((userId: number): boolean => {
    return !!bookmarkedUsers.find(u => u.id === userId);
  }, [bookmarkedUsers]);

  return { bookmarkedUsers, addBookmark, removeBookmark, isBookmarked, isLoading: !isLoaded };
}
