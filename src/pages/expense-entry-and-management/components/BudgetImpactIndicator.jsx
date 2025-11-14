import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetImpactIndicator = ({ currentExpenses, budgetLimits, newExpenseAmount, category }) => {
    const calculateImpact = () => {
        if (!newExpenseAmount || !category || !budgetLimits?.[category]) {
            return null;
        }

        const currentSpent = currentExpenses?.filter(exp => exp?.category === category)?.reduce((sum, exp) => sum + exp?.amount, 0);

        const budget = budgetLimits?.[category];
        const newTotal = currentSpent + parseFloat(newExpenseAmount);
        const percentageUsed = (newTotal / budget) * 100;
        const remainingBudget = budget - newTotal;

        return {
            currentSpent,
            budget,
            newTotal,
            percentageUsed,
            remainingBudget,
            isOverBudget: newTotal > budget
        };
    };

    const impact = calculateImpact();

    if (!impact) {
        return null;
    }

    const getImpactColor = () => {
        if (impact?.isOverBudget) return 'text-error';
        if (impact?.percentageUsed > 80) return 'text-warning';
        if (impact?.percentageUsed > 60) return 'text-accent';
        return 'text-success';
    };

    const getImpactIcon = () => {
        if (impact?.isOverBudget) return 'AlertTriangle';
        if (impact?.percentageUsed > 80) return 'AlertCircle';
        return 'TrendingUp';
    };

    const getStoryNarrative = () => {
        if (impact?.isOverBudget) {
            const overAmount = Math.abs(impact?.remainingBudget);
            return `This expense would take you $${overAmount?.toFixed(2)} over your budget, adding an unexpected twist to this month's financial story.`;
        }

        if (impact?.percentageUsed > 90) {
            return `You're approaching the climax of this category's budget story - only $${impact?.remainingBudget?.toFixed(2)} remaining.`;
        }

        if (impact?.percentageUsed > 70) {
            return `This expense moves your story into the rising action phase, with $${impact?.remainingBudget?.toFixed(2)} left for this category.`;
        }

        return `A comfortable addition to your financial narrative, leaving $${impact?.remainingBudget?.toFixed(2)} for future chapters in this category.`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(amount);
    };

    return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-warm-sm">
            <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    impact?.isOverBudget ? 'bg-error/10' :
                        impact?.percentageUsed > 80 ? 'bg-warning/10' : 'bg-success/10'
                }`}>
                    <Icon
                        name={getImpactIcon()}
                        size={16}
                        className={getImpactColor()}
                    />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">Budget Impact</h4>
                        <span className={`text-sm font-medium ${getImpactColor()}`}>
              {impact?.percentageUsed?.toFixed(1)}% used
            </span>
                    </div>

                    <div className="space-y-2">
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-full transition-narrative rounded-full ${
                                    impact?.isOverBudget ? 'bg-error' :
                                        impact?.percentageUsed > 80 ? 'bg-warning' :
                                            impact?.percentageUsed > 60 ? 'bg-accent' : 'bg-success'
                                }`}
                                style={{ width: `${Math.min(impact?.percentageUsed, 100)}%` }}
                            />
                        </div>

                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Spent: {formatCurrency(impact?.currentSpent)}</span>
                            <span>Budget: {formatCurrency(impact?.budget)}</span>
                        </div>

                        <div className="text-sm">
                            <span className="text-muted-foreground">After this expense: </span>
                            <span className={`font-medium ${getImpactColor()}`}>
                {formatCurrency(impact?.newTotal)}
              </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-2">
                    <Icon name="BookOpen" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                        {getStoryNarrative()}
                    </p>
                </div>
            </div>
            {impact?.isOverBudget && (
                <div className="mt-3 p-3 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                        <Icon name="AlertTriangle" size={14} className="text-error mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                            <p className="text-error font-medium mb-1">Budget Exceeded</p>
                            <p className="text-muted-foreground">
                                Consider adjusting this expense or reallocating from another category to keep your financial story on track.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetImpactIndicator;