import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GoalProgressModal = ({ isOpen, onClose, goal, onUpdateProgress }) => {
    const [formData, setFormData] = useState({
        amount: '',
        type: 'add',
        note: '',
        date: new Date()?.toISOString()?.split('T')?.[0]
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const typeOptions = [
        { value: 'add', label: '➕ Add Money' },
        { value: 'subtract', label: '➖ Subtract Money' },
        { value: 'set', label: '🎯 Set Total Amount' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors?.[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }

        if (formData?.type === 'subtract' && parseFloat(formData?.amount) > goal?.currentAmount) {
            newErrors.amount = 'Cannot subtract more than current amount';
        }

        if (formData?.type === 'set' && parseFloat(formData?.amount) < 0) {
            newErrors.amount = 'Total amount cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    const calculateNewAmount = () => {
        const amount = parseFloat(formData?.amount) || 0;
        const current = goal?.currentAmount;

        switch (formData?.type) {
            case 'add':
                return current + amount;
            case 'subtract':
                return Math.max(0, current - amount);
            case 'set':
                return amount;
            default:
                return current;
        }
    };

    const calculateNewProgress = () => {
        const newAmount = calculateNewAmount();
        return Math.min(100, (newAmount / goal?.targetAmount) * 100);
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newAmount = calculateNewAmount();
            const newProgress = calculateNewProgress();

            const updateData = {
                currentAmount: newAmount,
                progress: newProgress,
                lastUpdated: new Date()?.toISOString(),
                progressHistory: [
                    ...(goal?.progressHistory || []),
                    {
                        id: Date.now(),
                        amount: parseFloat(formData?.amount),
                        type: formData?.type,
                        note: formData?.note,
                        date: formData?.date,
                        newTotal: newAmount,
                        timestamp: new Date()?.toISOString()
                    }
                ]
            };

            // Update milestones
            const updatedMilestones = goal?.milestones?.map(milestone => ({
                ...milestone,
                achieved: newProgress >= milestone?.percentage
            }));

            if (updatedMilestones) {
                updateData.milestones = updatedMilestones;
            }

            onUpdateProgress(goal?.id, updateData);
            handleClose();
        } catch (error) {
            console.error('Error updating progress:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            amount: '',
            type: 'add',
            note: '',
            date: new Date()?.toISOString()?.split('T')?.[0]
        });
        setErrors({});
        onClose();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(amount);
    };

    if (!isOpen || !goal) return null;

    const newAmount = calculateNewAmount();
    const newProgress = calculateNewProgress();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-warm-lg w-full max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name={goal?.icon} size={20} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="font-heading font-semibold text-lg text-foreground">
                                Update Progress
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {goal?.title}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg hover:bg-muted transition-narrative"
                    >
                        <Icon name="X" size={20} className="text-muted-foreground" />
                    </button>
                </div>

                {/* Current Status */}
                <div className="p-6 border-b border-border bg-muted/30">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Amount</p>
                            <p className="text-lg font-semibold text-foreground">
                                {formatCurrency(goal?.currentAmount)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Target Amount</p>
                            <p className="text-lg font-semibold text-foreground">
                                {formatCurrency(goal?.targetAmount)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">Progress</span>
                            <span className="text-sm text-muted-foreground">{goal?.progress?.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className="h-full bg-primary transition-all duration-300 rounded-full"
                                style={{ width: `${Math.min(goal?.progress, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <Select
                        label="Update Type"
                        options={typeOptions}
                        value={formData?.type}
                        onChange={(value) => handleInputChange('type', value)}
                        required
                    />

                    <Input
                        label="Amount"
                        type="number"
                        placeholder="0.00"
                        value={formData?.amount}
                        onChange={(e) => handleInputChange('amount', e?.target?.value)}
                        error={errors?.amount}
                        min="0"
                        step="0.01"
                        required
                    />

                    <Input
                        label="Date"
                        type="date"
                        value={formData?.date}
                        onChange={(e) => handleInputChange('date', e?.target?.value)}
                        max={new Date()?.toISOString()?.split('T')?.[0]}
                        required
                    />

                    <Input
                        label="Note (Optional)"
                        type="text"
                        placeholder="Add a note about this update..."
                        value={formData?.note}
                        onChange={(e) => handleInputChange('note', e?.target?.value)}
                    />

                    {/* Preview */}
                    {formData?.amount && (
                        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-2">Preview Changes</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">New Amount:</span>
                                    <span className="font-medium text-foreground">
                    {formatCurrency(newAmount)}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">New Progress:</span>
                                    <span className="font-medium text-foreground">
                    {newProgress?.toFixed(1)}%
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Remaining:</span>
                                    <span className="font-medium text-foreground">
                    {formatCurrency(Math.max(0, goal?.targetAmount - newAmount))}
                  </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="default"
                            loading={isSubmitting}
                            iconName="Save"
                            iconPosition="left"
                            className="flex-1"
                        >
                            Update Progress
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GoalProgressModal;