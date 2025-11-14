import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExpenseList = ({ expenses, categories, onExpenseUpdate, onExpenseDelete, onBulkUpdate }) => {
    const [selectedExpenses, setSelectedExpenses] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [bulkCategory, setBulkCategory] = useState('');

    const categoryMap = categories?.reduce((acc, cat) => {
        acc[cat.id] = cat;
        return acc;
    }, {});

    const categoryOptions = [
        { value: '', label: 'All Categories' },
        ...categories?.map(cat => ({
            value: cat?.id,
            label: `${cat?.icon} ${cat?.name}`
        }))
    ];

    const sortOptions = [
        { value: 'date', label: 'Date (Newest First)' },
        { value: 'amount', label: 'Amount (Highest First)' },
        { value: 'category', label: 'Category' },
        { value: 'description', label: 'Description' }
    ];

    const filteredAndSortedExpenses = expenses?.filter(expense => !filterCategory || expense?.category === filterCategory)?.sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(b.date) - new Date(a.date);
            case 'amount':
                return b?.amount - a?.amount;
            case 'category':
                const catA = categoryMap?.[a?.category]?.name || '';
                const catB = categoryMap?.[b?.category]?.name || '';
                return catA?.localeCompare(catB);
            case 'description':
                return a?.description?.localeCompare(b?.description);
            default:
                return 0;
        }
    });

    const handleSelectExpense = (expenseId, checked) => {
        if (checked) {
            setSelectedExpenses(prev => [...prev, expenseId]);
        } else {
            setSelectedExpenses(prev => prev?.filter(id => id !== expenseId));
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedExpenses(filteredAndSortedExpenses?.map(exp => exp?.id));
        } else {
            setSelectedExpenses([]);
        }
    };

    const handleBulkCategoryUpdate = () => {
        if (bulkCategory && selectedExpenses?.length > 0) {
            onBulkUpdate?.(selectedExpenses, { category: bulkCategory });
            setSelectedExpenses([]);
            setBulkCategory('');
            setShowBulkActions(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString)?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(amount);
    };

    const getStoryContext = (expense) => {
        const category = categoryMap?.[expense?.category];
        const daysSince = Math.floor((new Date() - new Date(expense.date)) / (1000 * 60 * 60 * 24));

        if (daysSince === 0) {
            return "Today's chapter";
        } else if (daysSince === 1) {
            return "Yesterday's story";
        } else if (daysSince < 7) {
            return `${daysSince} days ago`;
        } else {
            return `${Math.floor(daysSince / 7)} weeks ago`;
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg shadow-warm">
            <div className="p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-heading font-semibold text-xl text-foreground">
                            Your Financial Story
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {expenses?.length} chapters in your expense journey
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <Select
                            placeholder="Filter by category"
                            options={categoryOptions}
                            value={filterCategory}
                            onChange={setFilterCategory}
                            className="w-full sm:w-48"
                        />
                        <Select
                            placeholder="Sort by"
                            options={sortOptions}
                            value={sortBy}
                            onChange={setSortBy}
                            className="w-full sm:w-48"
                        />
                    </div>
                </div>

                {selectedExpenses?.length > 0 && (
                    <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-2">
                                <Icon name="CheckSquare" size={16} className="text-primary" />
                                <span className="text-sm font-medium text-foreground">
                  {selectedExpenses?.length} expense{selectedExpenses?.length !== 1 ? 's' : ''} selected
                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                {!showBulkActions ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowBulkActions(true)}
                                        iconName="Edit"
                                        iconPosition="left"
                                    >
                                        Bulk Edit
                                    </Button>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Select
                                            placeholder="New category"
                                            options={categories?.map(cat => ({
                                                value: cat?.id,
                                                label: `${cat?.icon} ${cat?.name}`
                                            }))}
                                            value={bulkCategory}
                                            onChange={setBulkCategory}
                                            className="w-48"
                                        />
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={handleBulkCategoryUpdate}
                                            disabled={!bulkCategory}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setShowBulkActions(false);
                                                setBulkCategory('');
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-6">
                {filteredAndSortedExpenses?.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="BookOpen" size={24} className="text-muted-foreground" />
                        </div>
                        <h3 className="font-medium text-foreground mb-2">No expenses found</h3>
                        <p className="text-sm text-muted-foreground">
                            {filterCategory ? 'No expenses in this category yet.' : 'Start adding expenses to build your financial story.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <div className="flex items-center space-x-4 p-3 border-b border-border">
                            <Checkbox
                                checked={selectedExpenses?.length === filteredAndSortedExpenses?.length}
                                onChange={(e) => handleSelectAll(e?.target?.checked)}
                            />
                            <span className="text-sm font-medium text-muted-foreground">Select All</span>
                        </div>

                        {filteredAndSortedExpenses?.map((expense) => {
                            const category = categoryMap?.[expense?.category];
                            const isSelected = selectedExpenses?.includes(expense?.id);

                            return (
                                <div
                                    key={expense?.id}
                                    className={`
                    flex items-center space-x-4 p-4 rounded-lg border transition-narrative
                    ${isSelected
                                        ? 'bg-primary/5 border-primary/20' :'bg-background border-border hover:bg-muted/50'
                                    }
                  `}
                                >
                                    <Checkbox
                                        checked={isSelected}
                                        onChange={(e) => handleSelectExpense(expense?.id, e?.target?.checked)}
                                    />
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                         style={{ backgroundColor: `${category?.color}20` }}>
                                        <span className="text-lg">{category?.icon || '📦'}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-foreground truncate">
                                                    {expense?.description}
                                                </h4>
                                                <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {category?.name || 'Uncategorized'}
                          </span>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-sm text-muted-foreground">
                            {getStoryContext(expense)}
                          </span>
                                                </div>
                                                {expense?.narrative && (
                                                    <p className="text-sm text-muted-foreground mt-1 italic">
                                                        "{expense?.narrative}"
                                                    </p>
                                                )}
                                            </div>

                                            <div className="text-right ml-4">
                                                <div className="font-semibold text-foreground">
                                                    {formatAmount(expense?.amount)}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatDate(expense?.date)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onExpenseUpdate?.(expense?.id)}
                                            iconName="Edit"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onExpenseDelete?.(expense?.id)}
                                            iconName="Trash2"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;