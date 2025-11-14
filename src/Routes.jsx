import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import GoalSettingAndPlanning from './pages/goal-setting-and-planning';
import Registration from './pages/registration';
import ExpenseEntryAndManagement from './pages/expense-entry-and-management';
import LoginPage from './pages/login';
import FinancialStoryTimeline from './pages/financial-story-timeline';
import Dashboard from './pages/dashboard';

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Define your route here */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/goal-setting-and-planning" element={<GoalSettingAndPlanning />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/expense-entry-and-management" element={<ExpenseEntryAndManagement />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/financial-story-timeline" element={<FinancialStoryTimeline />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
