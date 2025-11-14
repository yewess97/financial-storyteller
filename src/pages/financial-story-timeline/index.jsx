import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import TimelineFilter from './components/TimelineFilter';
import TimelineNode from './components/TimelineNode';
import TimelineControls from './components/TimelineControls';
import StoryChapterCard from './components/StoryChapterCard';
import TimelineSummaryCard from './components/TimelineSummaryCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FinancialStoryTimeline = () => {
    const navigate = useNavigate();
    const [user] = useState({
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com"
    });

    const [filters, setFilters] = useState({
        category: 'all',
        timeRange: 'month',
        storyTheme: 'all',
        amountRange: 'all',
        showMilestones: false
    });

    const [currentView, setCurrentView] = useState('weekly');
    const [expandedEventId, setExpandedEventId] = useState(null);
    const [activeChapterId, setActiveChapterId] = useState('current');

    // Mock timeline events data
    const timelineEvents = [
        {
            id: 1,
            date: "2024-11-09",
            title: "Morning Coffee & Productivity Boost",
            category: "food",
            type: "expense",
            amount: 4.75,
            storyText: `Started your Saturday with a perfect cappuccino at Corner Café. This small ritual has become part of your weekend routine, setting a positive tone for productive days ahead.`,
            location: "Corner Café, Downtown",
            paymentMethod: "Credit Card",
            tags: ["routine", "weekend", "productivity"],
            insights: "Your weekend coffee spending averages $15/week, which aligns well with your entertainment budget allocation.",
            isMilestone: false
        },
        {
            id: 2,
            date: "2024-11-08",
            title: "Grocery Shopping Success Story",
            category: "food",
            type: "expense",
            amount: 127.43,
            storyText: `A well-planned grocery trip that stayed within budget! You successfully used your shopping list and avoided impulse purchases, demonstrating growing financial discipline.`,
            location: "Fresh Market",
            paymentMethod: "Debit Card",
            tags: ["budgeting", "planning", "success"],
            insights: "You\'ve reduced grocery spending by 15% this month through better planning and list-making.",
            isMilestone: true
        },
        {
            id: 3,
            date: "2024-11-07",
            title: "Freelance Project Payment Received",
            category: "income",
            type: "income",
            amount: 850.00,
            storyText: `Excellent news! Your web design project payment came through ahead of schedule. This extra income brings you closer to your emergency fund goal and validates your side hustle strategy.`,
            location: "Bank Transfer",
            paymentMethod: "Direct Deposit",
            tags: ["freelance", "achievement", "goal-progress"],
            insights: "This freelance income represents 23% of your monthly target for side earnings. You\'re building a strong secondary income stream.",
            isMilestone: true
        },
        {
            id: 4,
            date: "2024-11-06",
            title: "Monthly Gym Membership Investment",
            category: "healthcare",
            type: "expense",
            amount: 45.00,
            storyText: `Your monthly fitness investment renewed automatically. This consistent commitment to health represents a smart long-term investment in your wellbeing and future healthcare savings.`,
            location: "FitLife Gym",
            paymentMethod: "Auto-pay",
            tags: ["health", "investment", "routine"],
            insights: "Regular exercise can reduce healthcare costs by up to 30% over time, making this a financially smart choice.",
            isMilestone: false
        },
        {
            id: 5,
            date: "2024-11-05",
            title: "Emergency Fund Milestone Achieved!",
            category: "savings",
            type: "savings",
            amount: 500.00,
            storyText: `Congratulations! You've reached your $5,000 emergency fund goal three months ahead of schedule. This achievement represents months of disciplined saving and smart financial choices.`,
            location: "High-Yield Savings Account",
            paymentMethod: "Auto Transfer",
            tags: ["milestone", "achievement", "emergency-fund"],
            insights: "Reaching this goal puts you ahead of 60% of Americans who don't have adequate emergency savings. Excellent financial progress!",
            isMilestone: true
        },
        {
            id: 6,
            date: "2024-11-04",title: "Movie Night Entertainment",category: "entertainment",type: "expense",
            amount: 28.50,
            storyText: `Enjoyed a relaxing movie night with friends. You chose the matinee showing and shared snacks, demonstrating how you can enjoy entertainment while staying budget-conscious.`,
            location: "Cinema Plaza",paymentMethod: "Credit Card",
            tags: ["social", "entertainment", "budget-friendly"],
            insights: "Your entertainment spending this month is 20% below budget, leaving room for additional social activities.",
            isMilestone: false
        }
    ];

    // Mock story chapters data
    const storyChapters = [
        {
            id: 'past',
            title: 'Foundation Building',
            type: 'past',
            period: 'Jan - Aug 2024',
            summary: `The beginning of your financial transformation journey. You established emergency savings, created your first budget, and began tracking expenses systematically.`,
            eventCount: 156,
            totalAmount: 2340.50,
            highlights: [
                'Built first emergency fund',
                'Reduced dining out by 40%',
                'Started freelance income stream',
                'Paid off credit card debt'
            ],
            isNew: false
        },
        {
            id: 'current',
            title: 'Growth & Optimization',
            type: 'present',
            period: 'Sep - Nov 2024',
            summary: `Your current chapter focuses on optimizing spending habits and accelerating savings. You've achieved major milestones and are building momentum toward bigger goals.`,
            eventCount: 89,
            totalAmount: 1875.25,
            highlights: [
                'Emergency fund goal achieved','Freelance income increased 35%','Investment account opened','Vacation fund started'
            ],
            isNew: true
        },
        {
            id: 'future',title: 'Wealth Building',type: 'future',period: 'Dec 2024 - Beyond',
            summary: `The next chapter of your financial story focuses on investment growth, property ownership goals, and building long-term wealth for financial independence.`,
            eventCount: 0,
            totalAmount: 0,
            highlights: [
                'House down payment goal','Investment portfolio growth','Retirement planning optimization','Multiple income streams'
            ],
            isNew: false
        }
    ];

    // Mock summary data
    const summaryData = {
        period: "November 2024",
        totalEvents: 47,
        totalIncome: 3250.00,
        totalExpenses: 2180.75,
        netSavings: 1069.25,
        incomeGrowth: 12,
        expenseGrowth: 8,
        savingsRate: 33,
        milestones: 3,
        newMilestones: 2,
        storyNarrative: `November has been a remarkable month in your financial journey! You've successfully balanced enjoying life with smart financial decisions. Your emergency fund milestone achievement shows incredible discipline, while your growing freelance income demonstrates entrepreneurial success. The key theme this month has been 'balanced growth' - you're saving aggressively while still investing in experiences and health.`,
        storyTags: ['Achievement', 'Balance', 'Growth', 'Discipline', 'Success'],
        goalProgress: [
            {
                name: 'Emergency Fund',
                current: 5000,
                target: 5000,
                percentage: 100,
                timeLeft: 'Completed!'
            },
            {
                name: 'Vacation Fund',
                current: 1200,
                target: 2500,
                percentage: 48,
                timeLeft: '4 months'
            },
            {
                name: 'Investment Account',
                current: 750,
                target: 1000,
                percentage: 75,
                timeLeft: '2 months'
            }
        ]
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleNodeClick = (eventId) => {
        setExpandedEventId(expandedEventId === eventId ? null : eventId);
    };

    const handleChapterClick = (chapterId) => {
        setActiveChapterId(chapterId);
    };

    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    const handleZoomIn = () => {
        const zoomOrder = ['yearly', 'monthly', 'weekly', 'daily'];
        const currentIndex = zoomOrder?.indexOf(currentView);
        if (currentIndex < zoomOrder?.length - 1) {
            setCurrentView(zoomOrder?.[currentIndex + 1]);
        }
    };

    const handleZoomOut = () => {
        const zoomOrder = ['yearly', 'monthly', 'weekly', 'daily'];
        const currentIndex = zoomOrder?.indexOf(currentView);
        if (currentIndex > 0) {
            setCurrentView(zoomOrder?.[currentIndex - 1]);
        }
    };

    const handleExport = () => {
        // Mock export functionality
        alert('Your financial story has been exported successfully!');
    };

    const handleExpenseAdded = (expenseData) => {
        // Mock expense addition
        console.log('New expense added:', expenseData);
    };

    const canZoomIn = currentView !== 'daily';
    const canZoomOut = currentView !== 'yearly';

    // Filter events based on active filters
    const filteredEvents = timelineEvents?.filter(event => {
        if (filters?.category !== 'all' && event?.category !== filters?.category) return false;
        if (filters?.storyTheme !== 'all') {
            // Mock theme filtering logic
            if (filters?.storyTheme === 'achievements' && !event?.isMilestone) return false;
            if (filters?.storyTheme === 'milestones' && !event?.isMilestone) return false;
        }
        if (filters?.showMilestones && !event?.isMilestone) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-background">
            <AuthenticatedHeader user={user} onLogout={handleLogout} />
            <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
                    {/* Breadcrumbs */}
                    <NavigationBreadcrumbs className="mb-6" />

                    {/* Page Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                                Your Financial Story Timeline
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Discover the narrative behind your financial journey through interactive storytelling
                            </p>
                        </div>

                        <Button
                            variant="default"
                            onClick={() => navigate('/dashboard')}
                            iconName="LayoutDashboard"
                            iconPosition="left"
                        >
                            Back to Dashboard
                        </Button>
                    </div>

                    {/* Story Chapters */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-2 mb-4">
                            <Icon name="BookOpen" size={24} className="text-primary" />
                            <h2 className="font-heading font-bold text-xl text-foreground">
                                Story Chapters
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {storyChapters?.map((chapter) => (
                                <StoryChapterCard
                                    key={chapter?.id}
                                    chapter={chapter}
                                    onChapterClick={handleChapterClick}
                                    isActive={activeChapterId === chapter?.id}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Timeline Summary */}
                    <TimelineSummaryCard
                        summaryData={summaryData}
                        onNavigateToGoals={() => navigate('/goal-setting-and-planning')}
                        onNavigateToExpenses={() => navigate('/expense-entry-and-management')}
                    />

                    {/* Timeline Filters */}
                    <TimelineFilter
                        onFilterChange={handleFilterChange}
                        activeFilters={filters}
                    />

                    {/* Timeline Controls */}
                    <TimelineControls
                        currentView={currentView}
                        onViewChange={handleViewChange}
                        onZoomIn={handleZoomIn}
                        onZoomOut={handleZoomOut}
                        onExport={handleExport}
                        canZoomIn={canZoomIn}
                        canZoomOut={canZoomOut}
                    />

                    {/* Timeline Content */}
                    <div className="bg-card border border-border rounded-lg p-6">
                        {filteredEvents?.length === 0 ? (
                            <div className="text-center py-12">
                                <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                                    No Events Found
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Try adjusting your filters to see more of your financial story.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => setFilters({
                                        category: 'all',
                                        timeRange: 'all',
                                        storyTheme: 'all',
                                        amountRange: 'all',
                                        showMilestones: false
                                    })}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-0">
                                {filteredEvents?.map((event, index) => (
                                    <TimelineNode
                                        key={event?.id}
                                        event={event}
                                        isLast={index === filteredEvents?.length - 1}
                                        onNodeClick={handleNodeClick}
                                        isExpanded={expandedEventId === event?.id}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Load More Button */}
                    {filteredEvents?.length > 0 && (
                        <div className="text-center mt-6">
                            <Button
                                variant="outline"
                                iconName="ChevronDown"
                                iconPosition="right"
                            >
                                Load Earlier Events
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            {/* Quick Action Floating Button */}
            <QuickActionFloatingButton onExpenseAdded={handleExpenseAdded} />
        </div>
    );
};

export default FinancialStoryTimeline;