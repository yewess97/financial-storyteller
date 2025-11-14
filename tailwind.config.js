/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: 'var(--color-border)', /* minimal border */
                input: 'var(--color-input)', /* pure white */
                ring: 'var(--color-ring)', /* deep trust blue */
                background: 'var(--color-background)', /* warm off-white */
                foreground: 'var(--color-foreground)', /* rich charcoal */
                primary: {
                    DEFAULT: 'var(--color-primary)', /* deep trust blue */
                    foreground: 'var(--color-primary-foreground)', /* white */
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)', /* sophisticated purple */
                    foreground: 'var(--color-secondary-foreground)', /* white */
                },
                destructive: {
                    DEFAULT: 'var(--color-destructive)', /* clear red */
                    foreground: 'var(--color-destructive-foreground)', /* white */
                },
                muted: {
                    DEFAULT: 'var(--color-muted)', /* gray-50 */
                    foreground: 'var(--color-muted-foreground)', /* balanced gray */
                },
                accent: {
                    DEFAULT: 'var(--color-accent)', /* warm amber */
                    foreground: 'var(--color-accent-foreground)', /* rich charcoal */
                },
                popover: {
                    DEFAULT: 'var(--color-popover)', /* pure white */
                    foreground: 'var(--color-popover-foreground)', /* rich charcoal */
                },
                card: {
                    DEFAULT: 'var(--color-card)', /* pure white */
                    foreground: 'var(--color-card-foreground)', /* rich charcoal */
                },
                success: {
                    DEFAULT: 'var(--color-success)', /* confident green */
                    foreground: 'var(--color-success-foreground)', /* white */
                },
                warning: {
                    DEFAULT: 'var(--color-warning)', /* thoughtful orange */
                    foreground: 'var(--color-warning-foreground)', /* white */
                },
                error: {
                    DEFAULT: 'var(--color-error)', /* clear red */
                    foreground: 'var(--color-error-foreground)', /* white */
                },
                surface: 'var(--color-surface)', /* pure white */
            },
            fontFamily: {
                'sans': ['Source Sans 3', 'sans-serif'],
                'heading': ['Inter', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace'],
            },
            fontWeight: {
                'normal': '400',
                'medium': '500',
                'semibold': '600',
                'bold': '700',
            },
            borderRadius: {
                'sm': 'var(--radius-sm)',
                'DEFAULT': 'var(--radius)',
                'md': 'var(--radius-md)',
                'lg': 'var(--radius-lg)',
            },
            boxShadow: {
                'warm-sm': 'var(--shadow-sm)',
                'warm': 'var(--shadow-md)',
                'warm-lg': 'var(--shadow-lg)',
            },
            transitionTimingFunction: {
                'narrative': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transitionDuration: {
                'narrative': '300ms',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            zIndex: {
                'navigation': '1000',
                'dropdown': '1100',
                'floating': '1200',
                'modal': '1300',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwindcss-animate'),
    ],
}