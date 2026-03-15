import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Donors from "./pages/Donors";
import Volunteers from "./pages/Volunteers";
import VolunteerRole from "./pages/VolunteerRole";
import ApplicantDetail from "./pages/ApplicantDetail";
import Inventory from "./pages/Inventory";
import ApprovalStatus from "./pages/ApprovalStatus";
import RejectionStatus from "./pages/RejectionStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/volunteers/:role" element={<VolunteerRole />} />
          <Route path="/applicant/:id" element={<ApplicantDetail />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/approval-status" element={<ApprovalStatus />} />
          <Route path="/rejection-status" element={<RejectionStatus />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
