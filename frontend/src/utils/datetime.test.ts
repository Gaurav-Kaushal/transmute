import { describe, expect, it } from 'vitest'
import { formatUtcDate, formatUtcTimestamp, parseUtcTimestamp } from './datetime'

describe('parseUtcTimestamp', () => {
  it('treats backend timestamps without a timezone as UTC', () => {
    expect(parseUtcTimestamp('2026-03-20 12:00:00')?.toISOString()).toBe('2026-03-20T12:00:00.000Z')
    expect(parseUtcTimestamp('2026-03-20T12:00:00')?.toISOString()).toBe('2026-03-20T12:00:00.000Z')
  })

  it('preserves timestamps that already include a timezone', () => {
    expect(parseUtcTimestamp('2026-03-20T12:00:00Z')?.toISOString()).toBe('2026-03-20T12:00:00.000Z')
    expect(parseUtcTimestamp('2026-03-20T08:00:00-04:00')?.toISOString()).toBe('2026-03-20T12:00:00.000Z')
  })

  it('returns null for missing or invalid values', () => {
    expect(parseUtcTimestamp(undefined)).toBeNull()
    expect(parseUtcTimestamp('')).toBeNull()
    expect(parseUtcTimestamp('not-a-date')).toBeNull()
  })
})

describe('datetime formatting helpers', () => {
  it('formats timestamps using the parsed UTC value', () => {
    const value = '2026-03-20 12:00:00'
    const parsed = parseUtcTimestamp(value)

    expect(formatUtcTimestamp(value, { hour: '2-digit', minute: '2-digit' })).toBe(
      parsed?.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit' }),
    )
    expect(formatUtcDate(value)).toBe(parsed?.toLocaleDateString())
  })
})