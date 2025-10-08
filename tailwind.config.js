/** @type {import('tailwindcss').Config} */
export default {
  // 1) Make sure ALL your files are scanned (root, src, public, etc.)
  content: [
    "./index.html",
    "./**/*.{html,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // 2) Move/define the keyframes you used in the hero (fadeUp/slideIn)
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(20px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(12px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { '0%': { opacity: '0', transform: 'translateY(10px)' },
                   '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        fadeUp: 'fadeUp 0.6s ease-out both',
        slideIn: 'slideIn 0.7s cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },

  // 3) Safelist classes added at runtime via JS (so Purge doesn't remove them)
    safelist: [
    "opacity-0","opacity-100","scale-105","blur-sm",
    "transition-[opacity,transform,filter]","duration-[1100ms]",
    "ease-[cubic-bezier(.22,.61,.36,1)]","will-change-[transform,opacity]"
  ],

  plugins: [],
}