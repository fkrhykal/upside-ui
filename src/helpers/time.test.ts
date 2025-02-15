import { describe, expect, test, vi } from 'vitest'
import { since } from './time'

describe('test since', () => {
  const timeNow = Date.now()
  const fiveSeconds = 5000
  const fifteenSeconds = 15000
  const fiveMinutes = 300000
  const threeHours = 10800000
  const twoDays = 172800000
  const twoWeeks = 1209600000
  const sixMonths = 15552000000
  const twoYears = 63072000000

  vi.setSystemTime(timeNow)

  test("returns 'just now' for very recent timestamps", () => {
    expect(since(timeNow - fiveSeconds)).toBe('just now')
  })

  test("returns 'x seconds ago' correctly", () => {
    expect(since(timeNow - fifteenSeconds)).toBe('15 seconds ago')
  })

  test("returns 'x minutes ago' correctly", () => {
    expect(since(timeNow - fiveMinutes)).toBe('5 minutes ago')
  })

  test("returns 'x hours ago' correctly", () => {
    expect(since(timeNow - threeHours)).toBe('3 hours ago')
  })

  test("returns 'x days ago' correctly", () => {
    expect(since(timeNow - twoDays)).toBe('2 days ago')
  })

  test("returns 'x weeks ago' correctly", () => {
    expect(since(timeNow - twoWeeks)).toBe('2 weeks ago')
  })

  test("returns 'x months ago' correctly", () => {
    expect(since(timeNow - sixMonths)).toBe('6 months ago')
  })

  test("returns 'x years ago' correctly", () => {
    expect(since(timeNow - twoYears)).toBe('2 years ago')
  })
})
