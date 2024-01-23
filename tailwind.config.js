/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        jost: ['var(--font-jost)', ...defaultTheme.fontFamily.mono],
        poiret: ['var(--font-poiret)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        dynamic_lg: "clamp(2rem, 5vw, 5.5rem)",
        dynamic_md: "clamp(1rem, 2vw, 1.5rem)",
        dynamic_sm: "clamp(2rem, 5vw, 2rem)",
        dynamic_sections: "clamp(2rem, 5vw, 3.5rem)",
      },
      boxShadow: {
        'button': '0 0 6px white',
        'image' : '0 0 14px 10px rgb(256, 256, 256, 0.2)',
        'header': '0 5px 5px rgb(0, 0, 0, 0.05)',
        'modal': '0px 0px 10px 2px rgb(255, 255, 255, 0.1)'
      },
      
      keyframes: {
        "backgroundanimation": {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },

        "image-rotate": {
          "0%": { transform: "rotateX(25deg)" },
          "25%": { transform: "rotateX(25deg) scale(0.9)" },
          "60%": { transform: "none" },
          "100%": { transform: "none" },
        },
        "image-glow": {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1,
          },
        },
        "step": {
          "0%": {
            height: '0px',
            backgroundColor: '#047857'
          },
          "100%": {
            height: '70px',
            backgroundColor: '#10b981'
          }
        },
        "background": {
          "0%": {
            backgroundColor: '#404040',
          },
          "100%": {
            backgroundColor: '#10b981'
          }
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        functionHover: {
          from: {width: '0%'},
          to: {width: '70%'}
        },
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "backgroundanimation": "backgroundanimation 3s infinite",
        "image-rotate": "image-rotate 1400ms ease forwards",
        "image-glow": "image-glow 3000ms 600ms ease-out forwards",
        "step": "step 400ms ease-out forwards",
        "back": "background 450ms step-end forwards",
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        functionHover: 'functionHover 150ms ease-out',
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [
    require('@kamona/tailwindcss-perspective'),
  ],
}
