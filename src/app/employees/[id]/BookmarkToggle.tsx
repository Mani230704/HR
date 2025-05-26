
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { User } from "@/lib/types";
import { Bookmark as BookmarkIcon, BookmarkCheck } from 'lucide-react';

interface BookmarkToggleProps {
  employee: User;
}

export function BookmarkToggle({ employee }: BookmarkToggleProps) {
  const { addBookmark, removeBookmark, isBookmarked, isLoading } = useBookmarks();
  const { toast } = useToast();
  const bookmarked = isBookmarked(employee.id);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(employee.id);
      toast({ title: "Bookmark Removed", description: `${employee.firstName} ${employee.lastName} removed from bookmarks.` });
    } else {
      addBookmark(employee);
      toast({ title: "Bookmarked", description: `${employee.firstName} ${employee.lastName} added to bookmarks.` });
    }
  };

  if (isLoading) {
    return <Button variant="outline" size="icon" className="bg-background/70 hover:bg-background" disabled><BookmarkIcon className="w-5 h-5" /></Button>;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleBookmarkToggle}
      className="bg-background/70 hover:bg-background"
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {bookmarked ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <BookmarkIcon className="w-5 h-5" />}
    </Button>
  );
}
