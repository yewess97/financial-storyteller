import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = 'Signing you in...' }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-8 max-w-sm mx-4 text-center">
                {/* Loading Animation */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-2 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="Shield" size={20} className="text-primary" />
                    </div>
                </div>

                {/* Loading Message */}
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {message}
                </h3>

                {/* Security Indicators */}
                <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-success">
                        <Icon name="CheckCircle" size={14} />
                        <span>Secure connection established</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-success">
                        <Icon name="Lock" size={14} />
                        <span>Verifying credentials</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>This may take a few seconds</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                    <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;