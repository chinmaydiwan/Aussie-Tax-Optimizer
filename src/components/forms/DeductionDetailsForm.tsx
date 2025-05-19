
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTaxData } from '@/contexts/TaxDataContext';

const DeductionDetailsForm: React.FC = () => {
  const { taxData, updateDeductionDetails } = useTaxData();
  const { deductionDetails } = taxData;

  const handleNumberInputChange = (field: keyof typeof deductionDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateDeductionDetails({ [field]: value });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="workRelatedExpenses">Work-Related Expenses ($)</Label>
            <Input
              id="workRelatedExpenses"
              type="number"
              min="0"
              value={deductionDetails.workRelatedExpenses}
              onChange={handleNumberInputChange('workRelatedExpenses')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="homeOfficeExpenses">Home Office Expenses ($)</Label>
            <Input
              id="homeOfficeExpenses"
              type="number"
              min="0"
              value={deductionDetails.homeOfficeExpenses}
              onChange={handleNumberInputChange('homeOfficeExpenses')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="professionalDevelopment">Professional Development ($)</Label>
            <Input
              id="professionalDevelopment"
              type="number"
              min="0"
              value={deductionDetails.professionalDevelopment}
              onChange={handleNumberInputChange('professionalDevelopment')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="carAndTravel">Car and Travel Expenses ($)</Label>
            <Input
              id="carAndTravel"
              type="number"
              min="0"
              value={deductionDetails.carAndTravel}
              onChange={handleNumberInputChange('carAndTravel')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxAgentFees">Tax Agent Fees ($)</Label>
            <Input
              id="taxAgentFees"
              type="number"
              min="0"
              value={deductionDetails.taxAgentFees}
              onChange={handleNumberInputChange('taxAgentFees')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donations">Charitable Donations ($)</Label>
            <Input
              id="donations"
              type="number"
              min="0"
              value={deductionDetails.donations}
              onChange={handleNumberInputChange('donations')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="selfEducation">Self-Education Expenses ($)</Label>
            <Input
              id="selfEducation"
              type="number"
              min="0"
              value={deductionDetails.selfEducation}
              onChange={handleNumberInputChange('selfEducation')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentDeductions">Investment-Related Deductions ($)</Label>
            <Input
              id="investmentDeductions"
              type="number"
              min="0"
              value={deductionDetails.investmentDeductions}
              onChange={handleNumberInputChange('investmentDeductions')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeductionDetailsForm;
