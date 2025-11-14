import React from 'react';
import WelcomeHeader from './components/WelcomeHeader';
import RegistrationForm from './components/RegistrationForm';
import SecurityInfo from './components/SecurityInfo';

const Registration = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Main Container */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Side - Welcome & Form */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 px-4 py-8 lg:px-8 lg:py-12">
                        <div className="max-w-md mx-auto space-y-8">
                            {/* Welcome Header */}
                            <WelcomeHeader />

                            {/* Registration Form */}
                            <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-warm">
                                <div className="mb-6">
                                    <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
                                        Create Your Account
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Join thousands of users who have transformed their financial journey
                                    </p>
                                </div>

                                <RegistrationForm />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="px-4 py-6 lg:px-8 border-t border-border bg-muted/30">
                        <div className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <button
                                        onClick={() => window.open('/terms', '_blank')}
                                        className="hover:text-foreground transition-narrative"
                                    >
                                        Terms
                                    </button>
                                    <button
                                        onClick={() => window.open('/privacy', '_blank')}
                                        className="hover:text-foreground transition-narrative"
                                    >
                                        Privacy
                                    </button>
                                    <button
                                        onClick={() => window.open('/support', '_blank')}
                                        className="hover:text-foreground transition-narrative"
                                    >
                                        Support
                                    </button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    © {new Date()?.getFullYear()} Financial Storyteller
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>

                {/* Right Side - Security Information */}
                <div className="lg:w-96 bg-muted/20 border-l border-border">
                    <div className="h-full px-6 py-8 lg:px-8 lg:py-12">
                        <div className="sticky top-8">
                            <SecurityInfo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;