
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  User, 
  DollarSign, 
  FileText,
  ChartBar
} from 'lucide-react';

const Navigation: React.FC = () => {
  // Get the current path to highlight active link
  const currentPath = window.location.pathname;
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Calculator className="mr-2 h-4 w-4" /> },
    { name: 'Personal Details', path: '/personal', icon: <User className="mr-2 h-4 w-4" /> },
    { name: 'Income & Super', path: '/income', icon: <DollarSign className="mr-2 h-4 w-4" /> },
    { name: 'Deductions', path: '/deductions', icon: <FileText className="mr-2 h-4 w-4" /> },
    { name: 'Results', path: '/results', icon: <ChartBar className="mr-2 h-4 w-4" /> },
  ];
  
  return (
    <nav className="py-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={currentPath === item.path ? "default" : "outline"}
            asChild
            className={cn(
              "transition-all",
              currentPath === item.path && "bg-primary text-primary-foreground"
            )}
          >
            <Link to={item.path}>
              {item.icon}
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
