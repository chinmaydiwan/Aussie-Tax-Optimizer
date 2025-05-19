
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import Navigation from '../components/layout/Navigation';
import TaxSummaryCard from '../components/results/TaxSummaryCard';
import ScenariosComparison from '../components/results/ScenariosComparison';
import Recommendations from '../components/results/Recommendations';
import { useTaxData } from '../contexts/TaxDataContext';

const Results = () => {
  const { calculateResults, getBestScenario } = useTaxData();
  const scenarios = calculateResults();
  const bestScenario = getBestScenario();
  
  // Find the index of the best scenario
  const bestScenarioIndex = scenarios.findIndex(
    scenario => scenario.finalRefundOrPayable === bestScenario.finalRefundOrPayable
  );
  
  return (
    <PageLayout>
      <PageHeader
        title="Tax Optimization Results"
        description="View and compare different tax scenarios"
      />
      
      <Navigation />
      
      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaxSummaryCard 
            result={scenarios[0]} 
            isOptimal={bestScenarioIndex === 0}
          />
          <TaxSummaryCard 
            result={bestScenario} 
            isOptimal={bestScenarioIndex !== 0}
          />
        </div>
        
        <ScenariosComparison 
          scenarios={scenarios} 
          bestScenarioIndex={bestScenarioIndex} 
        />
        
        <Recommendations />
        
        <div className="text-sm text-muted-foreground bg-secondary p-4 rounded-lg">
          <p className="font-semibold mb-2">Important Notes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>All calculations are estimates based on publicly available ATO tax rates and thresholds.</li>
            <li>This tool does not account for all personal circumstances or special tax situations.</li>
            <li>For final tax advice, please consult with a registered tax agent or accountant.</li>
            <li>Tax laws and rates change annually; always verify with official ATO information.</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default Results;
