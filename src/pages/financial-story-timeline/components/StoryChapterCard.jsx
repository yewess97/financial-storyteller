import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StoryChapterCard = ({ chapter, onChapterClick, isActive }) => {
    const getChapterIcon = (type) => {
        const iconMap = {
            past: 'History',
            present: 'Clock',
            future: 'Telescope',
            milestone: 'Trophy',
            achievement: 'Award',
            challenge: 'Zap'
        };
        return iconMap?.[type] || 'BookOpen';
    };

    const getChapterColor = (type) => {
        const colorMap = {
            past: 'bg-slate-100 text-slate-600 border-slate-200',
            present: 'bg-blue-100 text-blue-600 border-blue-200',
            future: 'bg-purple-100 text-purple-600 border-purple-200',
            milestone: 'bg-amber-100 text-amber-600 border-amber-200',
            achievement: 'bg-green-100 text-green-600 border-green-200',
            challenge: 'bg-red-100 text-red-600 border-red-200'
        };
        return colorMap?.[type] || 'bg-gray-100 text-gray-600 border-gray-200';
    };

    const formatCurrency = (amount) => {
        return Math.abs(amount)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    return (
        <div
            className={`
        bg-card border rounded-lg p-4 cursor-pointer transition-narrative
        ${isActive
                ? 'border-primary shadow-warm ring-2 ring-primary ring-opacity-20'
                : 'border-border hover:border-primary hover:shadow-warm'
            }
      `}
            onClick={() => onChapterClick(chapter?.id)}
        >
            {/* Chapter Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${getChapterColor(chapter?.type)} flex items-center justify-center`}>
                        <Icon name={getChapterIcon(chapter?.type)} size={20} />
                    </div>

                    <div>
                        <h3 className="font-heading font-semibold text-foreground">
                            {chapter?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {chapter?.period}
                        </p>
                    </div>
                </div>

                {chapter?.isNew && (
                    <span className="inline-flex items-center px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
            New
          </span>
                )}
            </div>
            {/* Chapter Summary */}
            <div className="mb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {chapter?.summary}
                </p>
            </div>
            {/* Chapter Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="text-lg font-semibold text-foreground">
                        {chapter?.eventCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Events</div>
                </div>

                <div className="text-center p-2 bg-muted rounded-lg">
                    <div className={`text-lg font-semibold ${chapter?.totalAmount >= 0 ? 'text-success' : 'text-error'}`}>
                        {chapter?.totalAmount >= 0 ? '+' : ''}{formatCurrency(chapter?.totalAmount)}
                    </div>
                    <div className="text-xs text-muted-foreground">Net Impact</div>
                </div>
            </div>
            {/* Key Highlights */}
            {chapter?.highlights && chapter?.highlights?.length > 0 && (
                <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Sparkles" size={14} className="text-accent" />
                        <span className="text-xs font-medium text-foreground">Key Highlights</span>
                    </div>

                    <div className="space-y-1">
                        {chapter?.highlights?.slice(0, 2)?.map((highlight, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-xs text-muted-foreground">{highlight}</span>
                            </div>
                        ))}

                        {chapter?.highlights?.length > 2 && (
                            <div className="text-xs text-muted-foreground ml-3.5">
                                +{chapter?.highlights?.length - 2} more highlights
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Action Button */}
            <Button
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
            >
                {isActive ? 'Currently Viewing' : 'Explore Chapter'}
            </Button>
        </div>
    );
};

export default StoryChapterCard;