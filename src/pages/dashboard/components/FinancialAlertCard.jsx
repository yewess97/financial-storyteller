import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FinancialAlertCard = ({ alert, onDismiss, onAction, className = '' }) => {
    const getAlertIcon = (type) => {
        switch (type) {
            case 'success': return 'CheckCircle';
            case 'warning': return 'AlertTriangle';
            case 'info': return 'Info';
            case 'error': return 'AlertCircle';
            case 'goal': return 'Target';
            case 'milestone': return 'Trophy';
            default: return 'Bell';
        }
    };

    const getAlertColor = (type) => {
        switch (type) {
            case 'success': return 'text-success';
            case 'warning': return 'text-warning';
            case 'info': return 'text-primary';
            case 'error': return 'text-error';
            case 'goal': return 'text-secondary';
            case 'milestone': return 'text-warning';
            default: return 'text-muted-foreground';
        }
    };

    const getAlertBg = (type) => {
        switch (type) {
            case 'success': return 'bg-success/10 border-success/20';
            case 'warning': return 'bg-warning/10 border-warning/20';
            case 'info': return 'bg-primary/10 border-primary/20';
            case 'error': return 'bg-error/10 border-error/20';
            case 'goal': return 'bg-secondary/10 border-secondary/20';
            case 'milestone': return 'bg-warning/10 border-warning/20';
            default: return 'bg-muted border-border';
        }
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const alertTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    return (
        <div className={`border rounded-lg p-4 transition-narrative hover:shadow-warm-sm ${getAlertBg(alert?.type)} ${className}`}>
            <div className="flex items-start space-x-3">
                {/* Alert Icon */}
                <div className="flex-shrink-0 mt-0.5">
                    <Icon
                        name={getAlertIcon(alert?.type)}
                        size={20}
                        className={getAlertColor(alert?.type)}
                    />
                </div>

                {/* Alert Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm">
                            {alert?.title}
                        </h4>
                        <div className="flex items-center space-x-2 ml-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTimeAgo(alert?.timestamp)}
              </span>
                            {onDismiss && (
                                <button
                                    onClick={() => onDismiss(alert?.id)}
                                    className="p-1 rounded hover:bg-muted transition-narrative"
                                >
                                    <Icon name="X" size={14} className="text-muted-foreground" />
                                </button>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {alert?.message}
                    </p>

                    {/* Alert Context */}
                    {alert?.context && (
                        <div className="mb-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                            <strong>Context:</strong> {alert?.context}
                        </div>
                    )}

                    {/* Action Buttons */}
                    {alert?.actions && alert?.actions?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {alert?.actions?.map((action, index) => (
                                <Button
                                    key={index}
                                    variant={action?.primary ? "default" : "outline"}
                                    size="xs"
                                    onClick={() => onAction?.(alert?.id, action)}
                                    iconName={action?.icon}
                                    iconPosition="left"
                                >
                                    {action?.label}
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Progress Indicator for Goal Alerts */}
                    {alert?.type === 'goal' && alert?.progress !== undefined && (
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="text-xs font-medium text-foreground">{alert?.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                                <div
                                    className="bg-secondary h-1.5 rounded-full transition-all duration-500"
                                    style={{ width: `${alert?.progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinancialAlertCard;