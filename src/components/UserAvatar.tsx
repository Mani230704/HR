
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  fallbackInitials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({ src, alt = "User Avatar", fallbackInitials, size = 'md', className }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  const fallbackTextSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  }

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      {src ? (
        <AvatarImage src={src} alt={alt} data-ai-hint="person portrait" />
      ) : null}
      <AvatarFallback className={`${fallbackTextSize[size]}`}>
        {fallbackInitials ? (
          fallbackInitials
        ) : (
          <UserIcon className={`${sizeClasses[size] / 2}`} />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
