import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineSummaryCard = ({ summaryData, onNavigateToGoals, onNavigateToExpenses }) => {
    const formatCurrency = (amount) => {
        return Math.abs(amount)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return 'bg-success';
        if (percentage >= 60) return 'bg-accent';
        if (percentage >= 40) return 'bg-warning';
        return 'bg-error';
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Icon name="BarChart3" size={24} className="text-primary-foreground" />
                    </div>

                    <div>
                        <h2 className="font-heading font-bold text-xl text-foreground">
                            Your Financial Story Summary
                        </h2>
                        <p className="text-muted-foreground">
                            {summaryData?.period} • {summaryData?.totalEvents} financial events
                        </p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    iconName="TrendingUp"
                    iconPosition="left"
                >
                    View Trends
                </Button>
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-success mb-1">
                        +{formatCurrency(summaryData?.totalIncome)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Income</div>
                    <div className="flex items-center justify-center mt-2">
                        <Icon name="TrendingUp" size={14} className="text-success mr-1" />
                        <span className="text-xs text-success">+{summaryData?.incomeGrowth}%</span>
                    </div>
                </div>

                <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-error mb-1">
                        -{formatCurrency(summaryData?.totalExpenses)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Expenses</div>
                    <div className="flex items-center justify-center mt-2">
                        <Icon name="TrendingDown" size={14} className="text-error mr-1" />
                        <span className="text-xs text-error">+{summaryData?.expenseGrowth}%</span>
                    </div>
                </div>

                <div className="bg-muted rounded-lg p-4 text-center">
                    <div className={`text-2xl font-bold mb-1 ${summaryData?.netSavings >= 0 ? 'text-success' : 'text-error'}`}>
                        {summaryData?.netSavings >= 0 ? '+' : ''}{formatCurrency(summaryData?.netSavings)}
                    </div>
                    <div className="text-sm text-muted-foreground">Net Savings</div>
                    <div className="flex items-center justify-center mt-2">
                        <Icon name="PiggyBank" size={14} className="text-primary mr-1" />
                        <span className="text-xs text-muted-foreground">{summaryData?.savingsRate}% rate</span>
                    </div>
                </div>

                <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                        {summaryData?.milestones}
                    </div>
                    <div className="text-sm text-muted-foreground">Milestones</div>
                    <div className="flex items-center justify-center mt-2">
                        <Icon name="Trophy" size={14} className="text-accent mr-1" />
                        <span className="text-xs text-accent">+{summaryData?.newMilestones} new</span>
                    </div>
                </div>
            </div>
            {/* Story Narrative */}
            <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-3">
                    <Icon name="BookOpen" size={18} className="text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">Your Story This Period</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                    {summaryData?.storyNarrative}
                </p>

                <div className="flex flex-wrap gap-2">
                    {summaryData?.storyTags?.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs rounded-md"
                        >
              {tag}
            </span>
                    ))}
                </div>
            </div>
            {/* Goal Progress */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-semibold text-foreground">Goal Progress</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onNavigateToGoals}
                        iconName="Target"
                        iconPosition="left"
                    >
                        Manage Goals
                    </Button>
                </div>

                <div className="space-y-3">
                    {summaryData?.goalProgress?.map((goal, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">{goal?.name}</span>
                                    <span className="text-sm text-muted-foreground">
                    {formatCurrency(goal?.current)} / {formatCurrency(goal?.target)}
                  </span>
                                </div>

                                <div className="w-full bg-border rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-narrative ${getProgressColor(goal?.percentage)}`}
                                        style={{ width: `${Math.min(goal?.percentage, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm font-semibold text-foreground">{goal?.percentage}%</div>
                                <div className="text-xs text-muted-foreground">{goal?.timeLeft}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="default"
                    size="sm"
                    onClick={onNavigateToExpenses}
                    iconName="Plus"
                    iconPosition="left"
                >
                    Add Expense
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    iconName="Share2"
                    iconPosition="left"
                >
                    Share Story
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                >
                    Export Data
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                >
                    Customize
                </Button>
            </div>
        </div>
    );
};

export default TimelineSummaryCard;