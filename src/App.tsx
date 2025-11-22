import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PregnantInfo from "./pages/PregnantInfo";
import Symptoms from "./pages/Symptoms";
import EmergencyServices from "./pages/EmergencyServices";
import Appointment from "./pages/Appointment";
import Midwife from "./pages/Midwife";
import AntenatalCare from "./pages/AntenatalCare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pregnant-info" element={<PregnantInfo />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/emergency-services" element={<EmergencyServices />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/midwife" element={<Midwife />} />
          <Route path="/antenatal-care" element={<AntenatalCare />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
