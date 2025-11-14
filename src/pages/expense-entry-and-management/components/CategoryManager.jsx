import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CategoryManager = ({ categories, onCategoryCreate, onCategoryUpdate, onCategoryDelete }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newCategory, setNewCategory] = useState({
        name: '',
        icon: '📦',
        description: '',
        color: '#6B7280'
    });

    const availableIcons = [
        '🍽️', '🚗', '🛍️', '🎬', '📄', '🏥', '📚', '🏠',
        '💡', '📱', '✈️', '🎯', '💰', '🎨', '⚽', '📦'
    ];

    const availableColors = [
        '#EF4444', '#F97316', '#F59E0B', '#84CC16',
        '#10B981', '#06B6D4', '#3B82F6', '#6366F1',
        '#8B5CF6', '#EC4899', '#6B7280', '#374151'
    ];

    const handleCreate = () => {
        if (newCategory?.name?.trim()) {
            const categoryData = {
                id: `custom_${Date.now()}`,
                ...newCategory,
                isCustom: true
            };
            onCategoryCreate?.(categoryData);
            setNewCategory({
                name: '',
                icon: '📦',
                description: '',
                color: '#6B7280'
            });
            setIsCreating(false);
        }
    };

    const handleUpdate = (categoryId, updates) => {
        onCategoryUpdate?.(categoryId, updates);
        setEditingId(null);
    };

    const getCategoryUsage = (categoryId) => {
        // This would typically come from expense data
        const usageCounts = {
            'food': 45,
            'transport': 23,
            'shopping': 18,
            'entertainment': 12,
            'bills': 8,
            'healthcare': 5,
            'education': 3,
            'other': 15
        };
        return usageCounts?.[categoryId] || 0;
    };

    const getStoryTheme = (category) => {
        const themes = {
            'food': 'Nourishment & Social Connections',
            'transport': 'Journey & Movement',
            'shopping': 'Lifestyle & Choices',
            'entertainment': 'Joy & Experiences',
            'bills': 'Stability & Responsibility',
            'healthcare': 'Wellness & Care',
            'education': 'Growth & Learning',
            'other': 'Life\'s Surprises'
        };
        return themes?.[category?.id] || 'Personal Expression';
    };

    return (
        <div className="bg-card border border-border rounded-lg shadow-warm">
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-heading font-semibold text-xl text-foreground">
                            Story Categories
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Organize your expenses into meaningful narrative themes
                        </p>
                    </div>

                    <Button
                        variant="default"
                        onClick={() => setIsCreating(true)}
                        iconName="Plus"
                        iconPosition="left"
                    >
                        New Category
                    </Button>
                </div>
            </div>
            <div className="p-6">
                {isCreating && (
                    <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
                        <h3 className="font-medium text-foreground mb-4">Create New Category</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                                label="Category Name"
                                type="text"
                                placeholder="e.g., Fitness & Health"
                                value={newCategory?.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e?.target?.value }))}
                                required
                            />

                            <Input
                                label="Description"
                                type="text"
                                placeholder="Brief description of this category"
                                value={newCategory?.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e?.target?.value }))}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Choose Icon
                            </label>
                            <div className="grid grid-cols-8 gap-2">
                                {availableIcons?.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setNewCategory(prev => ({ ...prev, icon }))}
                                        className={`
                      w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg transition-narrative
                      ${newCategory?.icon === icon
                                            ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                                        }
                    `}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Choose Color
                            </label>
                            <div className="grid grid-cols-6 gap-2">
                                {availableColors?.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                                        className={`
                      w-8 h-8 rounded-lg border-2 transition-narrative
                      ${newCategory?.color === color
                                            ? 'border-foreground scale-110'
                                            : 'border-border hover:scale-105'
                                        }
                    `}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsCreating(false);
                                    setNewCategory({
                                        name: '',
                                        icon: '📦',
                                        description: '',
                                        color: '#6B7280'
                                    });
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                onClick={handleCreate}
                                disabled={!newCategory?.name?.trim()}
                            >
                                Create Category
                            </Button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories?.map((category) => {
                        const usage = getCategoryUsage(category?.id);
                        const storyTheme = getStoryTheme(category);

                        return (
                            <div
                                key={category?.id}
                                className="p-4 border border-border rounded-lg hover:shadow-warm-sm transition-narrative"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: `${category?.color}20` }}
                                        >
                                            <span className="text-lg">{category?.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground">{category?.name}</h3>
                                            <p className="text-xs text-muted-foreground">{usage} expenses</p>
                                        </div>
                                    </div>

                                    {category?.isCustom && (
                                        <div className="flex items-center space-x-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setEditingId(category?.id)}
                                                iconName="Edit"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onCategoryDelete?.(category?.id)}
                                                iconName="Trash2"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        {category?.description}
                                    </p>

                                    <div className="p-2 bg-muted/30 rounded-md">
                                        <p className="text-xs font-medium text-foreground mb-1">Story Theme</p>
                                        <p className="text-xs text-muted-foreground italic">
                                            {storyTheme}
                                        </p>
                                    </div>

                                    {usage > 0 && (
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">Usage this month</span>
                                            <div className="flex items-center space-x-1">
                                                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full transition-narrative"
                                                        style={{ width: `${Math.min((usage / 50) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-foreground font-medium">{usage}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {categories?.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="FolderOpen" size={24} className="text-muted-foreground" />
                        </div>
                        <h3 className="font-medium text-foreground mb-2">No categories yet</h3>
                        <p className="text-sm text-muted-foreground">
                            Create your first category to start organizing your financial story.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryManager;