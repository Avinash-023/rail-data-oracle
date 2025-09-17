import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Alerts from "./pages/Alerts";
import Employees from "./pages/Employees";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/search" element={<Dashboard />} />
            <Route path="/analytics" element={<Dashboard />} />
            <Route path="/queue" element={<Dashboard />} />
            <Route path="/models" element={<Dashboard />} />
            <Route path="/archive" element={<Dashboard />} />
            <Route path="/safety" element={<Dashboard />} />
            <Route path="/users" element={<Dashboard />} />
            <Route path="/security" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
