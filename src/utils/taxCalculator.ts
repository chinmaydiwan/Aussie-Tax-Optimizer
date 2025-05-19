
import { TaxYear, TaxData, TaxCalculationResult } from '../types/tax-types';

// Tax brackets by year
const TAX_BRACKETS = {
  '2018-19': [
    { threshold: 18200, rate: 0 },
    { threshold: 37000, rate: 0.19 },
    { threshold: 90000, rate: 0.325 },
    { threshold: 180000, rate: 0.37 },
    { threshold: Infinity, rate: 0.45 }
  ],
  '2019-20': [
    { threshold: 18200, rate: 0 },
    { threshold: 37000, rate: 0.19 },
    { threshold: 90000, rate: 0.325 },
    { threshold: 180000, rate: 0.37 },
    { threshold: Infinity, rate: 0.45 }
  ],
  '2020-21': [
    { threshold: 18200, rate: 0 },
    { threshold: 45000, rate: 0.19 },
    { threshold: 120000, rate: 0.325 },
    { threshold: 180000, rate: 0.37 },
    { threshold: Infinity, rate: 0.45 }
  ],
  '2021-22': [
    { threshold: 18200, rate: 0 },
    { threshold: 45000, rate: 0.19 },
    { threshold: 120000, rate: 0.325 },
    { threshold: 180000, rate: 0.37 },
    { threshold: Infinity, rate: 0.45 }
  ],
  '2022-23': [
    { threshold: 18200, rate: 0 },
    { threshold: 45000, rate: 0.19 },
    { threshold: 120000, rate: 0.325 },
    { threshold: 180000, rate: 0.37 },
    { threshold: Infinity, rate: 0.45 }
  ],
  '2023-24': [
    { threshold: 18200, rate: 0 },
    { threshold: 45000, rate: 0.19 },
    { threshold: 120000, rate: 0.325 },
    { threshold: 180000, rate: 0.37 },
    { threshold: Infinity, rate: 0.45 }
  ],
  '2024-25': [
    { threshold: 18200, rate: 0 },
    { threshold: 45000, rate: 0.16 },
    { threshold: 135000, rate: 0.30 },
    { threshold: 190000, rate: 0.37 },
    { threshold: Infinity, rate: 0.45 }
  ],
};

// Medicare levy rates
const MEDICARE_LEVY_RATE = 0.02; // 2%
const MEDICARE_LEVY_THRESHOLD = {
  '2018-19': 22398,
  '2019-20': 22801,
  '2020-21': 23226,
  '2021-22': 23365,
  '2022-23': 24276,
  '2023-24': 26000,
  '2024-25': 26500, // Estimated
};

// Low Income Tax Offset (LITO)
const LITO = {
  '2018-19': { max: 445, threshold: 37000, reduction: 0.015 },
  '2019-20': { max: 445, threshold: 37000, reduction: 0.015 },
  '2020-21': { max: 700, threshold: 37500, reduction: 0.05 },
  '2021-22': { max: 700, threshold: 37500, reduction: 0.05 },
  '2022-23': { max: 700, threshold: 37500, reduction: 0.05 },
  '2023-24': { max: 700, threshold: 37500, reduction: 0.05 },
  '2024-25': { max: 700, threshold: 37500, reduction: 0.05 }, // Estimated
};

// Low and Middle Income Tax Offset (LMITO) - ended in 2021-22
const LMITO = {
  '2018-19': { max: 530, minIncome: 37000, maxIncome: 126000 },
  '2019-20': { max: 1080, minIncome: 48000, maxIncome: 126000 },
  '2020-21': { max: 1080, minIncome: 48000, maxIncome: 126000 },
  '2021-22': { max: 1500, minIncome: 48000, maxIncome: 126000 },
  '2022-23': { max: 0, minIncome: 0, maxIncome: 0 }, // Ended
  '2023-24': { max: 0, minIncome: 0, maxIncome: 0 }, // Ended
  '2024-25': { max: 0, minIncome: 0, maxIncome: 0 }, // Ended
};

