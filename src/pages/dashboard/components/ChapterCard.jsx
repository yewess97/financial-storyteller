import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChapterCard = ({ chapter, onViewDetails, className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getChapterIcon = (type) => {
        switch (type) {
            case 'past': return 'History';
            case 'present': return 'Clock';
            case 'future': return 'Telescope';
            default: return 'BookOpen';
        }
    };

    const getChapterColor = (type) => {
        switch (type) {
            case 'past': return 'text-muted-foreground';
            case 'present': return 'text-primary';
            case 'future': return 'text-secondary';
            default: return 'text-foreground';
        }
    };

    const getProgressColor = (type) => {
        switch (type) {
            case 'past': return 'bg-muted-foreground';
            case 'present': return 'bg-primary';
            case 'future': return 'bg-secondary';
            default: return 'bg-primary';
        }
    };

    return (
        <div className={`bg-card border border-border rounded-lg shadow-warm hover:shadow-warm-lg transition-narrative ${className}`}>
            {/* Chapter Header */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${getChapterColor(chapter?.type)}`}>
                            <Icon name={getChapterIcon(chapter?.type)} size={20} />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-lg text-foreground">
                                {chapter?.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{chapter?.period}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 rounded-lg hover:bg-muted transition-narrative"
                    >
                        <Icon
                            name={isExpanded ? "ChevronUp" : "ChevronDown"}
                            size={16}
                            className="text-muted-foreground"
                        />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Progress</span>
                        <span className="text-sm text-muted-foreground">{chapter?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(chapter?.type)}`}
                            style={{ width: `${chapter?.progress}%` }}
                        />
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    {chapter?.metrics?.map((metric, index) => (
                        <div key={index} className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-lg font-semibold text-foreground">{metric?.value}</div>
                            <div className="text-xs text-muted-foreground">{metric?.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Chapter Content */}
            <div className="p-6">
                <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">Story Summary</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {chapter?.narrative}
                    </p>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="space-y-4 border-t border-border pt-4">
                        <div>
                            <h5 className="font-medium text-foreground mb-2">Key Highlights</h5>
                            <ul className="space-y-2">
                                {chapter?.highlights?.map((highlight, index) => (
                                    <li key={index} className="flex items-start space-x-2 text-sm">
                                        <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {chapter?.visualization && (
                            <div>
                                <h5 className="font-medium text-foreground mb-2">Visual Story</h5>
                                <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
                                    <Image
                                        src={chapter?.visualization?.image}
                                        alt={chapter?.visualization?.alt}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                                        <p className="text-white text-sm p-3">{chapter?.visualization?.caption}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-border">
                    <Button
                        variant="outline"
                        onClick={() => onViewDetails(chapter)}
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="w-full"
                    >
                        Explore {chapter?.title} Story
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChapterCard;