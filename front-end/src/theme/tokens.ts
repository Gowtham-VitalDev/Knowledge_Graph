export const colorTokens = {
  background: {
    default: "#FFFFFF",
    alt: "#0F1115",
  },
  text: {
    primary: "#101828",
    inverse: "#FFFFFF",
  },
  intent: {
    success: "#12B76A",
    warning: "#F79009",
    error: "#F04438",
  },
} as const;

export const typographyTokens = {
  displayLg: {
    fontFamily: "var(--font-geist-sans)",
    weight: 600,
    size: "32px",
    lineHeight: "40px",
  },
  headingMd: {
    fontFamily: "var(--font-geist-sans)",
    weight: 600,
    size: "24px",
    lineHeight: "32px",
  },
  bodyMd: {
    fontFamily: "var(--font-geist-sans)",
    weight: 400,
    size: "16px",
    lineHeight: "24px",
  },
  bodySm: {
    fontFamily: "var(--font-geist-sans)",
    weight: 400,
    size: "14px",
    lineHeight: "20px",
  },
  mono: {
    fontFamily: "var(--font-geist-mono)",
    weight: 500,
    size: "13px",
    lineHeight: "20px",
  },
} as const;

export const spacingScale = {
  baseUnit: 4,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const layoutTokens = {
  containerWidths: {
    mobile: 600,
    desktop: 1200,
  },
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1024,
  },
  gridGutter: 16,
} as const;

export const theme = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingScale,
  layout: layoutTokens,
} as const;

export type Theme = typeof theme;
