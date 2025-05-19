
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTaxData } from '@/contexts/TaxDataContext';
import { TaxYear } from '@/types/tax-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const IncomeDetailsForm: React.FC = () => {
  const { taxData, updateIncomeDetails, updateSelectedYear, updateSalaryPackaging } = useTaxData();
  const { incomeDetails, salaryPackaging, selectedYear } = taxData;

  const handleNumberInputChange = (field: keyof typeof incomeDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateIncomeDetails({ [field]: value });

    // Auto-calculate employer super at 10.5% of salary if it's the salary field
    if (field === 'salary') {
      updateIncomeDetails({ employerSuper: value * 0.105 });
    }
  };

  const handleSalaryPackagingChange = (field: keyof typeof salaryPackaging) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateSalaryPackaging({ [field]: value });
  };

  const handleYearChange = (value: TaxYear) => {
    updateSelectedYear(value);
  };

  const taxYears: TaxYear[] = [
    '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24', '2024-25'
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2 mb-6">
          <Label htmlFor="taxYear">Assessment Year</Label>
          <Select
            value={selectedYear}
            onValueChange={(value) => handleYearChange(value as TaxYear)}
          >
            <SelectTrigger id="taxYear">
              <SelectValue placeholder="Select tax year" />
            </SelectTrigger>
            <SelectContent>
              {taxYears.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salary">Annual Salary ($)</Label>
            <Input
              id="salary"
              type="number"
              min="0"
              value={incomeDetails.salary}
              onChange={handleNumberInputChange('salary')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bonus">Annual Bonus ($)</Label>
            <Input
              id="bonus"
              type="number"
              min="0"
              value={incomeDetails.bonus}
              onChange={handleNumberInputChange('bonus')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employerSuper">Employer Super Contributions ($)</Label>
            <Input
              id="employerSuper"
              type="number"
              min="0"
              value={incomeDetails.employerSuper}
              onChange={handleNumberInputChange('employerSuper')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherIncome">Other Income ($)</Label>
            <Input
              id="otherIncome"
              type="number"
              min="0"
              value={incomeDetails.otherIncome}
              onChange={handleNumberInputChange('otherIncome')}
            />
          </div>
        </div>

        <Separator className="my-6" />
        <h3 className="text-lg font-medium mb-4">Salary Packaging Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salarySacrificeSuper">Additional Super Contributions ($)</Label>
            <Input
              id="salarySacrificeSuper"
              type="number"
              min="0"
              value={salaryPackaging.salarySacrificeSuper}
              onChange={handleSalaryPackagingChange('salarySacrificeSuper')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="novatedLease">Novated Lease ($)</Label>
            <Input
              id="novatedLease"
              type="number"
              min="0"
              value={salaryPackaging.novatedLease}
              onChange={handleSalaryPackagingChange('novatedLease')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeDetailsForm;
