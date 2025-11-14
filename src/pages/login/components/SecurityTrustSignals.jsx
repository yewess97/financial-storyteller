import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityTrustSignals = () => {
    const securityFeatures = [
        {
            icon: 'Shield',
            title: 'Bank-Level Security',
            description: '256-bit SSL encryption protects your data'
        },
        {
            icon: 'Lock',
            title: 'Secure Authentication',
            description: 'Multi-factor authentication available'
        },
        {
            icon: 'Eye',
            title: 'Privacy Protected',
            description: 'Your financial data stays private'
        },
        {
            icon: 'CheckCircle',
            title: 'Verified Platform',
            description: 'SOC 2 Type II compliant'
        }];


    const certifications = [
        {
            name: 'SSL Certificate',
            badge: "https://img.rocket.new/generatedImages/rocket_gen_img_14e10994b-1762724888525.png",
            badgeAlt: 'SSL security certificate badge with green checkmark and lock icon'
        },
        {
            name: 'Financial Data Protection',
            badge: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf5df3ca-1762724889626.png",
            badgeAlt: 'Financial data protection certification badge with shield and bank symbols'
        },
        {
            name: 'SOC 2 Compliant',
            badge: "https://img.rocket.new/generatedImages/rocket_gen_img_1754de688-1762724890933.png",
            badgeAlt: 'SOC 2 compliance certification badge with official verification checkmark'
        }];


    return (
        <div className="space-y-8">
            {/* Security Features */}
            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Shield" size={20} className="text-success" />
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                        Your Security is Our Priority
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {securityFeatures?.map((feature, index) =>
                        <div key={index} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <Icon name={feature?.icon} size={16} className="text-success" />
                            </div>
                            <div>
                                <h4 className="font-medium text-foreground text-sm">
                                    {feature?.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {feature?.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Trust Badges */}
            <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-foreground text-sm mb-3 text-center">
                    Trusted & Certified
                </h4>
                <div className="flex items-center justify-center space-x-4">
                    {certifications?.map((cert, index) =>
                        <div key={index} className="text-center">
                            <div className="w-16 h-8 bg-white rounded border border-border flex items-center justify-center mb-1">
                                <img
                                    src={cert?.badge}
                                    alt={cert?.badgeAlt}
                                    className="w-12 h-6 object-contain" />

                            </div>
                            <p className="text-xs text-muted-foreground">
                                {cert?.name}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {/* Security Notice */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <Icon name="Info" size={16} className="text-primary mt-0.5" />
                    <div>
                        <p className="text-sm text-foreground">
                            <strong>Secure Connection:</strong> All data transmission is encrypted using industry-standard protocols. We never store your banking credentials.
                        </p>
                    </div>
                </div>
            </div>
        </div>);

};

export default SecurityTrustSignals;