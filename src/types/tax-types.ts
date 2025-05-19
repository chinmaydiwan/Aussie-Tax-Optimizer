
export type TaxYear = '2018-19' | '2019-20' | '2020-21' | '2021-22' | '2022-23' | '2023-24' | '2024-25';

export type ResidencyStatus = 'Resident' | 'Foreign Resident' | 'Working Holiday Maker';

export type MaritalStatus = 'Single' | 'Married/De facto';

export interface PersonalDetails {
  residencyStatus: ResidencyStatus;
  age: number;
  maritalStatus: MaritalStatus;
  dependentChildren: number;
  partnerIncome: number;
}

export interface IncomeDetails {
  salary: number;
  bonus: number;
  employerSuper: number;
  otherIncome: number;
}

export interface DeductionDetails {
  workRelatedExpenses: number;
  homeOfficeExpenses: number;
  professionalDevelopment: number;
  carAndTravel: number;
  taxAgentFees: number;
  donations: number;
  selfEducation: number;
  investmentDeductions: number;
}

export interface SalaryPackaging {
  salarySacrificeSuper: number;
  novatedLease: number;
}

export interface TaxCalculationResult {
  grossIncome: number;
  taxableIncome: number;
  taxLiability: number;
  medicareLevyAmount: number;
  offsetsRebates: number;
  finalRefundOrPayable: number;
  scenario: string;
}

export interface TaxData {
  personalDetails: PersonalDetails;
  incomeDetails: IncomeDetails;
  deductionDetails: DeductionDetails;
  salaryPackaging: SalaryPackaging;
  selectedYear: TaxYear;
}
