
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import Navigation from '../components/layout/Navigation';
import DeductionDetailsForm from '../components/forms/DeductionDetailsForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const Deductions = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Tax Deductions"
        description="Enter your eligible tax deductions"
      />
      
      <Navigation />
      
      <div className="mt-6 space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Claiming all eligible deductions can significantly reduce your taxable income and increase your refund.
          </AlertDescription>
        </Alert>
        
        <DeductionDetailsForm />
        
        <div className="text-sm text-muted-foreground space-y-4">
          <div>
            <p className="font-medium">Common Work-Related Expenses:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vehicle and travel expenses directly related to work</li>
              <li>Clothing, laundry, and dry-cleaning expenses (work uniforms, etc.)</li>
              <li>Home office expenses (utilities, internet, phone, equipment)</li>
              <li>Self-education expenses related to your current employment</li>
              <li>Tools, equipment, and other assets required for work</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">Record Keeping:</p>
            <p>Remember to keep receipts and documentation for all claimed deductions. The ATO requires you to keep records for 5 years from the date you lodge your tax return.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Deductions;