// Superannuation contribution caps
const SUPER_CONCESSIONAL_CAPS = {
  '2018-19': 25000,
  '2019-20': 25000,
  '2020-21': 25000,
  '2021-22': 27500,
  '2022-23': 27500,
  '2023-24': 27500,
  '2024-25': 27500, // Estimated
};

// Calculate tax for a given income and tax year
export const calculateIncomeTax = (taxableIncome: number, year: TaxYear): number => {
  const brackets = TAX_BRACKETS[year];
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (let i = 0; i < brackets.length; i++) {
    const currentBracket = brackets[i];
    const previousThreshold = i === 0 ? 0 : brackets[i-1].threshold;
    
    if (taxableIncome > previousThreshold) {
      const taxableAmountInBracket = Math.min(
        remainingIncome,
        currentBracket.threshold - previousThreshold
      );
      tax += taxableAmountInBracket * currentBracket.rate;
      remainingIncome -= taxableAmountInBracket;
    }
  }

  return tax;
};

// Calculate Medicare Levy
export const calculateMedicareLevy = (taxableIncome: number, year: TaxYear, hasDependents: boolean): number => {
  const threshold = MEDICARE_LEVY_THRESHOLD[year];
  const adjustedThreshold = hasDependents 
    ? threshold + 2000 + ((hasDependents ? 1 : 0) * 3000) 
    : threshold;
  
  if (taxableIncome <= adjustedThreshold) {
    return 0;
  }
  
  return taxableIncome * MEDICARE_LEVY_RATE;
};

// Calculate Low Income Tax Offset
export const calculateLITO = (taxableIncome: number, year: TaxYear): number => {
  const { max, threshold, reduction } = LITO[year];
  
  if (taxableIncome <= threshold) {
    return max;
  }
  
  const offset = max - ((taxableIncome - threshold) * reduction);
  return Math.max(0, offset);
};

// Calculate Low and Middle Income Tax Offset (if applicable)
export const calculateLMITO = (taxableIncome: number, year: TaxYear): number => {
  const { max, minIncome, maxIncome } = LMITO[year];
  
  if (max === 0 || taxableIncome < 0 || taxableIncome > maxIncome) {
    return 0;
  }
  
  if (taxableIncome <= minIncome) {
    return Math.min(max, taxableIncome * 0.075);
  }
  
  return max;
};

// Calculate total tax offsets
export const calculateTaxOffsets = (taxableIncome: number, year: TaxYear): number => {
  const lito = calculateLITO(taxableIncome, year);
  const lmito = calculateLMITO(taxableIncome, year);
  return lito + lmito;
};

// Calculate family benefits estimates (basic implementation)
export const calculateFamilyBenefits = (
  taxableIncome: number, 
  partnerIncome: number, 
  dependents: number,
  year: TaxYear
): number => {
  if (dependents === 0) return 0;
  
  const combinedIncome = taxableIncome + partnerIncome;
  // Simplified FTB Part A calculation (actual calculation is more complex)
  let benefit = 0;
  
  if (combinedIncome < 80000) {
    benefit = dependents * 5000; // Simplified amount
  } else if (combinedIncome < 100000) {
    benefit = dependents * 2500;
  }
  
  return benefit;
};

// Calculate super contribution opportunities
export const calculateSuperOptimization = (
  income: number,
  currentSuper: number,
  year: TaxYear
): number => {
  const cap = SUPER_CONCESSIONAL_CAPS[year];
  const remainingCap = cap - currentSuper;
  return Math.max(0, Math.min(remainingCap, income * 0.1));
};

