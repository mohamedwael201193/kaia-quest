import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'adventure-heading': ['Lora', 'serif'],
        'adventure-body': ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-treasure': 'var(--gradient-treasure)',
        'gradient-magic': 'var(--gradient-magic)',
        'gradient-parchment': 'var(--gradient-parchment)',
      },
      boxShadow: {
        'treasure': 'var(--shadow-treasure)',
        'mystical': 'var(--shadow-mystical)',
        'quest': 'var(--shadow-quest)',
      },
      transitionTimingFunction: {
        'magical': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'treasure': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float-gentle": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-10px) rotate(1deg)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            opacity: "0.8",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
        },
        "coin-fly": {
          "0%": {
            transform: "translateY(100px) translateX(0px) scale(0.5)",
            opacity: "0",
          },
          "50%": {
            transform: "translateY(-20px) translateX(50px) scale(0.8) rotate(180deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100px) translateX(0px) scale(0.3)",
            opacity: "0",
          },
        },
        "sparkle": {
          "0%, 100%": {
            opacity: "0",
            transform: "scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1", 
            transform: "scale(1) rotate(180deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-gentle": "float-gentle 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "coin-fly": "coin-fly 1.5s ease-out",
        "sparkle": "sparkle 1s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
