import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedHeader from "../../components/ui/AuthenticatedHeader";
import NavigationBreadcrumbs from "../../components/ui/NavigationBreadcrumbs";
import QuickActionFloatingButton from "../../components/ui/QuickActionFloatingButton";
import TimelineFilter from "./components/TimelineFilter";
import TimelineNode from "./components/TimelineNode";
import TimelineControls from "./components/TimelineControls";
import StoryChapterCard from "./components/StoryChapterCard";
import TimelineSummaryCard from "./components/TimelineSummaryCard";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const FinancialStoryTimeline = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Yousif Shrouk Youstina Mayar",
    email: "nextteam@email.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-w-a96zAlaiKoPP_p9ekJ8yAG483wUvdniQ&s",
    avatarAlt: "Next Academy - DEPI React - R3 - Assiut",
  });

  // FILTERS
  const [filters, setFilters] = useState({
    category: "all",
    timeRange: "month",
    storyTheme: "all",
    amountRange: "all",
    showMilestones: false,
  });

  // VIEW / NAVIGATION
  const [currentView, setCurrentView] = useState("weekly");
  const [centerDate, setCenterDate] = useState(new Date());
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [activeChapterId, setActiveChapterId] = useState("current");

  // ANIMATION
  const [animationStyle, setAnimationStyle] = useState("A"); // 'A'|'B'|'C'|'D'
  const [animKey, setAnimKey] = useState(0); // bump to retrigger
  const [animDirection, setAnimDirection] = useState("forward"); // 'forward' | 'backward'
  const animTimerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // sample events (unchanged)
  const timelineEvents = [
    {
      id: 1,
      date: "2024-11-09",
      title: "Morning Coffee & Productivity Boost",
      category: "food",
      type: "expense",
      amount: 4.75,
      storyText: `Started your Saturday with a perfect cappuccino at Corner Café. This small ritual has become part of your weekend routine, setting a positive tone for productive days ahead.`,
      location: "Corner Café, Downtown",
      paymentMethod: "Credit Card",
      tags: ["routine", "weekend", "productivity"],
      insights:
        "Your weekend coffee spending averages $15/week, which aligns well with your entertainment budget allocation.",
      isMilestone: false,
    },
    {
      id: 2,
      date: "2024-11-08",
      title: "Grocery Shopping Success Story",
      category: "food",
      type: "expense",
      amount: 127.43,
      storyText: `A well-planned grocery trip that stayed within budget! You successfully used your shopping list and avoided impulse purchases, demonstrating growing financial discipline.`,
      location: "Fresh Market",
      paymentMethod: "Debit Card",
      tags: ["budgeting", "planning", "success"],
      insights:
        "You've reduced grocery spending by 15% this month through better planning and list-making.",
      isMilestone: true,
    },
    {
      id: 3,
      date: "2024-11-07",
      title: "Freelance Project Payment Received",
      category: "income",
      type: "income",
      amount: 850.0,
      storyText: `Excellent news! Your web design project payment came through ahead of schedule. This extra income brings you closer to your emergency fund goal and validates your side hustle strategy.`,
      location: "Bank Transfer",
      paymentMethod: "Direct Deposit",
      tags: ["freelance", "achievement", "goal-progress"],
      insights:
        "This freelance income represents 23% of your monthly target for side earnings. You're building a strong secondary income stream.",
      isMilestone: true,
    },
    {
      id: 4,
      date: "2024-11-06",
      title: "Monthly Gym Membership Investment",
      category: "healthcare",
      type: "expense",
      amount: 45.0,
      storyText: `Your monthly fitness investment renewed automatically. This consistent commitment to health represents a smart long-term investment in your wellbeing and future healthcare savings.`,
      location: "FitLife Gym",
      paymentMethod: "Auto-pay",
      tags: ["health", "investment", "routine"],
      insights:
        "Regular exercise can reduce healthcare costs by up to 30% over time, making this a financially smart choice.",
      isMilestone: false,
    },
    {
      id: 5,
      date: "2024-11-05",
      title: "Emergency Fund Milestone Achieved!",
      category: "savings",
      type: "savings",
      amount: 500.0,
      storyText: `Congratulations! You've reached your $5,000 emergency fund goal three months ahead of schedule. This achievement represents months of disciplined saving and smart financial choices.`,
      location: "High-Yield Savings Account",
      paymentMethod: "Auto Transfer",
      tags: ["milestone", "achievement", "emergency-fund"],
      insights:
        "Reaching this goal puts you ahead of 60% of Americans who don't have adequate emergency savings. Excellent financial progress!",
      isMilestone: true,
    },
    {
      id: 6,
      date: "2024-11-04",
      title: "Movie Night Entertainment",
      category: "entertainment",
      type: "expense",
      amount: 28.5,
      storyText: `Enjoyed a relaxing movie night with friends. You chose the matinee showing and shared snacks, demonstrating how you can enjoy entertainment while staying budget-conscious.`,
      location: "Cinema Plaza",
      paymentMethod: "Credit Card",
      tags: ["social", "entertainment", "budget-friendly"],
      insights:
        "Your entertainment spending this month is 20% below budget, leaving room for additional social activities.",
      isMilestone: false,
    },
  ];

  const storyChapters = [
    {
      id: "past",
      title: "Foundation Building",
      type: "past",
      period: "Jan - Aug 2024",
      summary: `The beginning of your financial transformation journey. You established emergency savings, created your first budget, and began tracking expenses systematically.`,
      eventCount: 156,
      totalAmount: 2340.5,
      highlights: [
        "Built first emergency fund",
        "Reduced dining out by 40%",
        "Started freelance income stream",
        "Paid off credit card debt",
      ],
      isNew: false,
    },
    {
      id: "current",
      title: "Growth & Optimization",
      type: "present",
      period: "Sep - Nov 2024",
      summary: `Your current chapter focuses on optimizing spending habits and accelerating savings. You've achieved major milestones and are building momentum toward bigger goals.`,
      eventCount: 89,
      totalAmount: 1875.25,
      highlights: [
        "Emergency fund goal achieved",
        "Freelance income increased 35%",
        "Investment account opened",
        "Vacation fund started",
      ],
      isNew: true,
    },
    {
      id: "future",
      title: "Wealth Building",
      type: "future",
      period: "Dec 2024 - Beyond",
      summary: `The next chapter of your financial story focuses on investment growth, property ownership goals, and building long-term wealth for financial independence.`,
      eventCount: 0,
      totalAmount: 0,
      highlights: [
        "House down payment goal",
        "Investment portfolio growth",
        "Retirement planning optimization",
        "Multiple income streams",
      ],
      isNew: false,
    },
  ];

  const summaryData = {
    period: "November 2024",
    totalEvents: 47,
    totalIncome: 3250.0,
    totalExpenses: 2180.75,
    netSavings: 1069.25,
    incomeGrowth: 12,
    expenseGrowth: 8,
    savingsRate: 33,
    milestones: 3,
    newMilestones: 2,
    storyNarrative: `November has been a remarkable month in your financial journey! You've successfully balanced enjoying life with smart financial decisions. Your emergency fund milestone achievement shows incredible discipline, while your growing freelance income demonstrates entrepreneurial success. The key theme this month has been 'balanced growth' - you're saving aggressively while still investing in experiences and health.`,
    storyTags: ["Achievement", "Balance", "Growth", "Discipline", "Success"],
    goalProgress: [
      {
        name: "Emergency Fund",
        current: 5000,
        target: 5000,
        percentage: 100,
        timeLeft: "Completed!",
      },
      {
        name: "Vacation Fund",
        current: 1200,
        target: 2500,
        percentage: 48,
        timeLeft: "4 months",
      },
      {
        name: "Investment Account",
        current: 750,
        target: 1000,
        percentage: 75,
        timeLeft: "2 months",
      },
    ],
  };

  // helpers ----------------------------------------------------------------

  // compute visible start and end from centerDate + currentView
  const computeWindow = (center, view) => {
    const start = new Date(center.getTime());
    const end = new Date(center.getTime());
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    if (view === "daily") {
      // start/end already set to day
      return { start, end };
    }
    if (view === "weekly") {
      // week starts on Sunday (like previous code)
      const day = center.getDay();
      start.setDate(center.getDate() - day);
      end.setDate(start.getDate() + 6);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
    if (view === "monthly") {
      start.setDate(1);
      end.setMonth(center.getMonth() + 1, 0); // last day of month
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
    if (view === "yearly") {
      start.setMonth(0, 1);
      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
    return { start, end };
  };

  const formatRangeLabel = (center, view) => {
    const { start, end } = computeWindow(center, view);
    const opts = { month: "short", day: "numeric", year: "numeric" };
    if (view === "daily") return start.toLocaleDateString("en-US", opts);
    if (view === "weekly") {
      const s = start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const e = end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `${s} — ${e}`;
    }
    if (view === "monthly")
      return center.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    if (view === "yearly") return center.getFullYear().toString();
    return "";
  };

  // add/sub helpers for prev/next
  const addToDate = (date, amount, unit) => {
    const d = new Date(date.getTime());
    if (unit === "day") d.setDate(d.getDate() + amount);
    if (unit === "week") d.setDate(d.getDate() + 7 * amount);
    if (unit === "month") d.setMonth(d.getMonth() + amount);
    if (unit === "year") d.setFullYear(d.getFullYear() + amount);
    return d;
  };

  // navigation handlers
  const handlePrevPeriod = () => {
    const unit =
      currentView === "daily"
        ? "day"
        : currentView === "weekly"
        ? "week"
        : currentView === "monthly"
        ? "month"
        : "year";
    setCenterDate((cd) => {
      setAnimDirection("backward");
      return addToDate(cd, -1, unit);
    });
    triggerAnimation();
  };

  const handleNextPeriod = () => {
    const unit =
      currentView === "daily"
        ? "day"
        : currentView === "weekly"
        ? "week"
        : currentView === "monthly"
        ? "month"
        : "year";
    setCenterDate((cd) => {
      setAnimDirection("forward");
      return addToDate(cd, 1, unit);
    });
    triggerAnimation();
  };

  const handleGoToToday = () => {
    setAnimDirection("forward");
    setCenterDate(new Date());
    triggerAnimation();
  };

  // animation trigger
  function triggerAnimation() {
    setIsAnimating(true);
    setAnimKey((k) => k + 1);
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    // keep animation state for 500ms
    animTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }

  useEffect(() => {
    return () => {
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, []);

  // filter helpers ---------------------------------------------------------

  const getDateRangeFromFilter = (range) => {
    // returns {start,end} or null for 'all'
    const today = new Date();
    const start = new Date(today.getTime());
    start.setHours(0, 0, 0, 0);

    if (!range || range === "all") return null;
    if (range === "today") return { start, end: today };

    if (range === "week") {
      const day = today.getDay();
      start.setDate(today.getDate() - day);
      start.setHours(0, 0, 0, 0);
      return { start, end: today };
    }
    if (range === "month") {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      return { start, end: today };
    }
    if (range === "quarter") {
      const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
      start.setMonth(quarterStartMonth, 1);
      start.setHours(0, 0, 0, 0);
      return { start, end: today };
    }
    if (range === "year") {
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      return { start, end: today };
    }
    return null;
  };

  // compute visible events: apply filters + window (centerDate/currentView)
  const visibleWindow = useMemo(
    () => computeWindow(centerDate, currentView),
    [centerDate, currentView]
  );

  const filteredEvents = useMemo(() => {
    const rangeFromFilter = getDateRangeFromFilter(filters.timeRange);

    return timelineEvents.filter((event) => {
      const eventDate = new Date(event.date);

      // Category
      if (filters.category !== "all" && event.category !== filters.category)
        return false;

      // Story Theme
      if (filters.storyTheme !== "all") {
        if (filters.storyTheme === "achievements" && !event.isMilestone)
          return false;
        if (filters.storyTheme === "milestones" && !event.isMilestone)
          return false;
      }

      // Milestones toggle
      if (filters.showMilestones && !event.isMilestone) return false;

      // Amount Range
      const amount = Math.abs(event.amount || 0);
      if (filters.amountRange === "small" && amount > 50) return false;
      if (filters.amountRange === "medium" && (amount < 50 || amount > 200))
        return false;
      if (filters.amountRange === "large" && amount < 200) return false;

      // Time range filter
      if (rangeFromFilter) {
        if (
          eventDate < rangeFromFilter.start ||
          eventDate > rangeFromFilter.end
        )
          return false;
      }

      return true;
    });
  }, [timelineEvents, filters]);

  // visible range label for controls
  const visibleRangeLabel = formatRangeLabel(centerDate, currentView);

  // zoom handlers
  const handleViewChange = (view) => {
    setCurrentView(view);
    triggerAnimation();
  };

  const handleZoomIn = () => {
    const zoomOrder = ["yearly", "monthly", "weekly", "daily"];
    const currentIndex = zoomOrder.indexOf(currentView);
    if (currentIndex < zoomOrder.length - 1) {
      const next = zoomOrder[currentIndex + 1];
      setCurrentView(next);
      triggerAnimation();
    }
  };

  const handleZoomOut = () => {
    const zoomOrder = ["yearly", "monthly", "weekly", "daily"];
    const currentIndex = zoomOrder.indexOf(currentView);
    if (currentIndex > 0) {
      const prev = zoomOrder[currentIndex - 1];
      setCurrentView(prev);
      triggerAnimation();
    }
  };

  const canZoomIn = currentView !== "daily";
  const canZoomOut = currentView !== "yearly";

  // small utilities for animation classes
  const containerBase = "relative overflow-hidden";
  const innerBase = "transition-all duration-400 ease-out";

  const makeContainerClass = () => {
    if (!isAnimating) return "opacity-100 translate-x-0";
    // decide class from animationStyle
    if (animationStyle === "A") {
      return (
        "opacity-0 " +
        (animDirection === "forward" ? "translate-x-4" : "-translate-x-4")
      );
    }
    if (animationStyle === "C") {
      // for carousel, translate off-screen
      return animDirection === "forward"
        ? "-translate-x-8 opacity-0"
        : "translate-x-8 opacity-0";
    }
    if (animationStyle === "D") {
      return "opacity-0 scale-95";
    }
    // default fallback
    return "opacity-0 translate-y-2";
  };

  // Node-level class generator for style B (per-item stagger)
  const nodeClassForIndex = (index) => {
    if (animationStyle === "B") {
      // while animating nodes will start slightly lower and fade in, staggered by index
      return `transform transition-all duration-400 ease-out ${
        isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`;
    }
    // other styles get a neutral class (animation handled at container)
    return "";
  };

  // handle node click
  const handleNodeClick = (eventId) => {
    setExpandedEventId((prev) => (prev === eventId ? null : eventId));
  };

  // export mock
  const handleExport = () => {
    alert("Your financial story has been exported successfully!");
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // optionally move window to now when filter changes; keep current behavior
  };

  const handleAnimationChange = (style) => {
    setAnimationStyle(style);
    // small visual trigger
    triggerAnimation();
  };

  // Render -----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader user={user} onLogout={() => navigate("/login")} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <NavigationBreadcrumbs className="mb-6" />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                Your Financial Story Timeline
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover the narrative behind your financial journey through
                interactive storytelling
              </p>
            </div>

            <Button
              variant="default"
              onClick={() => navigate("/dashboard")}
              iconName="LayoutDashboard"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Story Chapters */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="BookOpen" size={24} className="text-primary" />
              <h2 className="font-heading font-bold text-xl text-foreground">
                Story Chapters
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storyChapters?.map((chapter) => (
                <StoryChapterCard
                  key={chapter?.id}
                  chapter={chapter}
                  onChapterClick={(id) => setActiveChapterId(id)}
                  isActive={activeChapterId === chapter?.id}
                />
              ))}
            </div>
          </div>

          {/* Summary */}
          <TimelineSummaryCard
            summaryData={summaryData}
            onNavigateToGoals={() => navigate("/goal-setting-and-planning")}
            onNavigateToExpenses={() =>
              navigate("/expense-entry-and-management")
            }
          />

          {/* Filters */}
          <TimelineFilter
            onFilterChange={handleFilterChange}
            activeFilters={filters}
          />

          {/* Controls (now exposes range label and animation controls) */}
          <TimelineControls
            currentView={currentView}
            onViewChange={handleViewChange}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onExport={handleExport}
            canZoomIn={canZoomIn}
            canZoomOut={canZoomOut}
            onPrevPeriod={handlePrevPeriod}
            onNextPeriod={handleNextPeriod}
            onGoToToday={handleGoToToday}
            visibleRangeLabel={visibleRangeLabel}
            animationStyle={animationStyle}
            onAnimationChange={handleAnimationChange}
          />

          {/* Timeline content */}
          <div
            className={`${containerBase} bg-card border border-border rounded-lg p-6`}
          >
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Icon
                  name="Calendar"
                  size={48}
                  className="text-muted-foreground mx-auto mb-4"
                />
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  No Events Found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or navigating to another period to
                  see more of your financial story.
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      category: "all",
                      timeRange: "all",
                      storyTheme: "all",
                      amountRange: "all",
                      showMilestones: false,
                    })
                  }
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              // Wrapper that animates depending on style
              <div
                key={`anim-${animKey}`} // force rekey on animation trigger for some styles
                className={`${innerBase} ${makeContainerClass()}`}
              >
                <div className="space-y-0">
                  {filteredEvents.map((event, index) => (
                    <div
                      key={event.id}
                      // per-item stagger for B
                      className={nodeClassForIndex(index)}
                      style={
                        animationStyle === "B"
                          ? { transitionDelay: `${index * 60}ms` }
                          : {}
                      }
                    >
                      <TimelineNode
                        event={event}
                        isLast={index === filteredEvents.length - 1}
                        onNodeClick={handleNodeClick}
                        isExpanded={expandedEventId === event.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredEvents.length > 0 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="right"
              >
                Load Earlier Events
              </Button>
            </div>
          )}
        </div>
      </main>

      <QuickActionFloatingButton
        onExpenseAdded={(d) => console.log("New expense", d)}
      />
    </div>
  );
};

export default FinancialStoryTimeline;
