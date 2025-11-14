import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TimelineFilter = ({ onFilterChange, activeFilters }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        { value: 'food', label: '🍽️ Food & Dining' },
        { value: 'transport', label: '🚗 Transportation' },
        { value: 'shopping', label: '🛍️ Shopping' },
        { value: 'entertainment', label: '🎬 Entertainment' },
        { value: 'bills', label: '📄 Bills & Utilities' },
        { value: 'healthcare', label: '🏥 Healthcare' },
        { value: 'income', label: '💰 Income' },
        { value: 'savings', label: '🏦 Savings' }
    ];

    const timeRangeOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
    ];

    const storyThemeOptions = [
        { value: 'all', label: 'All Stories' },
        { value: 'achievements', label: '🏆 Achievements' },
        { value: 'challenges', label: '⚡ Challenges' },
        { value: 'milestones', label: '🎯 Milestones' },
        { value: 'habits', label: '🔄 Spending Habits' },
        { value: 'goals', label: '🎪 Goal Progress' }
    ];

    const handleFilterChange = (filterType, value) => {
        onFilterChange({
            ...activeFilters,
            [filterType]: value
        });
    };

    const clearAllFilters = () => {
        onFilterChange({
            category: 'all',
            timeRange: 'all',
            storyTheme: 'all'
        });
    };

    const hasActiveFilters = Object.values(activeFilters)?.some(filter => filter !== 'all');

    return (
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Icon name="Filter" size={20} className="text-primary" />
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                        Filter Your Story
                    </h3>
                </div>

                <div className="flex items-center space-x-2">
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            iconName="X"
                            iconPosition="left"
                        >
                            Clear All
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                        iconPosition="right"
                    >
                        {isExpanded ? 'Less' : 'More'} Filters
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                    label="Category"
                    options={categoryOptions}
                    value={activeFilters?.category}
                    onChange={(value) => handleFilterChange('category', value)}
                    className="w-full"
                />

                <Select
                    label="Time Range"
                    options={timeRangeOptions}
                    value={activeFilters?.timeRange}
                    onChange={(value) => handleFilterChange('timeRange', value)}
                    className="w-full"
                />

                <Select
                    label="Story Theme"
                    options={storyThemeOptions}
                    value={activeFilters?.storyTheme}
                    onChange={(value) => handleFilterChange('storyTheme', value)}
                    className="w-full"
                />
            </div>
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Button
                            variant={activeFilters?.amountRange === 'small' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleFilterChange('amountRange',
                                activeFilters?.amountRange === 'small' ? 'all' : 'small')}
                        >
                            Small ($0-$50)
                        </Button>

                        <Button
                            variant={activeFilters?.amountRange === 'medium' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleFilterChange('amountRange',
                                activeFilters?.amountRange === 'medium' ? 'all' : 'medium')}
                        >
                            Medium ($50-$200)
                        </Button>

                        <Button
                            variant={activeFilters?.amountRange === 'large' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleFilterChange('amountRange',
                                activeFilters?.amountRange === 'large' ? 'all' : 'large')}
                        >
                            Large ($200+)
                        </Button>

                        <Button
                            variant={activeFilters?.showMilestones ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleFilterChange('showMilestones', !activeFilters?.showMilestones)}
                        >
                            Milestones Only
                        </Button>
                    </div>
                </div>
            )}
            {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {Object.entries(activeFilters)?.map(([key, value]) => {
                        if (value === 'all' || value === false) return null;

                        const displayValue = key === 'showMilestones' ? 'Milestones Only' :
                            categoryOptions?.find(opt => opt?.value === value)?.label ||
                            timeRangeOptions?.find(opt => opt?.value === value)?.label ||
                            storyThemeOptions?.find(opt => opt?.value === value)?.label ||
                            value;

                        return (
                            <span
                                key={key}
                                className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs rounded-md"
                            >
                {displayValue}
                                <button
                                    onClick={() => handleFilterChange(key, key === 'showMilestones' ? false : 'all')}
                                    className="ml-1 hover:bg-primary-foreground hover:text-primary rounded-full p-0.5"
                                >
                  <Icon name="X" size={12} />
                </button>
              </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TimelineFilter;