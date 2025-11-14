import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineControls = ({
                              currentView,
                              onViewChange,
                              onZoomIn,
                              onZoomOut,
                              onExport,
                              canZoomIn,
                              canZoomOut
                          }) => {
    const viewOptions = [
        { value: 'daily', label: 'Daily', icon: 'Calendar' },
        { value: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
        { value: 'monthly', label: 'Monthly', icon: 'CalendarRange' },
        { value: 'yearly', label: 'Yearly', icon: 'CalendarClock' }
    ];

    return (
        <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 mb-6">
            {/* View Controls */}
            <div className="flex items-center space-x-2">
                <Icon name="Eye" size={20} className="text-primary" />
                <span className="font-medium text-foreground mr-2">View:</span>

                <div className="flex items-center bg-muted rounded-lg p-1">
                    {viewOptions?.map((option) => (
                        <Button
                            key={option?.value}
                            variant={currentView === option?.value ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onViewChange(option?.value)}
                            iconName={option?.icon}
                            iconPosition="left"
                            className="mx-0.5"
                        >
                            {option?.label}
                        </Button>
                    ))}
                </div>
            </div>
            {/* Zoom and Export Controls */}
            <div className="flex items-center space-x-2">
                {/* Zoom Controls */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onZoomOut}
                        disabled={!canZoomOut}
                        iconName="ZoomOut"
                        title="Zoom out to see more events"
                    />

                    <div className="px-2 py-1">
                        <Icon name="Search" size={16} className="text-muted-foreground" />
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onZoomIn}
                        disabled={!canZoomIn}
                        iconName="ZoomIn"
                        title="Zoom in for more details"
                    />
                </div>

                {/* Export Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onExport}
                    iconName="Download"
                    iconPosition="left"
                >
                    Export Story
                </Button>

                {/* Navigation Buttons */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        iconName="ChevronLeft"
                        title="Previous period"
                    />

                    <Button
                        variant="ghost"
                        size="sm"
                        iconName="RotateCcw"
                        title="Go to today"
                    />

                    <Button
                        variant="ghost"
                        size="sm"
                        iconName="ChevronRight"
                        title="Next period"
                    />
                </div>
            </div>
        </div>
    );
};

export default TimelineControls;