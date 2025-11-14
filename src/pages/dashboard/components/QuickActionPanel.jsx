import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionPanel = ({ onQuickExpense, className = '' }) => {
    const navigate = useNavigate();

    const quickActions = [
        {
            id: 'add-expense',
            title: 'Add Expense',
            description: 'Record a new expense',
            icon: 'Plus',
            color: 'bg-primary text-primary-foreground',
            action: () => onQuickExpense?.()
        },
        {
            id: 'view-timeline',
            title: 'My Story',
            description: 'View financial timeline',
            icon: 'BookOpen',
            color: 'bg-secondary text-secondary-foreground',
            action: () => navigate('/financial-story-timeline')
        },
        {
            id: 'set-goals',
            title: 'Set Goals',
            description: 'Plan your future',
            icon: 'Target',
            color: 'bg-accent text-accent-foreground',
            action: () => navigate('/goal-setting-and-planning')
        },
        {
            id: 'manage-expenses',
            title: 'Manage Expenses',
            description: 'Review & categorize',
            icon: 'Receipt',
            color: 'bg-success text-success-foreground',
            action: () => navigate('/expense-entry-and-management')
        }
    ];

    return (
        <div className={`bg-card border border-border rounded-lg shadow-warm ${className}`}>
            <div className="p-6 border-b border-border">
                <h3 className="font-heading font-semibold text-lg text-foreground flex items-center space-x-2">
                    <Icon name="Zap" size={20} className="text-primary" />
                    <span>Quick Actions</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Continue your financial journey
                </p>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickActions?.map((action) => (
                        <button
                            key={action?.id}
                            onClick={action?.action}
                            className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-warm-sm transition-narrative text-left"
                        >
                            <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 rounded-lg ${action?.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                                    <Icon name={action?.icon} size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                        {action?.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {action?.description}
                                    </p>
                                </div>
                                <Icon
                                    name="ArrowRight"
                                    size={16}
                                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                                />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Recent Activity Preview */}
                <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span>Recent Activity</span>
                    </h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Icon name="ShoppingCart" size={14} className="text-muted-foreground" />
                                <span className="text-sm text-foreground">Grocery Shopping</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">$85.50</span>
                        </div>
                        <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Icon name="Car" size={14} className="text-muted-foreground" />
                                <span className="text-sm text-foreground">Gas Station</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">$45.00</span>
                        </div>
                        <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Icon name="Coffee" size={14} className="text-muted-foreground" />
                                <span className="text-sm text-foreground">Coffee Shop</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">$12.75</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickActionPanel;