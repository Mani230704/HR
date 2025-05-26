
"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { User } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/UserAvatar';
import { Mail, Phone, Briefcase, MapPin, Bookmark as BookmarkIcon, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';

interface EmployeeCardProps {
  employee: User;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { toast } = useToast();
  const bookmarked = isBookmarked(employee.id);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if card is wrapped in Link
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(employee.id);
      toast({ title: "Bookmark Removed", description: `${employee.firstName} ${employee.lastName} removed from bookmarks.` });
    } else {
      addBookmark(employee);
      toast({ title: "Bookmarked", description: `${employee.firstName} ${employee.lastName} added to bookmarks.` });
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
      <CardHeader className="relative p-0">
        <div className="w-full h-32 bg-gradient-to-br from-primary to-accent" />
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <UserAvatar 
            src={employee.image} 
            alt={`${employee.firstName} ${employee.lastName}`}
            fallbackInitials={`${employee.firstName[0]}${employee.lastName[0]}`}
            size="lg"
            className="border-4 border-card"
          />
        </div>
         <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmarkToggle}
            className="absolute top-2 right-2 bg-card/50 hover:bg-card text-foreground"
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {bookmarked ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <BookmarkIcon className="w-5 h-5" />}
          </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center flex-grow pt-12 text-center">
        <CardTitle className="text-xl">
          <Link href={`/employees/${employee.id}`} className="hover:text-primary transition-colors">
            {employee.firstName} {employee.lastName}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{employee.company.title}</p>
        <Badge variant="secondary" className="mt-2">{employee.company.department}</Badge>
        
        <div className="mt-4 space-y-1 text-xs text-muted-foreground text-left w-full px-2">
          <p className="flex items-center gap-2 truncate">
            <Mail className="w-3 h-3 shrink-0" /> 
            <a href={`mailto:${employee.email}`} className="hover:text-primary truncate">{employee.email}</a>
          </p>
          <p className="flex items-center gap-2 truncate">
            <Phone className="w-3 h-3 shrink-0" /> 
            <a href={`tel:${employee.phone}`} className="hover:text-primary truncate">{employee.phone}</a>
          </p>
          <p className="flex items-center gap-2 truncate">
            <Briefcase className="w-3 h-3 shrink-0" /> {employee.company.name}
          </p>
           <p className="flex items-center gap-2 truncate">
            <MapPin className="w-3 h-3 shrink-0" /> {employee.company.address.city}, {employee.company.address.state}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/employees/${employee.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
