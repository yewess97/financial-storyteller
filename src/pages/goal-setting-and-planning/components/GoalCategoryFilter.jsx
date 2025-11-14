import React from 'react';
import Icon from '../../../components/AppIcon';

const GoalCategoryFilter = ({ selectedCategory, onCategoryChange, goalCounts }) => {
    const categories = [
        {
            id: 'all',
            label: 'All Goals',
            icon: 'Grid3X3',
            color: 'text-foreground',
            bgColor: 'bg-muted'
        },
        {
            id: 'emergency',
            label: 'Emergency Fund',
            icon: 'Shield',
            color: 'text-success',
            bgColor: 'bg-success/10'
        },
        {
            id: 'travel',
            label: 'Travel',
            icon: 'Plane',
            color: 'text-primary',
            bgColor: 'bg-primary/10'
        },
        {
            id: 'home',
            label: 'Home',
            icon: 'Home',
            color: 'text-warning',
            bgColor: 'bg-warning/10'
        },
        {
            id: 'education',
            label: 'Education',
            icon: 'GraduationCap',
            color: 'text-secondary',
            bgColor: 'bg-secondary/10'
        },
        {
            id: 'retirement',
            label: 'Retirement',
            icon: 'Palmtree',
            color: 'text-accent',
            bgColor: 'bg-accent/10'
        },
        {
            id: 'investment',
            label: 'Investment',
            icon: 'TrendingUp',
            color: 'text-success',
            bgColor: 'bg-success/10'
        },
        {
            id: 'debt',
            label: 'Debt Payoff',
            icon: 'CreditCard',
            color: 'text-error',
            bgColor: 'bg-error/10'
        },
        {
            id: 'vehicle',
            label: 'Vehicle',
            icon: 'Car',
            color: 'text-primary',
            bgColor: 'bg-primary/10'
        },
        {
            id: 'health',
            label: 'Health',
            icon: 'Heart',
            color: 'text-error',
            bgColor: 'bg-error/10'
        },
        {
            id: 'other',
            label: 'Other',
            icon: 'Target',
            color: 'text-muted-foreground',
            bgColor: 'bg-muted'
        }
    ];

    const getGoalCount = (categoryId) => {
        if (categoryId === 'all') {
            return Object.values(goalCounts)?.reduce((sum, count) => sum + count, 0);
        }
        return goalCounts?.[categoryId] || 0;
    };

    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Filter by Category
            </h3>
            <div className="space-y-2">
                {categories?.map((category) => {
                    const count = getGoalCount(category?.id);
                    const isSelected = selectedCategory === category?.id;

                    return (
                        <button
                            key={category?.id}
                            onClick={() => onCategoryChange(category?.id)}
                            className={`
                w-full flex items-center justify-between p-3 rounded-lg transition-narrative
                ${isSelected
                                ? `${category?.bgColor} border border-current ${category?.color}`
                                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                            }
              `}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${isSelected ? category?.bgColor : 'bg-muted'}
                `}>
                                    <Icon
                                        name={category?.icon}
                                        size={16}
                                        className={isSelected ? category?.color : 'text-muted-foreground'}
                                    />
                                </div>
                                <span className="font-medium text-sm">
                  {category?.label}
                </span>
                            </div>
                            {count > 0 && (
                                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${isSelected
                                    ? `${category?.color} ${category?.bgColor}`
                                    : 'bg-muted text-muted-foreground'
                                }
                `}>
                  {count}
                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default GoalCategoryFilter;