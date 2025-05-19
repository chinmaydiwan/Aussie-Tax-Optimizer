
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("app-container", className)}>
      {children}
    </div>
  );
};

export default PageLayout;
