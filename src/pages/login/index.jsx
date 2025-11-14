import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SecurityTrustSignals from './components/SecurityTrustSignals';
import LoadingOverlay from './components/LoadingOverlay';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if user is already authenticated
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-background">
            {/* Loading Overlay */}
            <LoadingOverlay isVisible={isLoading} />
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Side - Branding & Security (Desktop) */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 lg:p-12">
                    <div className="flex flex-col justify-center w-full max-w-lg mx-auto">
                        {/* Brand Header */}
                        <div className="mb-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-7 h-7 text-white"
                                    >
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                        <path d="M8 7h8" />
                                        <path d="M8 11h6" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="font-heading font-bold text-2xl text-foreground">
                                        Financial Storyteller
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Transform your finances into engaging stories
                                    </p>
                                </div>
                            </div>

                            {/* Value Proposition */}
                            <div className="space-y-4">
                                <h2 className="font-heading font-semibold text-xl text-foreground">
                                    Your Financial Journey Awaits
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Turn boring financial data into compelling narratives that motivate and inspire.
                                    Track expenses, set goals, and watch your financial story unfold with beautiful
                                    visualizations and personalized insights.
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="mt-8 space-y-3">
                                {[
                                    'Interactive financial timeline',
                                    'Story-driven expense tracking',
                                    'Personalized goal setting',
                                    'Beautiful data visualization'
                                ]?.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-3 h-3 text-white"
                                            >
                                                <polyline points="20,6 9,17 4,12" />
                                            </svg>
                                        </div>
                                        <span className="text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Trust Signals */}
                        <SecurityTrustSignals />
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                    <div className="w-full max-w-md">
                        {/* Mobile Brand Header */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-6 h-6 text-white"
                                    >
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                        <path d="M8 7h8" />
                                        <path d="M8 11h6" />
                                    </svg>
                                </div>
                                <h1 className="font-heading font-bold text-xl text-foreground">
                                    Financial Storyteller
                                </h1>
                            </div>
                        </div>

                        {/* Login Form Component */}
                        <LoginForm />

                        {/* Mobile Security Trust Signals */}
                        <div className="lg:hidden mt-8">
                            <SecurityTrustSignals />
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="bg-card border-t border-border py-6">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>&copy; {new Date()?.getFullYear()} Financial Storyteller</span>
                            <span>•</span>
                            <button className="hover:text-foreground transition-narrative">
                                Privacy Policy
                            </button>
                            <span>•</span>
                            <button className="hover:text-foreground transition-narrative">
                                Terms of Service
                            </button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 text-success"
                            >
                                <path d="M9 12l2 2 4-4" />
                                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.08 2.38" />
                            </svg>
                            <span>Secure & Encrypted</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;