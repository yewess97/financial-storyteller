import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center space-y-6">
            {/* Logo */}
            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center space-x-3 transition-narrative hover:opacity-80"
            >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Icon name="BookOpen" size={24} color="white" />
                </div>
                <span className="font-heading font-bold text-2xl text-foreground">
          Financial Storyteller
        </span>
            </button>

            {/* Welcome Message */}
            <div className="space-y-4">
                <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
                    Start Your Financial Story
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Transform your financial data into engaging stories that motivate and inspire better money decisions.
                </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="flex flex-col items-center space-y-2 p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="TrendingUp" size={20} className="text-primary" />
                    </div>
                    <div className="text-center">
                        <h3 className="font-medium text-foreground text-sm">
                            Track Progress
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Visualize your financial journey
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-2 p-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Target" size={20} className="text-secondary" />
                    </div>
                    <div className="text-center">
                        <h3 className="font-medium text-foreground text-sm">
                            Set Goals
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Plan your financial future
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-2 p-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="Sparkles" size={20} className="text-accent" />
                    </div>
                    <div className="text-center">
                        <h3 className="font-medium text-foreground text-sm">
                            Stay Motivated
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Engaging financial narratives
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeHeader;