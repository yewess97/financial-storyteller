import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import ExpenseEntryForm from './components/ExpenseEntryForm';
import ExpenseList from './components/ExpenseList';
import CategoryManager from './components/CategoryManager';
import BudgetImpactIndicator from './components/BudgetImpactIndicator';
import ReceiptUpload from './components/ReceiptUpload';
import QuickEntryTemplates from './components/QuickEntryTemplates';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ExpenseEntryAndManagement = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('entry');
    const [user] = useState({
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com"
    });

    const [expenses, setExpenses] = useState([
        {
            id: 1,
            amount: 24.99,
            description: "Lunch at Bella Vista Restaurant",
            category: "food",
            date: "2025-11-09",
            narrative: "A delightful midday meal that brought joy to an otherwise busy workday",
            timestamp: "2025-11-09T12:30:00Z",
            storyImpact: "This dining experience represents moments of nourishment and social connection in your financial story."
        },
        {
            id: 2,
            amount: 45.00,
            description: "Gas station fill-up",
            category: "transport",
            date: "2025-11-08",
            narrative: "Keeping the journey moving forward with essential fuel",
            timestamp: "2025-11-08T08:15:00Z",
            storyImpact: "A necessary chapter in your mobility story, enabling life's adventures and daily responsibilities."
        },
        {
            id: 3,
            amount: 89.50,
            description: "Weekly grocery shopping at Whole Foods",
            category: "food",
            date: "2025-11-07",
            narrative: "Stocking up on healthy ingredients for home-cooked meals",
            timestamp: "2025-11-07T16:45:00Z",
            storyImpact: "An investment in health and home comfort, creating the foundation for nourishing family stories."
        },
        {
            id: 4,
            amount: 15.99,
            description: "Netflix monthly subscription",
            category: "entertainment",
            date: "2025-11-06",
            narrative: "Monthly entertainment subscription for relaxation",
            timestamp: "2025-11-06T10:00:00Z",
            storyImpact: "Your window to entertainment and relaxation, adding joy and downtime to your life's narrative."
        },
        {
            id: 5,
            amount: 125.00,
            description: "Electric utility bill",
            category: "bills",
            date: "2025-11-05",
            narrative: "Monthly electricity bill for home comfort",
            timestamp: "2025-11-05T14:20:00Z",
            storyImpact: "Essential infrastructure that powers your daily life and enables all other stories to unfold."
        }
    ]);

    const [categories, setCategories] = useState([
        {
            id: 'food',
            name: 'Food & Dining',
            icon: '🍽️',
            description: 'Meals, groceries, and dining experiences',
            color: '#EF4444'
        },
        {
            id: 'transport',
            name: 'Transportation',
            icon: '🚗',
            description: 'Gas, public transit, rideshares',
            color: '#3B82F6'
        },
        {
            id: 'shopping',
            name: 'Shopping',
            icon: '🛍️',
            description: 'Clothing, electronics, personal items',
            color: '#EC4899'
        },
        {
            id: 'entertainment',
            name: 'Entertainment',
            icon: '🎬',
            description: 'Movies, games, subscriptions',
            color: '#8B5CF6'
        },
        {
            id: 'bills',
            name: 'Bills & Utilities',
            icon: '📄',
            description: 'Rent, utilities, insurance',
            color: '#6B7280'
        },
        {
            id: 'healthcare',
            name: 'Healthcare',
            icon: '🏥',
            description: 'Medical expenses, pharmacy',
            color: '#10B981'
        },
        {
            id: 'education',
            name: 'Education',
            icon: '📚',
            description: 'Courses, books, learning materials',
            color: '#F59E0B'
        },
        {
            id: 'other',
            name: 'Other',
            icon: '📦',
            description: 'Miscellaneous expenses',
            color: '#6B7280'
        }
    ]);

    const [budgetLimits] = useState({
        food: 800,
        transport: 300,
        shopping: 400,
        entertainment: 150,
        bills: 1200,
        healthcare: 200,
        education: 100,
        other: 200
    });

    const [templates, setTemplates] = useState([]);

    const tabs = [
        { id: 'entry', label: 'Add Expense', icon: 'Plus' },
        { id: 'list', label: 'Expense List', icon: 'List' },
        { id: 'categories', label: 'Categories', icon: 'FolderOpen' },
        { id: 'receipt', label: 'Receipt Scanner', icon: 'Camera' },
        { id: 'templates', label: 'Quick Templates', icon: 'Zap' }
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const handleExpenseAdded = (expenseData) => {
        const newExpense = {
            ...expenseData,
            id: Date.now(),
            timestamp: new Date()?.toISOString()
        };
        setExpenses(prev => [newExpense, ...prev]);
    };

    const handleExpenseUpdate = (expenseId) => {
        console.log('Update expense:', expenseId);
        // Implementation would open edit modal
    };

    const handleExpenseDelete = (expenseId) => {
        setExpenses(prev => prev?.filter(exp => exp?.id !== expenseId));
    };

    const handleBulkUpdate = (expenseIds, updates) => {
        setExpenses(prev => prev?.map(exp =>
            expenseIds?.includes(exp?.id) ? { ...exp, ...updates } : exp
        ));
    };

    const handleCategoryCreate = (categoryData) => {
        setCategories(prev => [...prev, categoryData]);
    };

    const handleCategoryUpdate = (categoryId, updates) => {
        setCategories(prev => prev?.map(cat =>
            cat?.id === categoryId ? { ...cat, ...updates } : cat
        ));
    };

    const handleCategoryDelete = (categoryId) => {
        setCategories(prev => prev?.filter(cat => cat?.id !== categoryId));
    };

    const handleReceiptProcessed = (receiptData) => {
        const expenseData = {
            amount: receiptData?.amount,
            description: `${receiptData?.merchant} - Receipt Upload`,
            category: receiptData?.category,
            date: receiptData?.date,
            narrative: receiptData?.storyContext,
            isFromReceipt: true
        };
        handleExpenseAdded(expenseData);
        setActiveTab('list');
    };

    const handleTemplateUse = (templateData) => {
        handleExpenseAdded(templateData);
        setActiveTab('list');
    };

    const handleTemplateCreate = (templateData) => {
        setTemplates(prev => [...prev, templateData]);
    };

    const getTotalSpent = () => {
        return expenses?.reduce((sum, exp) => sum + exp?.amount, 0);
    };

    const getMonthlySpending = () => {
        const currentMonth = new Date()?.getMonth();
        const currentYear = new Date()?.getFullYear();

        return expenses?.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate?.getMonth() === currentMonth && expDate?.getFullYear() === currentYear;
        })?.reduce((sum, exp) => sum + exp?.amount, 0);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'entry':
                return (
                    <div className="space-y-6">
                        <ExpenseEntryForm
                            onExpenseAdded={handleExpenseAdded}
                            categories={categories}
                            onCategoryCreate={handleCategoryCreate}
                        />
                        <BudgetImpactIndicator
                            currentExpenses={expenses}
                            budgetLimits={budgetLimits}
                            newExpenseAmount=""
                            category=""
                        />
                    </div>
                );
            case 'list':
                return (
                    <ExpenseList
                        expenses={expenses}
                        categories={categories}
                        onExpenseUpdate={handleExpenseUpdate}
                        onExpenseDelete={handleExpenseDelete}
                        onBulkUpdate={handleBulkUpdate}
                    />
                );
            case 'categories':
                return (
                    <CategoryManager
                        categories={categories}
                        onCategoryCreate={handleCategoryCreate}
                        onCategoryUpdate={handleCategoryUpdate}
                        onCategoryDelete={handleCategoryDelete}
                    />
                );
            case 'receipt':
                return (
                    <ReceiptUpload
                        onReceiptProcessed={handleReceiptProcessed}
                    />
                );
            case 'templates':
                return (
                    <QuickEntryTemplates
                        onTemplateUse={handleTemplateUse}
                        onTemplateCreate={handleTemplateCreate}
                        templates={templates}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <AuthenticatedHeader
                user={user}
                onLogout={handleLogout}
            />
            <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <NavigationBreadcrumbs />

                        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div>
                                <h1 className="font-heading font-bold text-3xl text-foreground">
                                    Expense Management
                                </h1>
                                <p className="text-lg text-muted-foreground mt-2">
                                    Create and manage the chapters of your financial story
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="bg-card border border-border rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        ${getMonthlySpending()?.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">This Month</div>
                                </div>
                                <div className="bg-card border border-border rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {expenses?.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Expenses</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="mb-8">
                        <div className="border-b border-border">
                            <nav className="flex space-x-8 overflow-x-auto">
                                {tabs?.map((tab) => (
                                    <button
                                        key={tab?.id}
                                        onClick={() => setActiveTab(tab?.id)}
                                        className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-narrative
                      ${activeTab === tab?.id
                                            ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                                        }
                    `}
                                    >
                                        <Icon name={tab?.icon} size={16} />
                                        <span>{tab?.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {renderTabContent()}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-12 bg-card border border-border rounded-lg p-6">
                        <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button
                                variant="outline"
                                onClick={() => navigate('/financial-story-timeline')}
                                iconName="BookOpen"
                                iconPosition="left"
                                className="justify-start"
                            >
                                View Financial Timeline
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/goal-setting-and-planning')}
                                iconName="Target"
                                iconPosition="left"
                                className="justify-start"
                            >
                                Review Goals Impact
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/dashboard')}
                                iconName="LayoutDashboard"
                                iconPosition="left"
                                className="justify-start"
                            >
                                Back to Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <QuickActionFloatingButton
                onExpenseAdded={handleExpenseAdded}
            />
        </div>
    );
};

export default ExpenseEntryAndManagement;