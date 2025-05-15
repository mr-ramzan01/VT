/**
 * Formats a wallet address by shortening it for display
 * Shows the first few and last few characters with ellipsis in the middle
 * 
 * @param address The full wallet address to format
 * @param prefixLength Number of characters to keep at the beginning (default: 6)
 * @param suffixLength Number of characters to keep at the end (default: 4)
 * @returns Formatted address string
 */
export function formatWalletAddress(
  address: string | null | undefined,
  prefixLength = 6,
  suffixLength = 4
): string {
  if (!address) return '';
  
  if (address.length <= prefixLength + suffixLength) {
    return address;
  }
  
  return `${address.substring(0, prefixLength)}...${address.substring(address.length - suffixLength)}`;
}

/**
 * Formats a number as a currency string
 * 
 * @param amount The amount to format
 * @param currency Currency code (default: 'USD')
 * @param locale Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | string,
  currency = 'USD',
  locale = 'en-US'
): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return '';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numericAmount);
}

/**
 * Formats a large number with abbreviations (K, M, B, T)
 * 
 * @param num The number to format
 * @param decimals Number of decimal places (default: 1)
 * @returns Formatted number with abbreviation
 */
export function formatLargeNumber(num: number, decimals = 1): string {
  if (num === null || num === undefined) return '';
  
  if (num === 0) return '0';
  
  const absValue = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absValue < 1000) {
    return sign + absValue.toFixed(decimals).replace(/\.0+$/, '');
  }
  
  const units = ['', 'K', 'M', 'B', 'T'];
  const unit = Math.floor(Math.log10(absValue) / 3);
  const formattedValue = (absValue / Math.pow(1000, unit)).toFixed(decimals);
  
  // Remove trailing zeros after decimal point
  const trimmedValue = formattedValue.replace(/\.0+$/, '');
  
  return sign + trimmedValue + units[unit];
} 