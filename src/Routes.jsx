import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Dashboard from "./pages/dashboard";
import ExpenseEntryAndManagement from "./pages/expense-entry-and-management";
import FinancialStoryTimeline from "./pages/financial-story-timeline";
import GoalSettingAndPlanning from "./pages/goal-setting-and-planning";
import LoginPage from "./pages/login";
import Registration from "./pages/registration";
import UnderWorking from "./pages/UnderWorking";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense-entry-and-management" element={<ExpenseEntryAndManagement />} />
          <Route path="/financial-story-timeline" element={<FinancialStoryTimeline />} />
          <Route path="/goal-setting-and-planning" element={<GoalSettingAndPlanning />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<UnderWorking />} />
          <Route path="/settings" element={<UnderWorking />} />
          <Route path="/under-working" element={<UnderWorking />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
