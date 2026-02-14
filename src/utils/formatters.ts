/**
 * Truncate a hex address to show the first and last `n` characters
 * separated by an ellipsis.
 *
 * @example getEllipsisTxt("0x1234567890abcdef1234567890abcdef12345678") // "0x1234...345678"
 *
 * @param str - The hex address to truncate.
 * @param n   - Number of characters to keep on each side (default: 6).
 * @returns The truncated string, or the original if it's short enough.
 */
export const getEllipsisTxt = (str: `0x${string}`, n: number = 6): string => {
  if (!str) return "";
  if (str.length <= 2 * n) return str;
  return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
};
