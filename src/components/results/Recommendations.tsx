
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTaxData } from '@/contexts/TaxDataContext';
import { formatCurrency } from '@/utils/taxCalculator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText } from 'lucide-react';

const Recommendations: React.FC = () => {
  const { taxData, calculateResults, getBestScenario } = useTaxData();
  const scenarios = calculateResults();
  const bestScenario = getBestScenario();
  
  // Get the standard scenario for comparison
  const standardScenario = scenarios[0];
  
  // Calculate potential savings
  const potentialSavings = bestScenario.finalRefundOrPayable - standardScenario.finalRefundOrPayable;
  
  // Determine recommendations based on data
  const recommendations = [];
  
  // Super recommendations
  if (bestScenario.scenario.includes('Super')) {
    recommendations.push({
      title: "Increase Super Contributions",
      description: `Consider salary sacrificing more to your superannuation. This could save you approximately ${formatCurrency(potentialSavings)} in tax.`
    });
  }
  
  // Deductions recommendations
  const totalCurrentDeductions = 
    taxData.deductionDetails.workRelatedExpenses +
    taxData.deductionDetails.homeOfficeExpenses +
    taxData.deductionDetails.professionalDevelopment +
    taxData.deductionDetails.carAndTravel +
    taxData.deductionDetails.taxAgentFees +
    taxData.deductionDetails.donations +
    taxData.deductionDetails.selfEducation +
    taxData.deductionDetails.investmentDeductions;
  
  if (totalCurrentDeductions < 300) {
    recommendations.push({
      title: "Explore Work-Related Deductions",
      description: "Your claimed deductions are relatively low. Consider reviewing work-related expenses such as home office use, professional subscriptions, and work-related travel."
    });
  }
  
  // Family benefit recommendations
  if (taxData.personalDetails.dependentChildren > 0 && taxData.personalDetails.residencyStatus === 'Resident') {
    recommendations.push({
      title: "Check Family Tax Benefits",
      description: "You may be eligible for Family Tax Benefits. Check your eligibility on the Services Australia website."
    });
  }
  
  // High income earner recommendations
  if (taxData.incomeDetails.salary > 120000) {
    recommendations.push({
      title: "High Income Tax Planning",
      description: "As a high income earner, consider speaking with a tax professional about additional strategies such as investment bonds or splitting income with a spouse if possible."
    });
  }
  
  // Add default recommendation if none are applicable
  if (recommendations.length === 0) {
    recommendations.push({
      title: "Consider Speaking with a Tax Professional",
      description: "Based on your current details, we recommend consulting with a tax professional for personalized advice."
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Optimization Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {potentialSavings > 0 && (
          <Alert className="bg-accent/10 border-accent mb-6">
            <FileText className="h-4 w-4" />
            <AlertTitle>Potential Tax Savings</AlertTitle>
            <AlertDescription>
              By implementing the recommended strategies, you could save up to {formatCurrency(potentialSavings)}.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">{recommendation.title}</h3>
              <p className="text-muted-foreground mt-1">{recommendation.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p>Disclaimer: These recommendations are based on the information provided and are for general guidance only. 
          Tax laws are complex, and individual circumstances vary. Please consult with a registered tax agent for 
          personalized advice.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
