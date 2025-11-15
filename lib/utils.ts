import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency symbol mapping
const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  INR: '₹',
  NPR: 'Rs.',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr',
  SEK: 'kr',
  NZD: 'NZ$',
  SGD: 'S$',
  HKD: 'HK$',
  NOK: 'kr',
  KRW: '₩',
  TRY: '₺',
  RUB: '₽',
  BRL: 'R$',
  ZAR: 'R',
  MXN: '$',
  AED: 'د.إ',
  SAR: '﷼',
  THB: '฿',
  IDR: 'Rp',
  MYR: 'RM',
  PHP: '₱',
  VND: '₫',
  PKR: '₨',
  BDT: '৳',
  LKR: 'Rs',
  MMK: 'K',
}

export function getCurrencySymbol(currency: string): string {
  return currencySymbols[currency.toUpperCase()] || currency
}

export function formatCurrency(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency)
  return `${symbol}${amount.toFixed(2)}`
}
