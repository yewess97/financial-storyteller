import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityInfo = () => {
    const securityFeatures = [
        {
            icon: 'Shield',
            title: 'Bank-Level Encryption',
            description: 'Your financial data is protected with 256-bit SSL encryption, the same security used by major banks.'
        },
        {
            icon: 'Lock',
            title: 'Secure Data Storage',
            description: 'All personal and financial information is stored in encrypted databases with multiple security layers.'
        },
        {
            icon: 'Eye',
            title: 'Privacy First',
            description: 'We never sell your data. Your financial stories remain private and are only visible to you.'
        },
        {
            icon: 'UserCheck',
            title: 'Identity Protection',
            description: 'Multi-factor authentication and identity verification keep your account secure from unauthorized access.'
        }
    ];

    const trustSignals = [
        {
            icon: 'Award',
            text: 'SOC 2 Type II Certified'
        },
        {
            icon: 'Shield',
            text: 'PCI DSS Compliant'
        },
        {
            icon: 'CheckCircle',
            text: 'GDPR Compliant'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Main Security Message */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="ShieldCheck" size={32} className="text-primary" />
                </div>
                <div>
                    <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
                        Your Financial Data is Safe
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        We use industry-leading security measures to protect your personal and financial information.
                    </p>
                </div>
            </div>
            {/* Security Features */}
            <div className="space-y-6">
                <h3 className="font-heading font-medium text-lg text-foreground text-center">
                    Security & Privacy Features
                </h3>

                <div className="grid gap-4">
                    {securityFeatures?.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon name={feature?.icon} size={20} className="text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-foreground mb-1">
                                    {feature?.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature?.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Trust Signals */}
            <div className="space-y-4">
                <h3 className="font-heading font-medium text-lg text-foreground text-center">
                    Compliance & Certifications
                </h3>

                <div className="grid gap-3">
                    {trustSignals?.map((signal, index) => (
                        <div key={index} className="flex items-center space-x-3 justify-center">
                            <Icon name={signal?.icon} size={16} className="text-success" />
                            <span className="text-sm font-medium text-foreground">
                {signal?.text}
              </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Additional Privacy Info */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-2">
                    <Icon name="Info" size={18} className="text-primary" />
                    <h4 className="font-medium text-foreground">Data Usage Policy</h4>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                        • Your financial data is used solely to generate personalized financial stories and insights
                    </p>
                    <p>
                        • We never share your personal information with third parties without your explicit consent
                    </p>
                    <p>
                        • You maintain full control over your data and can delete your account at any time
                    </p>
                    <p>
                        • All data processing complies with international privacy regulations including GDPR and CCPA
                    </p>
                </div>
            </div>
            {/* Contact Support */}
            <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                    Questions about our security practices?
                </p>
                <button
                    type="button"
                    onClick={() => window.open('mailto:security@financialstoryteller.com', '_blank')}
                    className="text-primary hover:underline font-medium text-sm"
                >
                    Contact our Security Team
                </button>
            </div>
        </div>
    );
};

export default SecurityInfo;