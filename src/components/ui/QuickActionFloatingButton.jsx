import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const QuickActionFloatingButton = ({ onExpenseAdded, className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        category: '',
        date: new Date()?.toISOString()?.split('T')?.[0]
    });

    const categoryOptions = [
        { value: 'food', label: '🍽️ Food & Dining' },
        { value: 'transport', label: '🚗 Transportation' },
        { value: 'shopping', label: '🛍️ Shopping' },
        { value: 'entertainment', label: '🎬 Entertainment' },
        { value: 'bills', label: '📄 Bills & Utilities' },
        { value: 'healthcare', label: '🏥 Healthcare' },
        { value: 'education', label: '📚 Education' },
        { value: 'other', label: '📦 Other' }
    ];

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            // Reset form when opening
            setFormData({
                amount: '',
                description: '',
                category: '',
                date: new Date()?.toISOString()?.split('T')?.[0]
            });
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        if (!formData?.amount || !formData?.description || !formData?.category) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const expenseData = {
                ...formData,
                amount: parseFloat(formData?.amount),
                id: Date.now(),
                timestamp: new Date()?.toISOString()
            };

            onExpenseAdded?.(expenseData);

            // Reset form and close
            setFormData({
                amount: '',
                description: '',
                category: '',
                date: new Date()?.toISOString()?.split('T')?.[0]
            });
            setIsExpanded(false);
        } catch (error) {
            console.error('Error adding expense:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData?.amount && formData?.description && formData?.category;

    return (
        <>
            {/* Backdrop */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-floating"
                    onClick={() => setIsExpanded(false)}
                />
            )}
            {/* Floating Button Container */}
            <div className={`fixed bottom-6 right-6 z-floating ${className}`}>
                {/* Expanded Form */}
                {isExpanded && (
                    <div className="mb-4 w-80 bg-card border border-border rounded-lg shadow-warm-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-heading font-semibold text-lg text-foreground">
                                Quick Expense
                            </h3>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="p-1 rounded-md hover:bg-muted transition-narrative"
                            >
                                <Icon name="X" size={16} className="text-muted-foreground" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Amount"
                                type="number"
                                placeholder="0.00"
                                value={formData?.amount}
                                onChange={(e) => handleInputChange('amount', e?.target?.value)}
                                required
                                min="0"
                                step="0.01"
                            />

                            <Input
                                label="Description"
                                type="text"
                                placeholder="What did you spend on?"
                                value={formData?.description}
                                onChange={(e) => handleInputChange('description', e?.target?.value)}
                                required
                            />

                            <Select
                                label="Category"
                                placeholder="Choose category"
                                options={categoryOptions}
                                value={formData?.category}
                                onChange={(value) => handleInputChange('category', value)}
                                required
                            />

                            <Input
                                label="Date"
                                type="date"
                                value={formData?.date}
                                onChange={(e) => handleInputChange('date', e?.target?.value)}
                                required
                            />

                            <div className="flex space-x-2 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsExpanded(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="default"
                                    loading={isSubmitting}
                                    disabled={!isFormValid}
                                    className="flex-1"
                                >
                                    Add Expense
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Main Floating Button */}
                <button
                    onClick={handleToggle}
                    className={`
            w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-warm-lg
            flex items-center justify-center transition-narrative hover:scale-105 active:scale-95
            ${isExpanded ? 'rotate-45' : 'rotate-0'}
          `}
                    title="Quick add expense"
                >
                    <Icon name="Plus" size={24} />
                </button>
            </div>
        </>
    );
};

export default QuickActionFloatingButton;