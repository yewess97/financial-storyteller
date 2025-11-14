import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExpenseEntryForm = ({ onExpenseAdded, categories, onCategoryCreate }) => {
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        category: '',
        date: new Date()?.toISOString()?.split('T')?.[0],
        narrative: '',
        isRecurring: false,
        tags: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const categoryOptions = categories?.map(cat => ({
        value: cat?.id,
        label: `${cat?.icon} ${cat?.name}`,
        description: cat?.description
    }));

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
            await new Promise(resolve => setTimeout(resolve, 1000));

            const expenseData = {
                ...formData,
                amount: parseFloat(formData?.amount),
                id: Date.now(),
                timestamp: new Date()?.toISOString(),
                storyImpact: generateStoryImpact(formData)
            };

            onExpenseAdded?.(expenseData);

            // Reset form
            setFormData({
                amount: '',
                description: '',
                category: '',
                date: new Date()?.toISOString()?.split('T')?.[0],
                narrative: '',
                isRecurring: false,
                tags: []
            });
            setShowAdvanced(false);
        } catch (error) {
            console.error('Error adding expense:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateStoryImpact = (data) => {
        const category = categories?.find(cat => cat?.id === data?.category);
        const amount = parseFloat(data?.amount);

        if (amount > 100) {
            return `This ${category?.name || 'expense'} represents a significant chapter in your financial story, potentially affecting your monthly budget by ${((amount / 2000) * 100)?.toFixed(1)}%.`;
        } else {
            return `A small but meaningful addition to your ${category?.name || 'spending'} story, contributing to your daily financial narrative.`;
        }
    };

    const handleCreateCategory = () => {
        if (newCategoryName?.trim()) {
            const newCategory = {
                id: `custom_${Date.now()}`,
                name: newCategoryName,
                icon: '📦',
                description: 'Custom category',
                color: '#6B7280'
            };
            onCategoryCreate?.(newCategory);
            setFormData(prev => ({ ...prev, category: newCategory?.id }));
            setNewCategoryName('');
            setShowCategoryForm(false);
        }
    };

    const isFormValid = formData?.amount && formData?.description && formData?.category;

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-warm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="font-heading font-semibold text-xl text-foreground">
                        Add New Expense
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Create a new chapter in your financial story
                    </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="PenTool" size={24} className="text-primary" />
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Amount"
                        type="number"
                        placeholder="0.00"
                        value={formData?.amount}
                        onChange={(e) => handleInputChange('amount', e?.target?.value)}
                        required
                        min="0"
                        step="0.01"
                        description="How much did you spend?"
                    />

                    <Input
                        label="Date"
                        type="date"
                        value={formData?.date}
                        onChange={(e) => handleInputChange('date', e?.target?.value)}
                        required
                    />
                </div>

                <Input
                    label="Description"
                    type="text"
                    placeholder="What did you spend on? (e.g., Lunch at Italian restaurant)"
                    value={formData?.description}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                    required
                    description="Be specific to help categorize and remember this expense"
                />

                <div className="space-y-2">
                    <Select
                        label="Category"
                        placeholder="Choose a category"
                        options={categoryOptions}
                        value={formData?.category}
                        onChange={(value) => handleInputChange('category', value)}
                        required
                        description="This helps organize your financial story"
                    />

                    {!showCategoryForm ? (
                        <button
                            type="button"
                            onClick={() => setShowCategoryForm(true)}
                            className="text-sm text-primary hover:text-primary/80 transition-narrative flex items-center space-x-1"
                        >
                            <Icon name="Plus" size={14} />
                            <span>Create new category</span>
                        </button>
                    ) : (
                        <div className="flex space-x-2 mt-2">
                            <Input
                                type="text"
                                placeholder="Category name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e?.target?.value)}
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCreateCategory}
                                disabled={!newCategoryName?.trim()}
                            >
                                Add
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setShowCategoryForm(false);
                                    setNewCategoryName('');
                                }}
                            >
                                <Icon name="X" size={16} />
                            </Button>
                        </div>
                    )}
                </div>

                <div className="border-t border-border pt-4">
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-narrative"
                    >
                        <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
                        <span>Advanced Options</span>
                    </button>
                </div>

                {showAdvanced && (
                    <div className="space-y-4 pt-2">
                        <Input
                            label="Personal Story Context"
                            type="text"
                            placeholder="How does this expense fit into your financial journey?"
                            value={formData?.narrative}
                            onChange={(e) => handleInputChange('narrative', e?.target?.value)}
                            description="Add personal context to make this expense part of your story"
                        />

                        <Checkbox
                            label="Recurring Expense"
                            description="Mark if this is a regular monthly expense"
                            checked={formData?.isRecurring}
                            onChange={(e) => handleInputChange('isRecurring', e?.target?.checked)}
                        />
                    </div>
                )}

                {formData?.amount && formData?.category && (
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <Icon name="BookOpen" size={16} className="text-accent" />
                            </div>
                            <div>
                                <h4 className="font-medium text-foreground mb-1">Story Impact</h4>
                                <p className="text-sm text-muted-foreground">
                                    {generateStoryImpact(formData)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex space-x-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            setFormData({
                                amount: '',
                                description: '',
                                category: '',
                                date: new Date()?.toISOString()?.split('T')?.[0],
                                narrative: '',
                                isRecurring: false,
                                tags: []
                            });
                            setShowAdvanced(false);
                        }}
                        className="flex-1"
                    >
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        variant="default"
                        loading={isSubmitting}
                        disabled={!isFormValid}
                        className="flex-1"
                        iconName="Plus"
                        iconPosition="left"
                    >
                        Add to Story
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseEntryForm;