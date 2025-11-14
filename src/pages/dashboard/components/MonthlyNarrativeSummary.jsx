import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MonthlyNarrativeSummary = ({ summary, className = '' }) => {
    const getMoodIcon = (mood) => {
        switch (mood) {
            case 'excellent': return 'TrendingUp';
            case 'good': return 'ThumbsUp';
            case 'neutral': return 'Minus';
            case 'concerning': return 'AlertTriangle';
            default: return 'BarChart3';
        }
    };

    const getMoodColor = (mood) => {
        switch (mood) {
            case 'excellent': return 'text-success';
            case 'good': return 'text-primary';
            case 'neutral': return 'text-warning';
            case 'concerning': return 'text-error';
            default: return 'text-muted-foreground';
        }
    };

    const getMoodBg = (mood) => {
        switch (mood) {
            case 'excellent': return 'bg-success/10';
            case 'good': return 'bg-primary/10';
            case 'neutral': return 'bg-warning/10';
            case 'concerning': return 'bg-error/10';
            default: return 'bg-muted';
        }
    };

    return (
        <div className={`bg-card border border-border rounded-lg shadow-warm ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg ${getMoodBg(summary?.mood)} flex items-center justify-center`}>
                            <Icon
                                name={getMoodIcon(summary?.mood)}
                                size={24}
                                className={getMoodColor(summary?.mood)}
                            />
                        </div>
                        <div>
                            <h2 className="font-heading font-semibold text-xl text-foreground">
                                {summary?.title}
                            </h2>
                            <p className="text-sm text-muted-foreground">{summary?.period}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">{summary?.score}/100</div>
                        <div className="text-xs text-muted-foreground">Financial Health</div>
                    </div>
                </div>
            </div>
            {/* Main Narrative */}
            <div className="p-6">
                <div className="mb-6">
                    <h3 className="font-medium text-foreground mb-3">Your Financial Story This Month</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {summary?.narrative}
                    </p>
                </div>

                {/* Key Achievements */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                            <Icon name="Trophy" size={16} className="text-warning" />
                            <span>Achievements</span>
                        </h4>
                        <ul className="space-y-2">
                            {summary?.achievements?.map((achievement, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                    <Icon name="Star" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                            <Icon name="Target" size={16} className="text-primary" />
                            <span>Areas to Focus</span>
                        </h4>
                        <ul className="space-y-2">
                            {summary?.challenges?.map((challenge, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                    <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{challenge}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Visual Highlight */}
                {summary?.visualization && (
                    <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3">Monthly Snapshot</h4>
                        <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
                            <Image
                                src={summary?.visualization?.image}
                                alt={summary?.visualization?.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                                <div className="p-6 text-white">
                                    <div className="text-2xl font-bold mb-1">{summary?.visualization?.metric}</div>
                                    <div className="text-sm opacity-90">{summary?.visualization?.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Motivational Insight */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <Icon name="Lightbulb" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <div>
                            <h5 className="font-medium text-foreground mb-1">Financial Wisdom</h5>
                            <p className="text-sm text-muted-foreground italic">
                                "{summary?.insight}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyNarrativeSummary;