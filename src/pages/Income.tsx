
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import Navigation from '../components/layout/Navigation';
import IncomeDetailsForm from '../components/forms/IncomeDetailsForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const Income = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Income & Superannuation"
        description="Enter your income sources and superannuation details"
      />
      
      <Navigation />
      
      <div className="mt-6 space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Enter all income sources and consider superannuation options to potentially reduce your taxable income.
          </AlertDescription>
        </Alert>
        
        <IncomeDetailsForm />
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Superannuation strategy:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Salary sacrificing to superannuation can reduce your taxable income.</li>
            <li>Concessional contributions (like salary sacrifice) are taxed at 15% in your super fund, which may be lower than your marginal tax rate.</li>
            <li>There are annual caps on how much you can contribute to super with tax concessions.</li>
            <li>For the 2023-24 financial year, the concessional contributions cap is $27,500.</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default Income;
