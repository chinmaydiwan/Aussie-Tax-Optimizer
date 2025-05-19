
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTaxData } from '@/contexts/TaxDataContext';
import { ResidencyStatus, MaritalStatus } from '@/types/tax-types';

const PersonalDetailsForm: React.FC = () => {
  const { taxData, updatePersonalDetails } = useTaxData();
  const { personalDetails } = taxData;

  const handleResidencyChange = (value: ResidencyStatus) => {
    updatePersonalDetails({ residencyStatus: value });
  };

  const handleMaritalStatusChange = (value: MaritalStatus) => {
    updatePersonalDetails({ maritalStatus: value });
  };

  const handleNumberInputChange = (field: keyof typeof personalDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    updatePersonalDetails({ [field]: value });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="residencyStatus">Residency Status</Label>
            <Select
              value={personalDetails.residencyStatus}
              onValueChange={(value) => handleResidencyChange(value as ResidencyStatus)}
            >
              <SelectTrigger id="residencyStatus">
                <SelectValue placeholder="Select residency status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Resident">Australian Resident</SelectItem>
                <SelectItem value="Foreign Resident">Foreign Resident</SelectItem>
                <SelectItem value="Working Holiday Maker">Working Holiday Maker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min="0"
              value={personalDetails.age}
              onChange={handleNumberInputChange('age')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select
              value={personalDetails.maritalStatus}
              onValueChange={(value) => handleMaritalStatusChange(value as MaritalStatus)}
            >
              <SelectTrigger id="maritalStatus">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married/De facto">Married/De facto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dependentChildren">Number of Dependent Children</Label>
            <Input
              id="dependentChildren"
              type="number"
              min="0"
              value={personalDetails.dependentChildren}
              onChange={handleNumberInputChange('dependentChildren')}
            />
          </div>

          {personalDetails.maritalStatus === 'Married/De facto' && (
            <div className="space-y-2">
              <Label htmlFor="partnerIncome">Partner's Annual Income ($)</Label>
              <Input
                id="partnerIncome"
                type="number"
                min="0"
                value={personalDetails.partnerIncome}
                onChange={handleNumberInputChange('partnerIncome')}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsForm;
