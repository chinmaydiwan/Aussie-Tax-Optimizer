
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTaxData } from '@/contexts/TaxDataContext';
import { Calculator } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  showActions?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description,
  showActions = true
}) => {
  const { saveData, loadData, resetData } = useTaxData();

  return (
    <div className="pb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <Calculator className="h-8 w-8 text-primary mr-2" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => loadData()}
            >
              Load Data
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => saveData()}
            >
              Save Data
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => resetData()}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
      <Separator className="mt-4" />
    </div>
  );
};

export default PageHeader;
