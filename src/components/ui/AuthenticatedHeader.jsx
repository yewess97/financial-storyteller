import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const AuthenticatedHeader = ({ user, onLogout, isCollapsed = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const navigationItems = [
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: 'LayoutDashboard',
            description: 'Your financial story hub'
        },
        {
            path: '/financial-story-timeline',
            label: 'My Story',
            icon: 'BookOpen',
            description: 'Your financial journey timeline'
        },
        {
            path: '/goal-setting-and-planning',
            label: 'Goals',
            icon: 'Target',
            description: 'Plan your financial future'
        },
        {
            path: '/expense-entry-and-management',
            label: 'Expenses',
            icon: 'Receipt',
            description: 'Track and manage spending'
        }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        onLogout();
        setIsUserMenuOpen(false);
    };

    const isActivePath = (path) => {
        return location?.pathname === path;
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-navigation">
            <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center space-x-3 transition-narrative hover:opacity-80"
                        >
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Icon name="BookOpen" size={20} color="white" />
                            </div>
                            <span className="font-heading font-semibold text-xl text-foreground">
                Financial Storyteller
              </span>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navigationItems?.map((item) => (
                            <button
                                key={item?.path}
                                onClick={() => handleNavigation(item?.path)}
                                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-narrative
                  ${isActivePath(item?.path)
                                    ? 'bg-primary text-primary-foreground shadow-warm-sm'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }
                `}
                                title={item?.description}
                            >
                                <Icon name={item?.icon} size={18} />
                                <span className="font-medium">{item?.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* User Menu & Mobile Toggle */}
                    <div className="flex items-center space-x-2">
                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-narrative"
                            >
                                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-secondary-foreground">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                                </div>
                                <span className="hidden sm:block font-medium text-foreground">
                  {user?.name || 'User'}
                </span>
                                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                            </button>

                            {/* User Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-warm-lg z-dropdown">
                                    <div className="p-2">
                                        <div className="px-3 py-2 border-b border-border">
                                            <p className="font-medium text-foreground">{user?.name || 'User'}</p>
                                            <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setIsUserMenuOpen(false);
                                            }}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-narrative"
                                        >
                                            <Icon name="User" size={16} />
                                            <span>Profile</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/settings');
                                                setIsUserMenuOpen(false);
                                            }}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-muted rounded-md transition-narrative"
                                        >
                                            <Icon name="Settings" size={16} />
                                            <span>Settings</span>
                                        </button>
                                        <hr className="my-2 border-border" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-destructive hover:text-destructive-foreground rounded-md transition-narrative"
                                        >
                                            <Icon name="LogOut" size={16} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-muted transition-narrative"
                        >
                            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-card">
                        <nav className="py-4 space-y-1">
                            {navigationItems?.map((item) => (
                                <button
                                    key={item?.path}
                                    onClick={() => handleNavigation(item?.path)}
                                    className={`
                    w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-narrative
                    ${isActivePath(item?.path)
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }
                  `}
                                >
                                    <Icon name={item?.icon} size={20} />
                                    <div>
                                        <div className="font-medium">{item?.label}</div>
                                        <div className="text-sm opacity-75">{item?.description}</div>
                                    </div>
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[-1] md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            {/* Overlay for user menu */}
            {isUserMenuOpen && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setIsUserMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default AuthenticatedHeader;