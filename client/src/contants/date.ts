export const DATE = Array.from({ length: 31 }, (_, i) => i + 1)
export const MONTH = Array.from({ length: 12 }, (_, i) => i + 1)
export const YEAR = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)