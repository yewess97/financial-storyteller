import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const TimelineControls = ({
  currentView,
  onViewChange,
  onZoomIn,
  onZoomOut,
  onExport,
  canZoomIn,
  canZoomOut,
  onPrevPeriod,
  onNextPeriod,
  onGoToToday,
  visibleRangeLabel,
  animationStyle,
  onAnimationChange,
}) => {
  const viewOptions = [
    { value: "daily", label: "Daily", icon: "Calendar" },
    { value: "weekly", label: "Weekly", icon: "CalendarDays" },
    { value: "monthly", label: "Monthly", icon: "CalendarRange" },
    { value: "yearly", label: "Yearly", icon: "CalendarClock" },
  ];

  const animationOptions = [
    { value: "A", label: "Whole fade/slide" },
    { value: "B", label: "Per-item stagger" },
    { value: "C", label: "Carousel slide" },
    { value: "D", label: "Smooth scale/pop" },
  ];

  const animationOptionsValues = () =>
    animationOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ));

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-card border border-border rounded-lg p-4 mb-6 space-y-3 md:space-y-0">
      {/* Left: View Controls + Range */}
      <div className="flex items-center space-x-3 w-full md:w-auto">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={20} className="text-primary" />
          <span className="font-medium text-foreground mr-2">View:</span>

          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={currentView === option?.value ? "default" : "ghost"}
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
      </div>

      {/* Right: Zoom / Export / Nav / Animation */}
      <div className="flex items-center space-x-2 w-full md:w-auto">
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

        {/* Export */}
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
            onClick={onPrevPeriod}
          />

          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            title="Go to today"
            onClick={onGoToToday}
          />

          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            title="Next period"
            onClick={onNextPeriod}
          />
        </div>

        {/* Animation Style Picker */}
        <div className="flex items-center bg-muted rounded-lg p-1 px-2">
          <div className="text-xs text-muted-foreground mr-2">Animation</div>
          <Select
            value={animationStyle}
            onChange={onAnimationChange}
            options={animationOptions}
            placeholder="Select animation style"
            className="w-full"
          />
        </div>
      </div>

      {/* Mobile range label */}
      <div className="md:hidden text-sm text-muted-foreground">
        {visibleRangeLabel}
      </div>
    </div>
  );
};

export default TimelineControls;
