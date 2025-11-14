import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickEntryTemplates = ({ onTemplateUse, onTemplateCreate, templates = [] }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        name: '',
        description: '',
        amount: '',
        category: '',
        icon: '⚡'
    });

    const defaultTemplates = [
        {
            id: 'coffee',
            name: 'Morning Coffee',
            description: 'Daily coffee shop visit',
            amount: 4.50,
            category: 'food',
            icon: '☕',
            frequency: 'daily',
            storyContext: 'Your daily ritual of caffeinated inspiration'
        },
        {
            id: 'lunch',
            name: 'Work Lunch',
            description: 'Lunch during work hours',
            amount: 12.00,
            category: 'food',
            icon: '🥪',
            frequency: 'weekdays',
            storyContext: 'Midday nourishment to fuel your professional journey'
        },
        {
            id: 'gas',
            name: 'Gas Fill-up',
            description: 'Vehicle fuel',
            amount: 45.00,
            category: 'transport',
            icon: '⛽',
            frequency: 'weekly',
            storyContext: 'Keeping your journey moving forward'
        },
        {
            id: 'parking',
            name: 'Parking Fee',
            description: 'City parking',
            amount: 8.00,
            category: 'transport',
            icon: '🅿️',
            frequency: 'occasional',
            storyContext: 'The cost of urban convenience'
        },
        {
            id: 'subscription',
            name: 'Streaming Service',
            description: 'Monthly entertainment subscription',
            amount: 15.99,
            category: 'entertainment',
            icon: '📺',
            frequency: 'monthly',
            storyContext: 'Your window to entertainment and relaxation'
        },
        {
            id: 'grocery',
            name: 'Grocery Run',
            description: 'Weekly grocery shopping',
            amount: 85.00,
            category: 'food',
            icon: '🛒',
            frequency: 'weekly',
            storyContext: 'Stocking up for home-cooked stories'
        }
    ];

    const allTemplates = [...defaultTemplates, ...templates];

    const handleTemplateUse = (template) => {
        const expenseData = {
            amount: template?.amount?.toString(),
            description: template?.description,
            category: template?.category,
            date: new Date()?.toISOString()?.split('T')?.[0],
            narrative: template?.storyContext,
            isFromTemplate: true,
            templateId: template?.id
        };

        onTemplateUse?.(expenseData);
    };

    const handleCreateTemplate = () => {
        if (newTemplate?.name && newTemplate?.amount && newTemplate?.category) {
            const templateData = {
                id: `custom_${Date.now()}`,
                ...newTemplate,
                amount: parseFloat(newTemplate?.amount),
                isCustom: true,
                storyContext: `Your personalized ${newTemplate?.name?.toLowerCase()} expense template`
            };

            onTemplateCreate?.(templateData);
            setNewTemplate({
                name: '',
                description: '',
                amount: '',
                category: '',
                icon: '⚡'
            });
            setIsCreating(false);
        }
    };

    const getFrequencyColor = (frequency) => {
        switch (frequency) {
            case 'daily': return 'text-error';
            case 'weekdays': return 'text-warning';
            case 'weekly': return 'text-accent';
            case 'monthly': return 'text-primary';
            default: return 'text-muted-foreground';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(amount);
    };

    return (
        <div className="bg-card border border-border rounded-lg shadow-warm">
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-heading font-semibold text-xl text-foreground">
                            Quick Entry Templates
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Fast-track common expenses with pre-configured templates
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setIsCreating(true)}
                        iconName="Plus"
                        iconPosition="left"
                    >
                        New Template
                    </Button>
                </div>
            </div>
            <div className="p-6">
                {isCreating && (
                    <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
                        <h3 className="font-medium text-foreground mb-4">Create New Template</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                                label="Template Name"
                                type="text"
                                placeholder="e.g., Morning Coffee"
                                value={newTemplate?.name}
                                onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e?.target?.value }))}
                                required
                            />

                            <Input
                                label="Default Amount"
                                type="number"
                                placeholder="0.00"
                                value={newTemplate?.amount}
                                onChange={(e) => setNewTemplate(prev => ({ ...prev, amount: e?.target?.value }))}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <Input
                            label="Description"
                            type="text"
                            placeholder="Brief description of this expense"
                            value={newTemplate?.description}
                            onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e?.target?.value }))}
                            className="mb-4"
                        />

                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsCreating(false);
                                    setNewTemplate({
                                        name: '',
                                        description: '',
                                        amount: '',
                                        category: '',
                                        icon: '⚡'
                                    });
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                onClick={handleCreateTemplate}
                                disabled={!newTemplate?.name || !newTemplate?.amount}
                            >
                                Create Template
                            </Button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allTemplates?.map((template) => (
                        <div
                            key={template?.id}
                            className="p-4 border border-border rounded-lg hover:shadow-warm-sm transition-narrative group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="text-lg">{template?.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground">{template?.name}</h3>
                                        <p className="text-sm text-muted-foreground">{template?.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Amount</span>
                                    <span className="font-semibold text-foreground">
                    {formatCurrency(template?.amount)}
                  </span>
                                </div>

                                {template?.frequency && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Frequency</span>
                                        <span className={`text-sm font-medium capitalize ${getFrequencyColor(template?.frequency)}`}>
                      {template?.frequency}
                    </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 bg-muted/30 rounded-lg mb-4">
                                <div className="flex items-start space-x-2">
                                    <Icon name="BookOpen" size={12} className="text-accent mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-muted-foreground">
                                        {template?.storyContext}
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => handleTemplateUse(template)}
                                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-narrative"
                                iconName="Zap"
                                iconPosition="left"
                            >
                                Quick Add
                            </Button>
                        </div>
                    ))}
                </div>

                {allTemplates?.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="Zap" size={24} className="text-muted-foreground" />
                        </div>
                        <h3 className="font-medium text-foreground mb-2">No templates yet</h3>
                        <p className="text-sm text-muted-foreground">
                            Create your first template to speed up expense entry for common purchases.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuickEntryTemplates;