export const getEllipsisTxt = (str: `0x${string}`, n: number = 6): string => {
  if (!str) return "";
  if (str.length <= 2 * n) return str;
  return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
};
