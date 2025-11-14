import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineNode = ({ event, isLast, onNodeClick, isExpanded }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getCategoryIcon = (category) => {
        const iconMap = {
            food: 'UtensilsCrossed',
            transport: 'Car',
            shopping: 'ShoppingBag',
            entertainment: 'Film',
            bills: 'FileText',
            healthcare: 'Heart',
            income: 'TrendingUp',
            savings: 'PiggyBank',
            investment: 'LineChart'
        };
        return iconMap?.[category] || 'DollarSign';
    };

    const getCategoryColor = (category) => {
        const colorMap = {
            food: 'bg-orange-100 text-orange-600 border-orange-200',
            transport: 'bg-blue-100 text-blue-600 border-blue-200',
            shopping: 'bg-purple-100 text-purple-600 border-purple-200',
            entertainment: 'bg-pink-100 text-pink-600 border-pink-200',
            bills: 'bg-red-100 text-red-600 border-red-200',
            healthcare: 'bg-green-100 text-green-600 border-green-200',
            income: 'bg-emerald-100 text-emerald-600 border-emerald-200',
            savings: 'bg-indigo-100 text-indigo-600 border-indigo-200',
            investment: 'bg-cyan-100 text-cyan-600 border-cyan-200'
        };
        return colorMap?.[category] || 'bg-gray-100 text-gray-600 border-gray-200';
    };

    const formatAmount = (amount, type) => {
        const formattedAmount = Math.abs(amount)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        if (type === 'income' || type === 'savings') {
            return `+${formattedAmount}`;
        }
        return `-${formattedAmount}`;
    };

    const getAmountColor = (type) => {
        if (type === 'income' || type === 'savings') {
            return 'text-success';
        }
        return 'text-error';
    };

    return (
        <div className="relative flex items-start group">
            {/* Timeline Line */}
            {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-full bg-border group-hover:bg-primary transition-narrative" />
            )}
            {/* Timeline Node */}
            <div
                className={`
          relative z-10 w-12 h-12 rounded-full border-4 border-card bg-card shadow-warm
          flex items-center justify-center cursor-pointer transition-narrative
          ${isExpanded ? 'border-primary bg-primary' : 'hover:border-primary hover:scale-110'}
          ${event?.isMilestone ? 'ring-4 ring-accent ring-opacity-30' : ''}
        `}
                onClick={() => onNodeClick(event?.id)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`w-6 h-6 rounded-full ${getCategoryColor(event?.category)} flex items-center justify-center`}>
                    <Icon
                        name={getCategoryIcon(event?.category)}
                        size={14}
                        className={isExpanded ? 'text-primary-foreground' : ''}
                    />
                </div>

                {event?.isMilestone && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="Star" size={10} className="text-accent-foreground" />
                    </div>
                )}
            </div>
            {/* Event Content */}
            <div className="flex-1 ml-6 pb-8">
                <div
                    className={`
            bg-card border border-border rounded-lg p-4 shadow-warm-sm
            transition-narrative cursor-pointer
            ${isExpanded ? 'border-primary shadow-warm' : 'hover:shadow-warm hover:border-primary'}
          `}
                    onClick={() => onNodeClick(event?.id)}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-muted-foreground">
                  {new Date(event.date)?.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                  })}
                </span>
                                {event?.isMilestone && (
                                    <span className="inline-flex items-center px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">
                    <Icon name="Trophy" size={10} className="mr-1" />
                    Milestone
                  </span>
                                )}
                            </div>
                            <h4 className="font-heading font-semibold text-foreground">
                                {event?.title}
                            </h4>
                        </div>

                        <div className="text-right">
                            <div className={`font-semibold ${getAmountColor(event?.type)}`}>
                                {formatAmount(event?.amount, event?.type)}
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                                {event?.category}
                            </div>
                        </div>
                    </div>

                    {/* Story Content */}
                    <div className="mb-3">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {event?.storyText}
                        </p>
                    </div>

                    {/* Tags */}
                    {event?.tags && event?.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {event?.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md"
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                    )}

                    {/* Expanded Content */}
                    {isExpanded && (
                        <div className="border-t border-border pt-3 mt-3">
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <span className="text-xs text-muted-foreground">Location</span>
                                    <p className="text-sm font-medium">{event?.location || 'Not specified'}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground">Payment Method</span>
                                    <p className="text-sm font-medium">{event?.paymentMethod || 'Cash'}</p>
                                </div>
                            </div>

                            {event?.insights && (
                                <div className="bg-muted rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Icon name="Lightbulb" size={16} className="text-accent" />
                                        <span className="text-sm font-medium text-foreground">Financial Insight</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{event?.insights}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                iconName="MessageCircle"
                                iconPosition="left"
                            >
                                Add Note
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                iconName="Share2"
                                iconPosition="left"
                            >
                                Share
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                        >
                            {isExpanded ? 'Less' : 'More'}
                        </Button>
                    </div>
                </div>
            </div>
            {/* Hover Tooltip */}
            {isHovered && !isExpanded && (
                <div className="absolute left-16 top-0 bg-popover border border-border rounded-lg shadow-warm-lg p-3 z-20 min-w-64">
                    <div className="flex items-center space-x-2 mb-2">
                        <Icon name={getCategoryIcon(event?.category)} size={16} className="text-primary" />
                        <span className="font-medium text-foreground">{event?.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event?.storyText}</p>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{event?.category}</span>
                        <span className={`font-semibold ${getAmountColor(event?.type)}`}>
              {formatAmount(event?.amount, event?.type)}
            </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimelineNode;