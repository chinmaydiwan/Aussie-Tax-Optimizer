
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  TaxYear, 
  TaxData, 
  PersonalDetails, 
  IncomeDetails, 
  DeductionDetails, 
  SalaryPackaging, 
  TaxCalculationResult 
} from '../types/tax-types';
import { calculateScenarios, determineBestScenario } from '../utils/taxCalculator';
import { toast } from "@/hooks/use-toast";

// Default values for initial state
const DEFAULT_TAX_DATA: TaxData = {
  personalDetails: {
    residencyStatus: 'Resident',
    age: 30,
    maritalStatus: 'Single',
    dependentChildren: 0,
    partnerIncome: 0
  },
  incomeDetails: {
    salary: 80000,
    bonus: 0,
    employerSuper: 8000, // Default 10% employer super
    otherIncome: 0
  },
  deductionDetails: {
    workRelatedExpenses: 0,
    homeOfficeExpenses: 0,
    professionalDevelopment: 0,
    carAndTravel: 0,
    taxAgentFees: 0,
    donations: 0,
    selfEducation: 0,
    investmentDeductions: 0
  },
  salaryPackaging: {
    salarySacrificeSuper: 0,
    novatedLease: 0
  },
  selectedYear: '2023-24' as TaxYear
};

// Context type definition
interface TaxDataContextType {
  taxData: TaxData;
  updatePersonalDetails: (details: Partial<PersonalDetails>) => void;
  updateIncomeDetails: (details: Partial<IncomeDetails>) => void;
  updateDeductionDetails: (details: Partial<DeductionDetails>) => void;
  updateSalaryPackaging: (details: Partial<SalaryPackaging>) => void;
  updateSelectedYear: (year: TaxYear) => void;
  calculateResults: () => TaxCalculationResult[];
  getBestScenario: () => TaxCalculationResult;
  resetData: () => void;
  saveData: () => void;
  loadData: () => boolean;
}

// Create context with default values
const TaxDataContext = createContext<TaxDataContextType>({
  taxData: DEFAULT_TAX_DATA,
  updatePersonalDetails: () => {},
  updateIncomeDetails: () => {},
  updateDeductionDetails: () => {},
  updateSalaryPackaging: () => {},
  updateSelectedYear: () => {},
  calculateResults: () => [],
  getBestScenario: () => ({
    grossIncome: 0,
    taxableIncome: 0,
    taxLiability: 0,
    medicareLevyAmount: 0,
    offsetsRebates: 0,
    finalRefundOrPayable: 0,
    scenario: ''
  }),
  resetData: () => {},
  saveData: () => {},
  loadData: () => false
});

// Provider component
export const TaxDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [taxData, setTaxData] = useState<TaxData>(DEFAULT_TAX_DATA);

  // Update personal details
  const updatePersonalDetails = (details: Partial<PersonalDetails>) => {
    setTaxData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        ...details
      }
    }));
  };

  // Update income details
  const updateIncomeDetails = (details: Partial<IncomeDetails>) => {
    setTaxData((prev) => ({
      ...prev,
      incomeDetails: {
        ...prev.incomeDetails,
        ...details
      }
    }));
  };

  // Update deduction details
  const updateDeductionDetails = (details: Partial<DeductionDetails>) => {
    setTaxData((prev) => ({
      ...prev,
      deductionDetails: {
        ...prev.deductionDetails,
        ...details
      }
    }));
  };

  // Update salary packaging details
  const updateSalaryPackaging = (details: Partial<SalaryPackaging>) => {
    setTaxData((prev) => ({
      ...prev,
      salaryPackaging: {
        ...prev.salaryPackaging,
        ...details
      }
    }));
  };

  // Update selected tax year
  const updateSelectedYear = (year: TaxYear) => {
    setTaxData((prev) => ({
      ...prev,
      selectedYear: year
    }));
  };

  // Calculate tax results for all scenarios
  const calculateResults = (): TaxCalculationResult[] => {
    return calculateScenarios(taxData);
  };

  // Get the best tax scenario
  const getBestScenario = (): TaxCalculationResult => {
    const scenarios = calculateScenarios(taxData);
    return determineBestScenario(scenarios);
  };

  // Reset all data to defaults
  const resetData = () => {
    setTaxData(DEFAULT_TAX_DATA);
    toast({
      title: "Data Reset",
      description: "All your tax data has been reset to default values."
    });
  };

  // Save data to local storage
  const saveData = () => {
    try {
      localStorage.setItem('tax-optimizer-data', JSON.stringify(taxData));
      toast({
        title: "Data Saved",
        description: "Your tax data has been saved successfully."
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Save Error",
        description: "Failed to save your tax data.",
        variant: "destructive"
      });
    }
  };

  // Load data from local storage
  const loadData = (): boolean => {
    try {
      const savedData = localStorage.getItem('tax-optimizer-data');
      if (savedData) {
        setTaxData(JSON.parse(savedData));
        toast({
          title: "Data Loaded",
          description: "Your saved tax data has been loaded successfully."
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Load Error",
        description: "Failed to load your saved tax data.",
        variant: "destructive"
      });
      return false;
    }
  };

  const contextValue: TaxDataContextType = {
    taxData,
    updatePersonalDetails,
    updateIncomeDetails,
    updateDeductionDetails,
    updateSalaryPackaging,
    updateSelectedYear,
    calculateResults,
    getBestScenario,
    resetData,
    saveData,
    loadData
  };

  return (
    <TaxDataContext.Provider value={contextValue}>
      {children}
    </TaxDataContext.Provider>
  );
};

// Custom hook to use the tax data context
export const useTaxData = () => useContext(TaxDataContext);
