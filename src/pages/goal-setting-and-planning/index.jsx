import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';

// Import components
import GoalCard from './components/GoalCard';
import CreateGoalModal from './components/CreateGoalModal';
import GoalProgressModal from './components/GoalProgressModal';
import GoalCategoryFilter from './components/GoalCategoryFilter';
import GoalStatsOverview from './components/GoalStatsOverview';
import EditGoalModal from './components/EditGoalModal';

const GoalSettingAndPlanning = () => {
    const navigate = useNavigate();
    const [user] = useState({
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com"
    });

    const [goals, setGoals] = useState([
        {
            id: 1,
            title: "Emergency Fund",
            description: "Build a 6-month emergency fund for financial security",
            category: "emergency",
            icon: "Shield",
            targetAmount: 15000,
            currentAmount: 8500,
            progress: 56.7,
            targetDate: "2024-12-31",
            monthlyTarget: 1083.33,
            motivationMessage: "Peace of mind is priceless. This fund will protect my family from unexpected financial storms.",
            storyNarrative: "Building your financial safety net of $15,000 will give you peace of mind and security for unexpected life events.",
            milestones: [
                { percentage: 25, description: 'Great start!', achieved: true },
                { percentage: 50, description: 'Halfway there!', achieved: true },
                { percentage: 75, description: 'Almost done!', achieved: false },
                { percentage: 100, description: 'Goal achieved!', achieved: false }
            ],
            createdAt: "2024-01-15T10:00:00Z",
            progressHistory: [
                {
                    id: 1,
                    amount: 2000,
                    type: 'add',
                    note: 'Initial deposit',
                    date: '2024-01-15',
                    newTotal: 2000,
                    timestamp: '2024-01-15T10:00:00Z'
                },
                {
                    id: 2,
                    amount: 1500,
                    type: 'add',
                    note: 'Monthly savings',
                    date: '2024-02-15',
                    newTotal: 3500,
                    timestamp: '2024-02-15T10:00:00Z'
                }
            ]
        },
        {
            id: 2,
            title: "European Adventure",
            description: "Dream vacation to explore Europe for 3 weeks",
            category: "travel",
            icon: "Plane",
            targetAmount: 8000,
            currentAmount: 3200,
            progress: 40.0,
            targetDate: "2025-06-01",
            monthlyTarget: 685.71,
            motivationMessage: "Life is short, and the world is wide. This trip will create memories that last a lifetime.",
            storyNarrative: "Your dream adventure awaits! Save $8,000 to create unforgettable memories and explore new horizons.",
            milestones: [
                { percentage: 25, description: 'Great start!', achieved: true },
                { percentage: 50, description: 'Halfway there!', achieved: false },
                { percentage: 75, description: 'Almost done!', achieved: false },
                { percentage: 100, description: 'Goal achieved!', achieved: false }
            ],
            createdAt: "2024-03-01T10:00:00Z",
            progressHistory: []
        },
        {
            id: 3,
            title: "Home Down Payment",
            description: "Save for a 20% down payment on our first home",
            category: "home",
            icon: "Home",
            targetAmount: 60000,
            currentAmount: 22000,
            progress: 36.7,
            targetDate: "2026-03-01",
            monthlyTarget: 2375.00,
            motivationMessage: "Home is where love resides and memories are created. This investment is in our family\'s future.",
            storyNarrative: "Every dollar saved brings you closer to the keys of your dream home. Your future self will thank you for this $60,000 investment.",
            milestones: [
                { percentage: 25, description: 'Great start!', achieved: true },
                { percentage: 50, description: 'Halfway there!', achieved: false },
                { percentage: 75, description: 'Almost done!', achieved: false },
                { percentage: 100, description: 'Goal achieved!', achieved: false }
            ],
            createdAt: "2024-02-01T10:00:00Z",
            progressHistory: []
        },
        {
            id: 4,
            title: "Master\'s Degree",
            description: "Fund my MBA program at a top business school",
            category: "education",
            icon: "GraduationCap",
            targetAmount: 45000,
            currentAmount: 12000,
            progress: 26.7,
            targetDate: "2025-08-01",
            monthlyTarget: 4125.00,
            motivationMessage: "Education is the most powerful weapon to change the world and my career trajectory.",
            storyNarrative: "Investing in knowledge pays the best interest. Your $45,000 education goal is an investment in your future success.",
            milestones: [
                { percentage: 25, description: 'Great start!', achieved: true },
                { percentage: 50, description: 'Halfway there!', achieved: false },
                { percentage: 75, description: 'Almost done!', achieved: false },
                { percentage: 100, description: 'Goal achieved!', achieved: false }
            ],
            createdAt: "2024-01-01T10:00:00Z",
            progressHistory: []
        },
        {
            id: 5,
            title: "New Car Fund",
            description: "Save for a reliable family vehicle",
            category: "vehicle",
            icon: "Car",
            targetAmount: 25000,
            currentAmount: 25000,
            progress: 100.0,
            targetDate: "2024-09-01",
            monthlyTarget: 0,
            motivationMessage: "Reliable transportation means freedom and peace of mind for daily life.",
            storyNarrative: "Your reliable transportation solution is within reach. Save $25,000 for the vehicle that fits your lifestyle.",
            milestones: [
                { percentage: 25, description: 'Great start!', achieved: true },
                { percentage: 50, description: 'Halfway there!', achieved: true },
                { percentage: 75, description: 'Almost done!', achieved: true },
                { percentage: 100, description: 'Goal achieved!', achieved: true }
            ],
            createdAt: "2023-12-01T10:00:00Z",
            progressHistory: []
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [sortBy, setSortBy] = useState('progress');

    // Calculate goal counts by category
    const goalCounts = goals?.reduce((counts, goal) => {
        counts[goal.category] = (counts?.[goal?.category] || 0) + 1;
        return counts;
    }, {});

    // Filter goals by category
    const filteredGoals = selectedCategory === 'all'
        ? goals
        : goals?.filter(goal => goal?.category === selectedCategory);

    // Sort goals
    const sortedGoals = [...filteredGoals]?.sort((a, b) => {
        switch (sortBy) {
            case 'progress':
                return b?.progress - a?.progress;
            case 'amount':
                return b?.targetAmount - a?.targetAmount;
            case 'date':
                return new Date(a.targetDate) - new Date(b.targetDate);
            case 'name':
                return a?.title?.localeCompare(b?.title);
            default:
                return 0;
        }
    });

    const handleLogout = () => {
        navigate('/login');
    };

    const handleCreateGoal = (goalData) => {
        setGoals(prev => [...prev, goalData]);
    };

    const handleEditGoal = (goal) => {
        setSelectedGoal(goal);
        setIsEditModalOpen(true);
    };

    const handleUpdateGoal = (updatedGoal) => {
        setGoals(prev => prev?.map(goal =>
            goal?.id === updatedGoal?.id ? updatedGoal : goal
        ));
    };

    const handleDeleteGoal = (goalId) => {
        setGoals(prev => prev?.filter(goal => goal?.id !== goalId));
    };

    const handleUpdateProgress = (goal) => {
        setSelectedGoal(goal);
        setIsProgressModalOpen(true);
    };

    const handleProgressUpdate = (goalId, updateData) => {
        setGoals(prev => prev?.map(goal =>
            goal?.id === goalId ? { ...goal, ...updateData } : goal
        ));
    };

    const handleExpenseAdded = (expenseData) => {
        // Handle expense addition if needed
        console.log('Expense added:', expenseData);
    };

    const sortOptions = [
        { value: 'progress', label: 'Progress' },
        { value: 'amount', label: 'Target Amount' },
        { value: 'date', label: 'Target Date' },
        { value: 'name', label: 'Name' }
    ];

    return (
        <div className="min-h-screen bg-background">
            <AuthenticatedHeader user={user} onLogout={handleLogout} />
            <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <NavigationBreadcrumbs className="mb-4" />

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                                    Goal Setting & Planning
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Transform your dreams into achievable financial milestones with our storytelling approach
                                </p>
                            </div>

                            <Button
                                variant="default"
                                iconName="Plus"
                                iconPosition="left"
                                onClick={() => setIsCreateModalOpen(true)}
                                className="lg:w-auto w-full"
                            >
                                Create New Goal
                            </Button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="mb-8">
                        <GoalStatsOverview goals={goals} />
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar - Category Filter */}
                        <div className="lg:col-span-1">
                            <GoalCategoryFilter
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                goalCounts={goalCounts}
                            />
                        </div>

                        {/* Goals Grid */}
                        <div className="lg:col-span-3">
                            {/* Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <div className="flex items-center space-x-2">
                                    <Icon name="Filter" size={20} className="text-muted-foreground" />
                                    <span className="text-sm font-medium text-foreground">
                    {filteredGoals?.length} {filteredGoals?.length === 1 ? 'goal' : 'goals'}
                                        {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                  </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e?.target?.value)}
                                        className="text-sm border border-border rounded-md px-3 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {sortOptions?.map(option => (
                                            <option key={option?.value} value={option?.value}>
                                                {option?.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Goals Grid */}
                            {sortedGoals?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {sortedGoals?.map((goal) => (
                                        <GoalCard
                                            key={goal?.id}
                                            goal={goal}
                                            onEdit={handleEditGoal}
                                            onDelete={handleDeleteGoal}
                                            onUpdateProgress={handleUpdateProgress}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon name="Target" size={32} className="text-muted-foreground" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                                        No goals found
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        {selectedCategory === 'all'
                                            ? "Start your financial journey by creating your first goal."
                                            : `No goals found in the ${selectedCategory} category.`
                                        }
                                    </p>
                                    <Button
                                        variant="default"
                                        iconName="Plus"
                                        iconPosition="left"
                                        onClick={() => setIsCreateModalOpen(true)}
                                    >
                                        Create Your First Goal
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Motivational Section */}
                    {goals?.length > 0 && (
                        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
                            <div className="max-w-2xl mx-auto">
                                <Icon name="Star" size={48} className="text-primary mx-auto mb-4" />
                                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                                    Your Financial Story is Unfolding
                                </h2>
                                <p className="text-muted-foreground text-lg mb-6">
                                    Every goal you set is a chapter in your financial success story.
                                    Stay consistent, celebrate milestones, and watch your dreams become reality.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        variant="default"
                                        iconName="BookOpen"
                                        iconPosition="left"
                                        onClick={() => navigate('/financial-story-timeline')}
                                    >
                                        View My Story
                                    </Button>
                                    <Button
                                        variant="outline"
                                        iconName="BarChart3"
                                        iconPosition="left"
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        See Progress
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {/* Modals */}
            <CreateGoalModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreateGoal={handleCreateGoal}
            />
            <GoalProgressModal
                isOpen={isProgressModalOpen}
                onClose={() => setIsProgressModalOpen(false)}
                goal={selectedGoal}
                onUpdateProgress={handleProgressUpdate}
            />
            <EditGoalModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                goal={selectedGoal}
                onUpdateGoal={handleUpdateGoal}
                onDeleteGoal={handleDeleteGoal}
            />
            {/* Quick Action Button */}
            <QuickActionFloatingButton onExpenseAdded={handleExpenseAdded} />
        </div>
    );
};

export default GoalSettingAndPlanning;