
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import Navigation from '../components/layout/Navigation';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChartBar, User, FileText, DollarSign } from 'lucide-react';

const Index = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Australian Tax Return Optimizer"
        description="Calculate, compare, and optimize your tax return"
      />
      
      <Navigation />
      
      <div className="mt-6 space-y-6">
        <DashboardSummary />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Details
              </CardTitle>
              <CardDescription>
                Enter your residency status, age, and family details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your personal circumstances directly impact your tax obligations and eligibility for various benefits and deductions.
              </p>
              <Button asChild className="w-full">
                <Link to="/personal">Update Personal Details</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Income & Superannuation
              </CardTitle>
              <CardDescription>
                Enter salary, bonuses and superannuation details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Optimize your income structure and superannuation contributions to potentially reduce your tax liability.
              </p>
              <Button asChild className="w-full">
                <Link to="/income">Update Income Details</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Deductions
              </CardTitle>
              <CardDescription>
                Track and optimize your eligible tax deductions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Ensure you're claiming all eligible deductions to maximize your tax refund or minimize your tax payable.
              </p>
              <Button asChild className="w-full">
                <Link to="/deductions">Update Deductions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <ChartBar className="h-5 w-5 mr-2" />
              Tax Optimization Results
            </CardTitle>
            <CardDescription>
              View scenarios and recommended tax strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Compare different tax scenarios and see how various strategies could impact your tax position.
              Get personalized recommendations based on your specific circumstances.
            </p>
            <Button asChild className="w-full">
              <Link to="/results">View Complete Results</Link>
            </Button>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground mt-8">
          <p>
            Disclaimer: This tool provides estimates based on publicly available information about tax rates and thresholds. 
            It is not a substitute for professional tax advice. Please consult with a registered tax agent for your specific situation.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
