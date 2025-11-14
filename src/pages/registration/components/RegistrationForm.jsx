import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        agreeToPrivacy: false
    });
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: []
    });

    const validatePasswordStrength = (password) => {
        const checks = {
            length: password?.length >= 8,
            uppercase: /[A-Z]/?.test(password),
            lowercase: /[a-z]/?.test(password),
            number: /\d/?.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
        };

        const score = Object.values(checks)?.filter(Boolean)?.length;
        const feedback = [];

        if (!checks?.length) feedback?.push('At least 8 characters');
        if (!checks?.uppercase) feedback?.push('One uppercase letter');
        if (!checks?.lowercase) feedback?.push('One lowercase letter');
        if (!checks?.number) feedback?.push('One number');
        if (!checks?.special) feedback?.push('One special character');

        return { score, feedback };
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear field error when user starts typing
        if (errors?.[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }

        // Real-time password strength validation
        if (field === 'password') {
            setPasswordStrength(validatePasswordStrength(value));
        }

        // Real-time password confirmation validation
        if (field === 'confirmPassword' || (field === 'password' && formData?.confirmPassword)) {
            const passwordToCheck = field === 'password' ? value : formData?.password;
            const confirmPasswordToCheck = field === 'confirmPassword' ? value : formData?.confirmPassword;

            if (confirmPasswordToCheck && passwordToCheck !== confirmPasswordToCheck) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            } else {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Full name validation
        if (!formData?.fullName?.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData?.fullName?.trim()?.length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData?.email) {
            newErrors.email = 'Email address is required';
        } else if (!emailRegex?.test(formData?.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData?.password) {
            newErrors.password = 'Password is required';
        } else if (passwordStrength?.score < 3) {
            newErrors.password = 'Password is too weak. Please follow the requirements below.';
        }

        // Confirm password validation
        if (!formData?.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData?.password !== formData?.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms and privacy validation
        if (!formData?.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms of Service';
        }

        if (!formData?.agreeToPrivacy) {
            newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors)?.length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock successful registration
            console.log('Registration successful:', {
                fullName: formData?.fullName,
                email: formData?.email
            });

            // Navigate to dashboard after successful registration
            navigate('/dashboard');
        } catch (error) {
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength?.score <= 1) return 'bg-error';
        if (passwordStrength?.score <= 2) return 'bg-warning';
        if (passwordStrength?.score <= 3) return 'bg-accent';
        return 'bg-success';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength?.score <= 1) return 'Weak';
        if (passwordStrength?.score <= 2) return 'Fair';
        if (passwordStrength?.score <= 3) return 'Good';
        return 'Strong';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData?.fullName}
                onChange={(e) => handleInputChange('fullName', e?.target?.value)}
                error={errors?.fullName}
                required
                className="w-full"
            />
            {/* Email */}
            <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
                className="w-full"
            />
            {/* Password */}
            <div className="space-y-2">
                <div className="relative">
                    <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={formData?.password}
                        onChange={(e) => handleInputChange('password', e?.target?.value)}
                        error={errors?.password}
                        required
                        className="w-full pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-narrative"
                    >
                        <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                </div>

                {/* Password Strength Indicator */}
                {formData?.password && (
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                    style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
                                />
                            </div>
                            <span className={`text-sm font-medium ${
                                passwordStrength?.score <= 1 ? 'text-error' :
                                    passwordStrength?.score <= 2 ? 'text-warning' :
                                        passwordStrength?.score <= 3 ? 'text-accent' : 'text-success'
                            }`}>
                {getPasswordStrengthText()}
              </span>
                        </div>

                        {passwordStrength?.feedback?.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                                <span>Password must include: </span>
                                <span>{passwordStrength?.feedback?.join(', ')}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Confirm Password */}
            <div className="relative">
                <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData?.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                    error={errors?.confirmPassword}
                    required
                    className="w-full pr-12"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-narrative"
                >
                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
                </button>
            </div>
            {/* Terms and Privacy Checkboxes */}
            <div className="space-y-4">
                <Checkbox
                    label={
                        <span className="text-sm">
              I agree to the{' '}
                            <button
                                type="button"
                                onClick={() => window.open('/terms', '_blank')}
                                className="text-primary hover:underline font-medium"
                            >
                Terms of Service
              </button>
            </span>
                    }
                    checked={formData?.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
                    error={errors?.agreeToTerms}
                    required
                />

                <Checkbox
                    label={
                        <span className="text-sm">
              I agree to the{' '}
                            <button
                                type="button"
                                onClick={() => window.open('/privacy', '_blank')}
                                className="text-primary hover:underline font-medium"
                            >
                Privacy Policy
              </button>{' '}
                            and consent to the processing of my financial data
            </span>
                    }
                    checked={formData?.agreeToPrivacy}
                    onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
                    error={errors?.agreeToPrivacy}
                    required
                />
            </div>
            {/* Submit Error */}
            {errors?.submit && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <Icon name="AlertCircle" size={16} className="text-error" />
                        <span className="text-sm text-error">{errors?.submit}</span>
                    </div>
                </div>
            )}
            {/* Submit Button */}
            <Button
                type="submit"
                variant="default"
                loading={isLoading}
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            {/* Login Link */}
            <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Already have an account?{' '}
            <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary hover:underline font-medium"
            >
            Sign in here
          </button>
        </span>
            </div>
        </form>
    );
};

export default RegistrationForm;