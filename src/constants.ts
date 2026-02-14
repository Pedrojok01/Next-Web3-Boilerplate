/** Max viewport widths (in px) for responsive breakpoints. */
export const BREAKPOINTS = {
  mobile: 549,
  tablet: 768,
  small: 1050,
} as const;

/** Debounce delays (in ms) used across hooks. */
export const DEBOUNCE_MS = {
  default: 500,
  ens: 3000,
  resize: 150,
} as const;

/** How long a toast stays visible (in ms). */
export const TOAST_DURATION = 8000;

/** Maximum number of toasts displayed at once. */
export const TOAST_MAX = 3;
