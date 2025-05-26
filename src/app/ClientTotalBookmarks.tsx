
"use client";

import { useEffect, useState } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';

export function ClientTotalBookmarks() {
  const { bookmarkedUsers, isLoading } = useBookmarks();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient || isLoading) return <span className="text-2xl font-bold">...</span>;
  return <span className="text-2xl font-bold">{bookmarkedUsers.length}</span>;
}
