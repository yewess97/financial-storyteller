import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateGoalModal = ({ isOpen, onClose, onCreateGoal }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        targetAmount: '',
        currentAmount: '0',
        targetDate: '',
        category: '',
        icon: 'Target',
        motivationMessage: '',
        monthlyTarget: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
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
        } else {
            const targetDate = new Date(formData.targetDate);
            const today = new Date();
            if (targetDate <= today) {
                newErrors.targetDate = 'Target date must be in the future';
            }
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

            const goalData = {
                ...formData,
                id: Date.now(),
                targetAmount: parseFloat(formData?.targetAmount),
                currentAmount: parseFloat(formData?.currentAmount) || 0,
                monthlyTarget: parseFloat(formData?.monthlyTarget) || 0,
                progress: ((parseFloat(formData?.currentAmount) || 0) / parseFloat(formData?.targetAmount)) * 100,
                createdAt: new Date()?.toISOString(),
                storyNarrative: generateStoryNarrative(formData),
                milestones: generateMilestones()
            };

            onCreateGoal(goalData);
            handleClose();
        } catch (error) {
            console.error('Error creating goal:', error);
        } finally {
            setIsSubmitting(false);
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

    const generateMilestones = () => {
        return [
            { percentage: 25, description: 'Great start!', achieved: false },
            { percentage: 50, description: 'Halfway there!', achieved: false },
            { percentage: 75, description: 'Almost done!', achieved: false },
            { percentage: 100, description: 'Goal achieved!', achieved: false }
        ];
    };

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            targetAmount: '',
            currentAmount: '0',
            targetDate: '',
            category: '',
            icon: 'Target',
            motivationMessage: '',
            monthlyTarget: ''
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-warm-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name="Plus" size={20} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="font-heading font-semibold text-xl text-foreground">
                                Create New Goal
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Turn your dreams into achievable financial milestones
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
                                min={new Date()?.toISOString()?.split('T')?.[0]}
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
                            iconName="Plus"
                            iconPosition="left"
                            className="flex-1"
                        >
                            Create Goal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGoalModal;