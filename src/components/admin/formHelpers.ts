export const toCsv = (items?: string[]) => items?.join(', ') ?? ''
export const fromCsv = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean)
