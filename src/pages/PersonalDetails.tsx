
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import Navigation from '../components/layout/Navigation';
import PersonalDetailsForm from '../components/forms/PersonalDetailsForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const PersonalDetails = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Personal Details"
        description="Enter your personal and family information"
      />
      
      <Navigation />
      
      <div className="mt-6 space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Your personal details help determine your tax liability, eligible offsets, and family benefits.
          </AlertDescription>
        </Alert>
        
        <PersonalDetailsForm />
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Why these details matter:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Residency status affects your tax rates and tax-free threshold eligibility.</li>
            <li>Age may qualify you for age-related tax offsets.</li>
            <li>Having dependent children may qualify you for family tax benefits.</li>
            <li>Your marital status and partner's income can affect various offsets and benefits.</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default PersonalDetails;
