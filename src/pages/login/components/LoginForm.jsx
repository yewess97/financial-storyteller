import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Mock credentials for demonstration
    const mockCredentials = {
        email: 'next@financialstoryteller.com',
        password: 'NextStoryTeller2025!'
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors?.[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData?.email) {
            newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData?.password) {
            newErrors.password = 'Password is required';
        } else if (formData?.password?.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Check credentials
            if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
                // Store user session
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify({
                    name: 'Sarah Johnson',
                    email: formData?.email,
                    joinDate: '2024-01-15'
                }));

                navigate('/dashboard');
            } else {
                setErrors({
                    general: `Invalid credentials. Use next@financialstoryteller.com / NextStoryTeller2025!`
                });
            }
        } catch (error) {
            setErrors({
                general: 'Connection error. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        alert('Password reset functionality would be implemented here. For demo, use: NextStoryTeller2025!');
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-card border border-border rounded-lg shadow-warm-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="BookOpen" size={32} color="white" />
                    </div>
                    <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-muted-foreground">
                        Sign in to continue your financial story
                    </p>
                </div>

                {/* General Error */}
                {errors?.general && (
                    <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <Icon name="AlertCircle" size={16} className="text-error" />
                            <p className="text-sm text-error font-medium">{errors?.general}</p>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        value={formData?.email}
                        onChange={(e) => handleInputChange('email', e?.target?.value)}
                        error={errors?.email}
                        required
                        disabled={isLoading}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData?.password}
                        onChange={(e) => handleInputChange('password', e?.target?.value)}
                        error={errors?.password}
                        required
                        disabled={isLoading}
                    />

                    <div className="flex items-center justify-between">
                        <Checkbox
                            label="Remember me"
                            checked={formData?.rememberMe}
                            onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
                            disabled={isLoading}
                        />

                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-primary hover:text-primary/80 transition-narrative"
                            disabled={isLoading}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <Button
                        type="submit"
                        variant="default"
                        fullWidth
                        loading={isLoading}
                        disabled={isLoading}
                        iconName="LogIn"
                        iconPosition="left"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                    <div className="flex-1 border-t border-border"></div>
                    <span className="px-4 text-sm text-muted-foreground">or</span>
                    <div className="flex-1 border-t border-border"></div>
                </div>

                {/* Create Account */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                        Don't have an account?
                    </p>
                    <Button
                        variant="outline"
                        fullWidth
                        onClick={() => navigate('/registration')}
                        iconName="UserPlus"
                        iconPosition="left"
                        disabled={isLoading}
                    >
                        Create Account
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;