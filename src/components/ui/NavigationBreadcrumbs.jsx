import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = ({ className = '' }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const breadcrumbMap = {
        '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
        '/financial-story-timeline': { label: 'My Story', icon: 'BookOpen' },
        '/goal-setting-and-planning': { label: 'Goals', icon: 'Target' },
        '/expense-entry-and-management': { label: 'Expenses', icon: 'Receipt' },
        '/login': { label: 'Sign In', icon: 'LogIn' },
        '/registration': { label: 'Create Account', icon: 'UserPlus' },
        '/profile': { label: 'Profile', icon: 'User' },
        '/settings': { label: 'Settings', icon: 'Settings' }
    };

    const generateBreadcrumbs = () => {
        const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
        const breadcrumbs = [{ path: '/dashboard', label: 'Dashboard', icon: 'Home' }];

        if (location?.pathname === '/dashboard') {
            return [{ path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard', current: true }];
        }

        let currentPath = '';
        pathSegments?.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const breadcrumbInfo = breadcrumbMap?.[currentPath];

            if (breadcrumbInfo) {
                breadcrumbs?.push({
                    path: currentPath,
                    label: breadcrumbInfo?.label,
                    icon: breadcrumbInfo?.icon,
                    current: index === pathSegments?.length - 1
                });
            }
        });

        return breadcrumbs?.length > 1 ? breadcrumbs : breadcrumbs?.slice(-1);
    };

    const breadcrumbs = generateBreadcrumbs();

    if (breadcrumbs?.length <= 1 && location?.pathname === '/dashboard') {
        return null;
    }

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {breadcrumbs?.map((crumb, index) => (
                    <li key={crumb?.path} className="flex items-center">
                        {index > 0 && (
                            <Icon
                                name="ChevronRight"
                                size={14}
                                className="text-muted-foreground mx-2"
                            />
                        )}

                        {crumb?.current ? (
                            <div className="flex items-center space-x-2 text-foreground font-medium">
                                <Icon name={crumb?.icon} size={16} className="text-primary" />
                                <span>{crumb?.label}</span>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleNavigation(crumb?.path)}
                                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-narrative rounded-md px-2 py-1 hover:bg-muted"
                            >
                                <Icon name={crumb?.icon} size={16} />
                                <span>{crumb?.label}</span>
                            </button>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default NavigationBreadcrumbs;