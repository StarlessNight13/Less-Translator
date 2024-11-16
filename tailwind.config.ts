/* eslint-disable @typescript-eslint/no-require-imports */
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["selector"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "rgb(var(--base-rgb))",
        foreground: "tgb(var(--text-rgb))",
        card: {
          DEFAULT: "rgb(var(--surface0-rgb))",
          foreground: "rgb(var(--text-rgb))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "rgb(var(--teal-rgb))",
          foreground: "rgb(var(--crust-rgb))",
        },
        secondary: {
          DEFAULT: "rgb(var(--green-rgb))",
          foreground: "rgb(var(--crust-rgb))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--sapphire-rgb))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--red-rgb))",
          foreground: "white",
        },
        //  ---------------  Shadcn CSS Colors ---------------
        border: "rgb(var(--mauve-rgb))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // ------------ custom colors ------------
        rosewater: "rgb(var(--rosewater-rgb))",
        flamingo: "rgb(var(--flamingo-rgb))",
        pink: "rgb(var(--pink-rgb))",
        mauve: "rgb(var(--mauve-rgb))",
        red: "rgb(var(--red-rgb))",
        maroon: "rgb(var(--maroon-rgb))",
        peach: "rgb(var(--peach-rgb))",
        yellow: "rgb(var(--yellow-rgb))",
        green: "rgb(var(--green-rgb))",
        teal: "rgb(var(--teal-rgb))",
        sky: "rgb(var(--sky-rgb))",
        sapphire: "rgb(var(--sapphire-rgb))",
        blue: "rgb(var(--blue-rgb))",
        lavender: "rgb(var(--lavender-rgb))",
        text: "rgb(var(--text-rgb))",
        subtext1: "rgb(var(--subtext1-rgb))",
        subtext0: "rgb(var(--subtext0-rgb))",
        overlay2: "rgb(var(--overlay2-rgb))",
        overlay1: "rgb(var(--overlay1-rgb))",
        overlay0: "rgb(var(--overlay0-rgb))",
        surface2: "rgb(var(--surface2-rgb))",
        surface1: "rgb(var(--surface1-rgb))",
        surface0: "rgb(var(--surface1-rgb))",
        base: "rgb(var(--base-rgb))",
        mantle: "rgb(var(--mantle-rgb))",
        crust: "rgb(var(--crust-rgb))",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
