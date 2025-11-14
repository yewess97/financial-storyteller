import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EditGoalModal = ({ isOpen, onClose, goal, onUpdateGoal, onDeleteGoal }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: '',
        category: '',
        icon: 'Target',
        motivationMessage: '',
        monthlyTarget: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [errors, setErrors] = useState({});

    const categoryOptions = [
        { value: 'emergency', label: '🛡️ Emergency Fund' },
        { value: 'travel', label: '✈️ Travel & Vacation' },
        { value: 'home', label: '🏠 Home & Property' },
        { value: 'education', label: '🎓 Education' },
        { value: 'retirement', label: '🏖️ Retirement' },
        { value: 'investment', label: '📈 Investment' },
        { value: 'debt', label: '💳 Debt Payoff' },
        { value: 'vehicle', label: '🚗 Vehicle' },
        { value: 'health', label: '🏥 Health & Wellness' },
        { value: 'other', label: '🎯 Other Goal' }
    ];

    const iconOptions = [
        { value: 'Target', label: '🎯 Target' },
        { value: 'Home', label: '🏠 Home' },
        { value: 'Plane', label: '✈️ Travel' },
        { value: 'GraduationCap', label: '🎓 Education' },
        { value: 'Car', label: '🚗 Vehicle' },
        { value: 'Heart', label: '❤️ Health' },
        { value: 'TrendingUp', label: '📈 Investment' },
        { value: 'Shield', label: '🛡️ Security' },
        { value: 'Gift', label: '🎁 Gift' },
        { value: 'Star', label: '⭐ Dream' }
    ];

    useEffect(() => {
        if (goal && isOpen) {
            setFormData({
                title: goal?.title || '',
                description: goal?.description || '',
                targetAmount: goal?.targetAmount?.toString() || '',
                currentAmount: goal?.currentAmount?.toString() || '',
                targetDate: goal?.targetDate || '',
                category: goal?.category || '',
                icon: goal?.icon || 'Target',
                motivationMessage: goal?.motivationMessage || '',
                monthlyTarget: goal?.monthlyTarget?.toString() || ''
            });
        }
    }, [goal, isOpen]);

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

        // Auto-calculate monthly target when target amount or date changes
        if (field === 'targetAmount' || field === 'targetDate') {
            calculateMonthlyTarget(
                field === 'targetAmount' ? value : formData?.targetAmount,
                field === 'targetDate' ? value : formData?.targetDate,
                formData?.currentAmount
            );
        }
    };

    const calculateMonthlyTarget = (targetAmount, targetDate, currentAmount) => {
        if (targetAmount && targetDate) {
            const target = parseFloat(targetAmount);
            const current = parseFloat(currentAmount) || 0;
            const remaining = target - current;

            const now = new Date();
            const target_date = new Date(targetDate);
            const monthsRemaining = Math.max(1, Math.ceil((target_date - now) / (1000 * 60 * 60 * 24 * 30)));

            const monthlyTarget = remaining / monthsRemaining;

            setFormData(prev => ({
                ...prev,
                monthlyTarget: monthlyTarget?.toFixed(2)
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData?.title?.trim()) {
            newErrors.title = 'Goal title is required';
        }

        if (!formData?.targetAmount || parseFloat(formData?.targetAmount) <= 0) {
            newErrors.targetAmount = 'Target amount must be greater than 0';
        }

        if (!formData?.targetDate) {
            newErrors.targetDate = 'Target date is required';
        }

        if (!formData?.category) {
            newErrors.category = 'Please select a category';
        }

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
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

            const updatedGoal = {
                ...goal,
                ...formData,
                targetAmount: parseFloat(formData?.targetAmount),
                currentAmount: parseFloat(formData?.currentAmount) || 0,
                monthlyTarget: parseFloat(formData?.monthlyTarget) || 0,
                progress: ((parseFloat(formData?.currentAmount) || 0) / parseFloat(formData?.targetAmount)) * 100,
                updatedAt: new Date()?.toISOString(),
                storyNarrative: generateStoryNarrative(formData)
            };

            onUpdateGoal(updatedGoal);
            handleClose();
        } catch (error) {
            console.error('Error updating goal:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            onDeleteGoal(goal?.id);
            handleClose();
        } catch (error) {
            console.error('Error deleting goal:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const generateStoryNarrative = (data) => {
        const categoryNarratives = {
            emergency: `Building your financial safety net of ${data?.targetAmount} will give you peace of mind and security for unexpected life events.`,
            travel: `Your dream adventure awaits! Save ${data?.targetAmount} to create unforgettable memories and explore new horizons.`,
            home: `Every dollar saved brings you closer to the keys of your dream home. Your future self will thank you for this ${data?.targetAmount} investment.`,
            education: `Investing in knowledge pays the best interest. Your ${data?.targetAmount} education goal is an investment in your future success.`,
            retirement: `Your future retired self is counting on today's decisions. This ${data?.targetAmount} goal is building your freedom and comfort.`,
            investment: `Growing your wealth through smart investments. This ${data?.targetAmount} goal will compound into your financial independence.`,
            debt: `Breaking free from debt chains! Paying off ${data?.targetAmount} will liberate your financial future and reduce stress.`,
            vehicle: `Your reliable transportation solution is within reach. Save ${data?.targetAmount} for the vehicle that fits your lifestyle.`,
            health: `Investing in your health is investing in your quality of life. This ${data?.targetAmount} goal supports your wellbeing journey.`,
            other: `Every great achievement starts with a decision to try. Your ${data?.targetAmount} goal represents your commitment to success.`
        };

        return categoryNarratives?.[data?.category] || categoryNarratives?.other;
    };

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            targetAmount: '',
            currentAmount: '',
            targetDate: '',
            category: '',
            icon: 'Target',
            motivationMessage: '',
            monthlyTarget: ''
        });
        setErrors({});
        setShowDeleteConfirm(false);
        onClose();
    };

    if (!isOpen || !goal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-warm-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name="Edit" size={20} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="font-heading font-semibold text-xl text-foreground">
                                Edit Goal
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Update your financial milestone
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

                {/* Delete Confirmation */}
                {showDeleteConfirm && (
                    <div className="p-6 border-b border-border bg-error/5">
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon name="AlertTriangle" size={20} className="text-error" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-foreground mb-2">Delete Goal</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Are you sure you want to delete "{goal?.title}"? This action cannot be undone and all progress data will be lost.
                                </p>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowDeleteConfirm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        loading={isDeleting}
                                        onClick={handleDelete}
                                    >
                                        Delete Goal
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="font-heading font-medium text-lg text-foreground">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Goal Title"
                                type="text"
                                placeholder="e.g., Emergency Fund, Dream Vacation"
                                value={formData?.title}
                                onChange={(e) => handleInputChange('title', e?.target?.value)}
                                error={errors?.title}
                                required
                            />

                            <Select
                                label="Category"
                                placeholder="Choose a category"
                                options={categoryOptions}
                                value={formData?.category}
                                onChange={(value) => handleInputChange('category', value)}
                                error={errors?.category}
                                required
                            />
                        </div>

                        <Input
                            label="Description (Optional)"
                            type="text"
                            placeholder="Tell us more about this goal..."
                            value={formData?.description}
                            onChange={(e) => handleInputChange('description', e?.target?.value)}
                        />
                    </div>

                    {/* Financial Details */}
                    <div className="space-y-4">
                        <h3 className="font-heading font-medium text-lg text-foreground">
                            Financial Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Target Amount"
                                type="number"
                                placeholder="0.00"
                                value={formData?.targetAmount}
                                onChange={(e) => handleInputChange('targetAmount', e?.target?.value)}
                                error={errors?.targetAmount}
                                min="0"
                                step="0.01"
                                required
                            />

                            <Input
                                label="Current Amount"
                                type="number"
                                placeholder="0.00"
                                value={formData?.currentAmount}
                                onChange={(e) => handleInputChange('currentAmount', e?.target?.value)}
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Target Date"
                                type="date"
                                value={formData?.targetDate}
                                onChange={(e) => handleInputChange('targetDate', e?.target?.value)}
                                error={errors?.targetDate}
                                required
                            />

                            <Input
                                label="Monthly Target (Auto-calculated)"
                                type="number"
                                value={formData?.monthlyTarget}
                                disabled
                                description="Based on target amount and date"
                            />
                        </div>
                    </div>

                    {/* Personalization */}
                    <div className="space-y-4">
                        <h3 className="font-heading font-medium text-lg text-foreground">
                            Personalization
                        </h3>

                        <Select
                            label="Goal Icon"
                            placeholder="Choose an icon"
                            options={iconOptions}
                            value={formData?.icon}
                            onChange={(value) => handleInputChange('icon', value)}
                        />

                        <Input
                            label="Personal Motivation (Optional)"
                            type="text"
                            placeholder="Why is this goal important to you?"
                            value={formData?.motivationMessage}
                            onChange={(e) => handleInputChange('motivationMessage', e?.target?.value)}
                            description="This will appear on your goal card for motivation"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4 border-t border-border">
                        <Button
                            type="button"
                            variant="destructive"
                            iconName="Trash2"
                            iconPosition="left"
                            onClick={() => setShowDeleteConfirm(true)}
                            className="mr-auto"
                        >
                            Delete Goal
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="default"
                            loading={isSubmitting}
                            iconName="Save"
                            iconPosition="left"
                        >
                            Update Goal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGoalModal;