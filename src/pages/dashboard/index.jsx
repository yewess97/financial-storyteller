import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import ChapterCard from './components/ChapterCard';
import MonthlyNarrativeSummary from './components/MonthlyNarrativeSummary';
import FinancialAlertCard from './components/FinancialAlertCard';
import QuickActionPanel from './components/QuickActionPanel';
import FinancialMetricsGrid from './components/FinancialMetricsGrid';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Mock user data
    const mockUser = {
        id: 1,
        name: "Yousif Shrouk Youstina Mayar",
        email: "nextteam@email.com",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11b715d60-1762273834012.png",
        avatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer"
    };

    // Mock monthly narrative summary
    const monthlyNarrativeSummary = {
        title: "November 2025 Financial Journey",
        period: "November 1-9, 2025",
        mood: "good",
        score: 78,
        narrative: `This month has been a story of steady progress and mindful spending. You've successfully maintained your budget discipline while making strategic investments in your future. Your emergency fund has grown by 12%, and you've reduced dining out expenses by 25% compared to last month. The journey toward your vacation savings goal is ahead of schedule, showing your commitment to financial wellness.`,
        achievements: [
            "Stayed within budget for 8 consecutive days",
            "Increased emergency fund by $450",
            "Reduced unnecessary subscriptions by $35/month",
            "Met 85% of weekly savings targets"],

        challenges: [
            "Transportation costs exceeded budget by 15%",
            "Impulse purchases increased in week 2",
            "Investment portfolio needs rebalancing",
            "Healthcare expenses require better planning"],

        insight: "Small consistent actions create powerful financial momentum. Your disciplined approach this month is building the foundation for long-term wealth.",
        visualization: {
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
            alt: "Modern financial dashboard showing upward trending graphs and charts on computer screen",
            metric: "$2,847",
            description: "Net positive cash flow this month"
        }
    };

    // Mock financial chapters
    const financialChapters = [
        {
            id: 'past',
            type: 'past',
            title: 'Your Financial Past',
            period: 'January - October 2025',
            progress: 85,
            narrative: `Your financial journey began with determination and has evolved into a story of growth and learning. From paying off $3,200 in credit card debt to building your first emergency fund, you've transformed challenges into stepping stones. Each month brought new lessons about budgeting, saving, and the power of compound interest.`,
            metrics: [
                { label: 'Debt Paid Off', value: '$3,200' },
                { label: 'Savings Built', value: '$5,800' }],

            highlights: [
                "Eliminated all high-interest credit card debt",
                "Built emergency fund covering 3 months expenses",
                "Established consistent saving habits",
                "Learned investment fundamentals"],

            visualization: {
                image: "https://images.unsplash.com/photo-1712640183722-ec59693f7c82",
                alt: "Person reviewing financial documents and charts showing debt reduction progress",
                caption: "The journey from debt to financial stability"
            }
        },
        {
            id: 'present', type: 'present', title: 'Your Current Chapter', period: 'November 2025', progress: 72, narrative: `Right now, you're in the momentum phase of your financial story. Your disciplined approach is paying dividends, with consistent savings and smart spending choices. This month represents a turning point where financial wellness becomes a natural part of your lifestyle rather than a struggle.`,
            metrics: [
                { label: 'Monthly Income', value: '$4,200' },
                { label: 'Expenses', value: '$2,950' }],

            highlights: [
                "Maintaining 30% savings rate consistently",
                "Emergency fund fully funded at $8,400",
                "Investment portfolio growing steadily",
                "Budget adherence at 85% success rate"],

            visualization: {
                image: "https://images.unsplash.com/photo-1711606706060-52ea35a489dd",
                alt: "Modern workspace with financial planning tools, calculator, and growth charts displayed",
                caption: "Current financial stability and growth"
            }
        },
        {
            id: 'future',
            type: 'future',
            title: 'Your Financial Future',
            period: 'December 2025 - Beyond',
            progress: 45,
            narrative: `The next chapters of your financial story are filled with exciting possibilities. With your strong foundation, you're positioned to achieve major milestones: homeownership, investment growth, and financial independence. Your future self will thank you for the disciplined choices you're making today.`,
            metrics: [
                { label: 'Goal Progress', value: '45%' },
                { label: 'Target Date', value: 'Dec 2026' }],

            highlights: [
                "House down payment goal: 45% complete",
                "Retirement savings on track for early retirement",
                "Investment portfolio projected 8% annual growth",
                "Financial independence timeline: 15 years"],

            visualization: {
                image: "https://images.unsplash.com/photo-1714359578416-f27d1062e5a1",
                alt: "Beautiful modern home with landscaped garden representing future homeownership goals",
                caption: "Your future home and financial dreams"
            }
        }];


    // Mock financial alerts
    const mockAlerts = [
        {
            id: 1,
            type: 'milestone',
            title: 'Savings Milestone Achieved!',
            message: 'Congratulations! You\'ve reached 75% of your emergency fund goal. Your financial security is getting stronger with each contribution.',
            context: 'Emergency fund target: $10,000 | Current: $7,500',
            timestamp: new Date(Date.now() - 300000),
            actions: [
                { label: 'View Progress', icon: 'TrendingUp', primary: true },
                { label: 'Adjust Goal', icon: 'Target' }]

        },
        {
            id: 2,
            type: 'warning',
            title: 'Budget Alert: Transportation',
            message: 'Your transportation spending is 15% over budget this month. Consider carpooling or using public transit to get back on track.',
            context: 'Budget: $300 | Spent: $345 | Remaining: -$45',
            timestamp: new Date(Date.now() - 1800000),
            actions: [
                { label: 'Review Expenses', icon: 'Receipt', primary: true },
                { label: 'Adjust Budget', icon: 'Edit' }]

        },
        {
            id: 3,
            type: 'goal',
            title: 'Vacation Fund Progress',
            message: 'You\'re ahead of schedule! Your vacation fund has reached $1,200, putting you 20% ahead of your timeline.',
            context: 'Target: $2,000 by March 2025',
            progress: 60,
            timestamp: new Date(Date.now() - 3600000),
            actions: [
                { label: 'View Timeline', icon: 'Calendar', primary: true }]

        }];


    // Mock financial metrics
    const financialMetrics = [
        {
            type: 'income',
            label: 'Monthly Income',
            value: '$4,200',
            trend: 'positive',
            change: '+5.2%',
            description: 'Steady growth from salary increase and side projects',
            progress: 85
        },
        {
            type: 'expenses',
            label: 'Monthly Expenses',
            value: '$2,950',
            trend: 'neutral',
            change: '+2.1%',
            description: 'Well-controlled spending within budget parameters',
            progress: 70
        },
        {
            type: 'savings',
            label: 'Total Savings',
            value: '$8,400',
            trend: 'positive',
            change: '+12.3%',
            description: 'Emergency fund fully funded, building investment capital',
            progress: 90
        },
        {
            type: 'investments',
            label: 'Investment Portfolio',
            value: '$3,650',
            trend: 'positive',
            change: '+8.7%',
            description: 'Diversified portfolio showing steady growth',
            progress: 65
        },
        {
            type: 'budget',
            label: 'Budget Adherence',
            value: '85%',
            trend: 'positive',
            change: '+3%',
            description: 'Consistent improvement in budget discipline',
            progress: 85
        },
        {
            type: 'debt',
            label: 'Remaining Debt',
            value: '$0',
            trend: 'positive',
            change: '-100%',
            description: 'All high-interest debt successfully eliminated',
            progress: 100,
            subtitle: 'Debt-free achievement unlocked!'
        }];


    useEffect(() => {
        // Simulate loading user data
        const loadUserData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUser(mockUser);
                setAlerts(mockAlerts);
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    const handleChapterDetails = (chapter) => {
        if (chapter?.type === 'present' || chapter?.type === 'past') {
            navigate('/financial-story-timeline');
        } else {
            navigate('/goal-setting-and-planning');
        }
    };

    const handleAlertDismiss = (alertId) => {
        setAlerts((prev) => prev?.filter((alert) => alert?.id !== alertId));
    };

    const handleAlertAction = (alertId, action) => {
        console.log('Alert action:', alertId, action);
        // Handle specific alert actions
        if (action?.label === 'View Progress') {
            navigate('/financial-story-timeline');
        } else if (action?.label === 'Review Expenses') {
            navigate('/expense-entry-and-management');
        } else if (action?.label === 'Adjust Goal') {
            navigate('/goal-setting-and-planning');
        }
    };

    const handleQuickExpense = () => {
        // This will be handled by the floating button
        console.log('Quick expense triggered');
    };

    const handleExpenseAdded = (expenseData) => {
        console.log('New expense added:', expenseData);
        // Update relevant state or refresh data
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <AuthenticatedHeader user={mockUser} onLogout={handleLogout} />
                <div className="pt-16 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading your financial story...</p>
                    </div>
                </div>
            </div>);

    }

    return (
        <div className="min-h-screen bg-background">
            <AuthenticatedHeader user={user} onLogout={handleLogout} />
            <main className="pt-16">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Breadcrumbs */}
                    <NavigationBreadcrumbs className="mb-6" />

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                            Welcome back, {user?.name?.split(' ')?.[0] || 'User'}! 👋
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Your financial story continues to unfold beautifully. Here's what's happening in your journey.
                        </p>
                    </div>

                    {/* Monthly Narrative Summary */}
                    <MonthlyNarrativeSummary
                        summary={monthlyNarrativeSummary}
                        className="mb-8" />


                    {/* Financial Metrics Grid */}
                    <div className="mb-8">
                        <h2 className="font-heading font-semibold text-xl text-foreground mb-4 flex items-center space-x-2">
                            <Icon name="BarChart3" size={20} className="text-primary" />
                            <span>Financial Health Snapshot</span>
                        </h2>
                        <FinancialMetricsGrid metrics={financialMetrics} />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        {/* Story Chapters */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="font-heading font-semibold text-xl text-foreground flex items-center space-x-2">
                                <Icon name="BookOpen" size={20} className="text-primary" />
                                <span>Your Financial Story Chapters</span>
                            </h2>

                            <div className="space-y-6">
                                {financialChapters?.map((chapter) =>
                                    <ChapterCard
                                        key={chapter?.id}
                                        chapter={chapter}
                                        onViewDetails={handleChapterDetails} />

                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <QuickActionPanel onQuickExpense={handleQuickExpense} />

                            {/* Financial Alerts */}
                            {alerts?.length > 0 &&
                                <div className="bg-card border border-border rounded-lg shadow-warm">
                                    <div className="p-6 border-b border-border">
                                        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center space-x-2">
                                            <Icon name="Bell" size={20} className="text-primary" />
                                            <span>Financial Alerts</span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Stay informed about your financial progress
                                        </p>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {alerts?.map((alert) =>
                                            <FinancialAlertCard
                                                key={alert?.id}
                                                alert={alert}
                                                onDismiss={handleAlertDismiss}
                                                onAction={handleAlertAction} />

                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Motivational Footer */}
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 text-center">
                        <Icon name="Sparkles" size={24} className="text-primary mx-auto mb-3" />
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                            Your Financial Journey is Inspiring! ✨
                        </h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Every dollar saved, every goal achieved, and every wise decision you make is writing a beautiful story of financial success.
                            Keep going - your future self will thank you for the choices you're making today.
                        </p>
                    </div>
                </div>
            </main>
            {/* Quick Action Floating Button */}
            <QuickActionFloatingButton onExpenseAdded={handleExpenseAdded} />
        </div>);

};

export default Dashboard;