// Main tax calculation function
export const calculateTax = (data: TaxData, scenario: string = 'Standard'): TaxCalculationResult => {
  const { 
    personalDetails, 
    incomeDetails, 
    deductionDetails, 
    salaryPackaging, 
    selectedYear 
  } = data;
  
  // Calculate gross income
  const grossIncome = 
    incomeDetails.salary + 
    incomeDetails.bonus + 
    incomeDetails.otherIncome;
  
  // Calculate total deductions
  const totalDeductions = 
    deductionDetails.workRelatedExpenses +
    deductionDetails.homeOfficeExpenses +
    deductionDetails.professionalDevelopment +
    deductionDetails.carAndTravel +
    deductionDetails.taxAgentFees +
    deductionDetails.donations +
    deductionDetails.selfEducation +
    deductionDetails.investmentDeductions;
  
  // Calculate taxable income (account for salary packaging)
  const salaryAfterPackaging = 
    grossIncome - 
    (salaryPackaging.salarySacrificeSuper + 
     salaryPackaging.novatedLease);
  
  const taxableIncome = Math.max(0, salaryAfterPackaging - totalDeductions);
  
  // Calculate tax components
  const baseTax = calculateIncomeTax(taxableIncome, selectedYear);
  const medicareLevy = calculateMedicareLevy(
    taxableIncome, 
    selectedYear, 
    personalDetails.dependentChildren > 0
  );
  const taxOffsets = calculateTaxOffsets(taxableIncome, selectedYear);
  const familyBenefits = calculateFamilyBenefits(
    taxableIncome,
    personalDetails.partnerIncome,
    personalDetails.dependentChildren,
    selectedYear
  );
  
  // Calculate final tax position
  const totalTaxLiability = baseTax + medicareLevy;
  const totalRebates = taxOffsets + familyBenefits;
  const finalPosition = -(totalTaxLiability - totalRebates);
  
  return {
    grossIncome,
    taxableIncome,
    taxLiability: totalTaxLiability,
    medicareLevyAmount: medicareLevy,
    offsetsRebates: totalRebates,
    finalRefundOrPayable: finalPosition,
    scenario
  };
};

// Calculate multiple scenarios for comparison
export const calculateScenarios = (data: TaxData): TaxCalculationResult[] => {
  // Scenario 1: Standard PAYG
  const standardScenario = calculateTax({...data}, 'Standard PAYG');
  
  // Scenario 2: With salary sacrifice to super
  const superData = {
    ...data,
    salaryPackaging: {
      ...data.salaryPackaging,
      salarySacrificeSuper: calculateSuperOptimization(
        data.incomeDetails.salary,
        data.incomeDetails.employerSuper,
        data.selectedYear
      )
    }
  };
  const superScenario = calculateTax(superData, 'With Super Sacrifice');
  
  // Scenario 3: Maximum deductions (assuming 10% more than current)
  // Fix: Create a properly typed object instead of using Object.entries and reduce
  const maxDeductionsData = {
    ...data,
    deductionDetails: {
      workRelatedExpenses: data.deductionDetails.workRelatedExpenses * 1.1,
      homeOfficeExpenses: data.deductionDetails.homeOfficeExpenses * 1.1,
      professionalDevelopment: data.deductionDetails.professionalDevelopment * 1.1,
      carAndTravel: data.deductionDetails.carAndTravel * 1.1,
      taxAgentFees: data.deductionDetails.taxAgentFees * 1.1,
      donations: data.deductionDetails.donations * 1.1,
      selfEducation: data.deductionDetails.selfEducation * 1.1,
      investmentDeductions: data.deductionDetails.investmentDeductions * 1.1,
    }
  };
  const maxDeductionsScenario = calculateTax(maxDeductionsData, 'Max Deductions');
  
  // Scenario 4: Combined strategy (best approach)
  const combinedData = {
    ...data,
    salaryPackaging: superData.salaryPackaging,
    deductionDetails: maxDeductionsData.deductionDetails
  };
  const combinedScenario = calculateTax(combinedData, 'Optimized Strategy');
  
  return [standardScenario, superScenario, maxDeductionsScenario, combinedScenario];
};

// Determine the best scenario based on final refund amount
export const determineBestScenario = (scenarios: TaxCalculationResult[]): TaxCalculationResult => {
  return scenarios.reduce((best, current) => {
    return current.finalRefundOrPayable > best.finalRefundOrPayable ? current : best;
  });
};

// Format currency values for display
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
  }).format(value);
};
