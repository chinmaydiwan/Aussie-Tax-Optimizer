
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxCalculationResult } from '@/types/tax-types';
import { formatCurrency } from '@/utils/taxCalculator';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';

interface ScenariosComparisonProps {
  scenarios: TaxCalculationResult[];
  bestScenarioIndex: number;
}

const ScenariosComparison: React.FC<ScenariosComparisonProps> = ({ 
  scenarios, 
  bestScenarioIndex 
}) => {
  if (!scenarios.length) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="text-center text-muted-foreground">
            No scenarios available for comparison.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenarios Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scenario</TableHead>
                <TableHead className="text-right">Taxable Income</TableHead>
                <TableHead className="text-right">Tax Liability</TableHead>
                <TableHead className="text-right">Final Result</TableHead>
                <TableHead className="text-right">Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario, index) => {
                // Calculate difference from standard scenario (first scenario)
                const standardResult = scenarios[0].finalRefundOrPayable;
                const difference = scenario.finalRefundOrPayable - standardResult;
                
                return (
                  <TableRow key={index} className={index === bestScenarioIndex ? "bg-accent/10" : ""}>
                    <TableCell className="font-medium">
                      {scenario.scenario}
                      {index === bestScenarioIndex && (
                        <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                          Best
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(scenario.taxableIncome)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(scenario.taxLiability)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(Math.abs(scenario.finalRefundOrPayable))}
                      <span className="text-xs ml-1">
                        {scenario.finalRefundOrPayable >= 0 ? "(refund)" : "(payable)"}
                      </span>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${difference > 0 ? 'text-accent' : difference < 0 ? 'text-destructive' : ''}`}>
                      {index === 0 ? '-' : (
                        <>
                          {difference > 0 ? '+' : ''}
                          {formatCurrency(difference)}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenariosComparison;
