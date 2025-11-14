import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialMetricsGrid = ({ metrics, className = '' }) => {
    const getMetricIcon = (type) => {
        switch (type) {
            case 'income': return 'TrendingUp';
            case 'expenses': return 'TrendingDown';
            case 'savings': return 'PiggyBank';
            case 'investments': return 'LineChart';
            case 'budget': return 'Target';
            case 'debt': return 'CreditCard';
            default: return 'DollarSign';
        }
    };

    const getMetricColor = (type, trend) => {
        if (trend === 'positive') return 'text-success';
        if (trend === 'negative') return 'text-error';
        if (trend === 'neutral') return 'text-warning';

        switch (type) {
            case 'income': return 'text-success';
            case 'expenses': return 'text-error';
            case 'savings': return 'text-primary';
            case 'investments': return 'text-secondary';
            case 'budget': return 'text-accent';
            case 'debt': return 'text-warning';
            default: return 'text-muted-foreground';
        }
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'positive': return 'TrendingUp';
            case 'negative': return 'TrendingDown';
            case 'neutral': return 'Minus';
            default: return null;
        }
    };

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
            {metrics?.map((metric, index) => (
                <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-warm-sm transition-narrative"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${getMetricColor(metric?.type)}`}>
                            <Icon name={getMetricIcon(metric?.type)} size={20} />
                        </div>
                        {metric?.trend && (
                            <div className={`flex items-center space-x-1 ${getMetricColor(metric?.type, metric?.trend)}`}>
                                <Icon name={getTrendIcon(metric?.trend)} size={14} />
                                <span className="text-xs font-medium">{metric?.change}</span>
                            </div>
                        )}
                    </div>

                    {/* Value */}
                    <div className="mb-2">
                        <div className="text-2xl font-bold text-foreground">
                            {metric?.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {metric?.label}
                        </div>
                    </div>

                    {/* Description */}
                    {metric?.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {metric?.description}
                        </p>
                    )}

                    {/* Progress Bar */}
                    {metric?.progress !== undefined && (
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="text-xs font-medium text-foreground">{metric?.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-500 ${getMetricColor(metric?.type)?.replace('text-', 'bg-')}`}
                                    style={{ width: `${Math.min(metric?.progress, 100)}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Additional Info */}
                    {metric?.subtitle && (
                        <div className="mt-3 pt-3 border-t border-border">
                            <div className="text-xs text-muted-foreground">
                                {metric?.subtitle}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FinancialMetricsGrid;