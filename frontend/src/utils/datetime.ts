const UTC_TIMESTAMP_WITHOUT_ZONE = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(?:\.\d+)?$/

function normalizeUtcTimestamp(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  if (UTC_TIMESTAMP_WITHOUT_ZONE.test(trimmed)) {
    return `${trimmed.replace(' ', 'T')}Z`
  }
  return trimmed
}

export function parseUtcTimestamp(value?: string | null): Date | null {
  if (!value) return null

  const parsed = new Date(normalizeUtcTimestamp(value))
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function formatUtcTimestamp(
  value: string | null | undefined,
  options?: Intl.DateTimeFormatOptions,
  locales?: Intl.LocalesArgument,
): string {
  const parsed = parseUtcTimestamp(value)
  return parsed ? parsed.toLocaleString(locales, options) : ''
}

export function formatUtcDate(
  value: string | null | undefined,
  options?: Intl.DateTimeFormatOptions,
  locales?: Intl.LocalesArgument,
): string {
  const parsed = parseUtcTimestamp(value)
  return parsed ? parsed.toLocaleDateString(locales, options) : ''
}