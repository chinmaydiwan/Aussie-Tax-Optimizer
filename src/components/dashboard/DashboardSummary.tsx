
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTaxData } from '@/contexts/TaxDataContext';
import { formatCurrency } from '@/utils/taxCalculator';

const DashboardSummary: React.FC = () => {
  const { taxData, getBestScenario } = useTaxData();
  const bestScenario = getBestScenario();
  
  const isRefund = bestScenario.finalRefundOrPayable > 0;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Assessment Year</p>
            <p className="text-2xl font-semibold">{taxData.selectedYear}</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Gross Income</p>
            <p className="text-2xl font-semibold">{formatCurrency(bestScenario.grossIncome)}</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Taxable Income</p>
            <p className="text-2xl font-semibold">{formatCurrency(bestScenario.taxableIncome)}</p>
          </div>
          
          <div className={`p-4 border rounded-lg ${isRefund ? 'bg-accent/10' : 'bg-destructive/10'}`}>
            <p className="text-sm text-muted-foreground">{isRefund ? "Estimated Refund" : "Tax Payable"}</p>
            <p className={`text-2xl font-semibold ${isRefund ? 'text-accent' : 'text-destructive'}`}>
              {formatCurrency(Math.abs(bestScenario.finalRefundOrPayable))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardSummary;
