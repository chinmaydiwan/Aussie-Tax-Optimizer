
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxCalculationResult } from '@/types/tax-types';
import { formatCurrency } from '@/utils/taxCalculator';

interface TaxSummaryCardProps {
  result: TaxCalculationResult;
  isOptimal?: boolean;
}

const TaxSummaryCard: React.FC<TaxSummaryCardProps> = ({ 
  result,
  isOptimal = false 
}) => {
  const isRefund = result.finalRefundOrPayable > 0;

  return (
    <Card className={isOptimal ? "border-2 border-accent" : ""}>
      <CardHeader className={isOptimal ? "bg-accent/10" : ""}>
        <CardTitle className="flex justify-between items-center">
          <span>{result.scenario}</span>
          {isOptimal && (
            <span className="text-xs font-normal bg-accent text-accent-foreground px-2 py-1 rounded-full">
              Recommended
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gross Income:</span>
            <span className="font-medium">{formatCurrency(result.grossIncome)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxable Income:</span>
            <span className="font-medium">{formatCurrency(result.taxableIncome)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax Liability:</span>
            <span className="font-medium">{formatCurrency(result.taxLiability)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Medicare Levy:</span>
            <span className="font-medium">{formatCurrency(result.medicareLevyAmount)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Offsets & Rebates:</span>
            <span className="font-medium">{formatCurrency(result.offsetsRebates)}</span>
          </div>
          
          <hr />
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-base font-semibold">
              {isRefund ? "Tax Refund:" : "Tax Payable:"}
            </span>
            <span className={`text-lg font-bold ${
              isRefund ? 'text-accent' : 'text-destructive'
            }`}>
              {formatCurrency(Math.abs(result.finalRefundOrPayable))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxSummaryCard;
