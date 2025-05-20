
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { TaxDataProvider } from "./contexts/TaxDataContext";
import Index from "./pages/Index";
import PersonalDetails from "./pages/PersonalDetails";
import Income from "./pages/Income";
import Deductions from "./pages/Deductions";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TaxDataProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/personal" element={<PersonalDetails />} />
            <Route path="/income" element={<Income />} />
            <Route path="/deductions" element={<Deductions />} />
            <Route path="/results" element={<Results />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TaxDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
