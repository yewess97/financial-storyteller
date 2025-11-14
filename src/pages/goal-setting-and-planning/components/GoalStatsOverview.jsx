import React from 'react';
import Icon from '../../../components/AppIcon';

const GoalStatsOverview = ({ goals }) => {
    const calculateStats = () => {
        const totalGoals = goals?.length;
        const completedGoals = goals?.filter(goal => goal?.progress >= 100)?.length;
        const inProgressGoals = goals?.filter(goal => goal?.progress > 0 && goal?.progress < 100)?.length;
        const notStartedGoals = goals?.filter(goal => goal?.progress === 0)?.length;

        const totalTargetAmount = goals?.reduce((sum, goal) => sum + goal?.targetAmount, 0);
        const totalCurrentAmount = goals?.reduce((sum, goal) => sum + goal?.currentAmount, 0);
        const totalProgress = totalGoals > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

        const averageProgress = totalGoals > 0
            ? goals?.reduce((sum, goal) => sum + goal?.progress, 0) / totalGoals
            : 0;

        return {
            totalGoals,
            completedGoals,
            inProgressGoals,
            notStartedGoals,
            totalTargetAmount,
            totalCurrentAmount,
            totalProgress,
            averageProgress
        };
    };

    const stats = calculateStats();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })?.format(amount);
    };

    const statCards = [
        {
            title: 'Total Goals',
            value: stats?.totalGoals,
            icon: 'Target',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            description: 'Active financial goals'
        },
        {
            title: 'Completed',
            value: stats?.completedGoals,
            icon: 'CheckCircle',
            color: 'text-success',
            bgColor: 'bg-success/10',
            description: 'Goals achieved'
        },
        {
            title: 'In Progress',
            value: stats?.inProgressGoals,
            icon: 'Clock',
            color: 'text-warning',
            bgColor: 'bg-warning/10',
            description: 'Goals with progress'
        },
        {
            title: 'Not Started',
            value: stats?.notStartedGoals,
            icon: 'Circle',
            color: 'text-muted-foreground',
            bgColor: 'bg-muted',
            description: 'Goals to begin'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Goal Count Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards?.map((stat, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                                <Icon name={stat?.icon} size={20} className={stat?.color} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                                <p className="text-sm text-muted-foreground">{stat?.title}</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{stat?.description}</p>
                    </div>
                ))}
            </div>
            {/* Financial Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Total Progress */}
                <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name="TrendingUp" size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-lg text-foreground">
                                Overall Progress
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Combined progress across all goals
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">Total Saved</span>
                            <span className="text-lg font-bold text-foreground">
                {formatCurrency(stats?.totalCurrentAmount)}
              </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">Total Target</span>
                            <span className="text-lg font-bold text-foreground">
                {formatCurrency(stats?.totalTargetAmount)}
              </span>
                        </div>

                        <div className="w-full bg-muted rounded-full h-3">
                            <div
                                className="h-full bg-primary transition-all duration-500 rounded-full"
                                style={{ width: `${Math.min(stats?.totalProgress, 100)}%` }}
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium text-primary">
                {stats?.totalProgress?.toFixed(1)}%
              </span>
                        </div>
                    </div>
                </div>

                {/* Average Performance */}
                <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                            <Icon name="BarChart3" size={20} className="text-secondary" />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-lg text-foreground">
                                Performance Metrics
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Your goal achievement insights
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">Average Progress</span>
                            <span className="text-lg font-bold text-secondary">
                {stats?.averageProgress?.toFixed(1)}%
              </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">Completion Rate</span>
                            <span className="text-lg font-bold text-success">
                {stats?.totalGoals > 0 ? ((stats?.completedGoals / stats?.totalGoals) * 100)?.toFixed(1) : 0}%
              </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">Remaining Amount</span>
                            <span className="text-lg font-bold text-warning">
                {formatCurrency(stats?.totalTargetAmount - stats?.totalCurrentAmount)}
              </span>
                        </div>

                        {/* Motivational Message */}
                        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mt-4">
                            <div className="flex items-start space-x-2">
                                <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-accent-foreground">
                                    {stats?.averageProgress >= 75
                                        ? "Excellent progress! You're on track to achieve your financial dreams."
                                        : stats?.averageProgress >= 50
                                            ? "Good momentum! Keep up the consistent effort to reach your goals."
                                            : stats?.averageProgress >= 25
                                                ? "You've made a start! Small steps lead to big achievements." :"Every journey begins with a single step. Start building your financial future today!"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalStatsOverview;