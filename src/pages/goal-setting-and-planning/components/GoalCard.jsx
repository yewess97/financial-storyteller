import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const GoalCard = ({ goal, onEdit, onDelete, onUpdateProgress }) => {
    const [showDetails, setShowDetails] = useState(false);

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'text-success';
        if (progress >= 50) return 'text-warning';
        return 'text-primary';
    };

    const getProgressBgColor = (progress) => {
        if (progress >= 80) return 'bg-success';
        if (progress >= 50) return 'bg-warning';
        return 'bg-primary';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(amount);
    };

    const calculateTimeRemaining = (targetDate) => {
        const now = new Date();
        const target = new Date(targetDate);
        const diffTime = target - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due today';
        if (diffDays === 1) return '1 day left';
        if (diffDays < 30) return `${diffDays} days left`;
        if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months left`;
        return `${Math.ceil(diffDays / 365)} years left`;
    };

    return (
        <div className="bg-card border border-border rounded-lg shadow-warm hover:shadow-warm-lg transition-narrative overflow-hidden">
            {/* Goal Header */}
            <div className="relative">
                <div className="h-32 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-center">
                        <Icon name={goal?.icon} size={32} className="text-primary mx-auto mb-2" />
                        <h3 className="font-heading font-semibold text-lg text-foreground">{goal?.title}</h3>
                    </div>
                </div>

                {/* Progress Badge */}
                <div className="absolute top-4 right-4 bg-card border border-border rounded-full px-3 py-1">
          <span className={`text-sm font-medium ${getProgressColor(goal?.progress)}`}>
            {goal?.progress}%
          </span>
                </div>
            </div>
            {/* Goal Content */}
            <div className="p-6">
                {/* Story Narrative */}
                <div className="mb-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {goal?.storyNarrative}
                    </p>
                </div>

                {/* Progress Visualization */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">Progress</span>
                        <span className="text-sm text-muted-foreground">
              {formatCurrency(goal?.currentAmount)} / {formatCurrency(goal?.targetAmount)}
            </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                            className={`h-full ${getProgressBgColor(goal?.progress)} transition-all duration-500 ease-out rounded-full`}
                            style={{ width: `${Math.min(goal?.progress, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Goal Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Target Date</p>
                        <p className="text-sm font-medium text-foreground">{goal?.targetDate}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Time Remaining</p>
                        <p className="text-sm font-medium text-foreground">
                            {calculateTimeRemaining(goal?.targetDate)}
                        </p>
                    </div>
                </div>

                {/* Motivation Message */}
                {goal?.motivationMessage && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
                        <div className="flex items-start space-x-2">
                            <Icon name="Heart" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-accent-foreground italic">
                                "{goal?.motivationMessage}"
                            </p>
                        </div>
                    </div>
                )}

                {/* Milestone Indicators */}
                {goal?.milestones && goal?.milestones?.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Milestones</p>
                        <div className="flex space-x-2">
                            {goal?.milestones?.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`
                    w-3 h-3 rounded-full border-2 transition-narrative
                    ${milestone?.achieved
                                        ? 'bg-success border-success' :'bg-muted border-border'
                                    }
                  `}
                                    title={`${milestone?.percentage}% - ${milestone?.description}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        iconName="Edit"
                        iconPosition="left"
                        onClick={() => onEdit(goal)}
                        className="flex-1"
                    >
                        Edit Goal
                    </Button>

                    <Button
                        variant="default"
                        size="sm"
                        iconName="Plus"
                        iconPosition="left"
                        onClick={() => onUpdateProgress(goal)}
                        className="flex-1"
                    >
                        Add Progress
                    </Button>
                </div>

                {/* Expandable Details */}
                {showDetails && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Category</p>
                                <p className="text-sm text-foreground">{goal?.category}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Monthly Target</p>
                                <p className="text-sm text-foreground">{formatCurrency(goal?.monthlyTarget)}</p>
                            </div>

                            {goal?.description && (
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Description</p>
                                    <p className="text-sm text-foreground">{goal?.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Toggle Details Button */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full mt-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-narrative flex items-center justify-center space-x-1"
                >
                    <span>{showDetails ? 'Show Less' : 'Show More'}</span>
                    <Icon
                        name={showDetails ? "ChevronUp" : "ChevronDown"}
                        size={14}
                    />
                </button>
            </div>
        </div>
    );
};

export default GoalCard;