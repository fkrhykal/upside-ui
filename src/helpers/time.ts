const MS_IN_SECOND = 1000
const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
const HOURS_IN_DAY = 24
const DAYS_IN_WEEK = 7
const DAYS_IN_MONTH = 30
const DAYS_IN_YEAR = 365

function pluralize(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? '' : 's'} ago`
}

export function since(ms: number): string {
  const now = Date.now()
  const diff = now - ms

  const seconds = Math.floor(diff / MS_IN_SECOND)
  if (seconds < 10) return 'just now'
  if (seconds < SECONDS_IN_MINUTE) return pluralize(seconds, 'second')

  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE)
  if (minutes < MINUTES_IN_HOUR) return pluralize(minutes, 'minute')

  const hours = Math.floor(minutes / MINUTES_IN_HOUR)
  if (hours < HOURS_IN_DAY) return pluralize(hours, 'hour')

  const days = Math.floor(hours / HOURS_IN_DAY)
  if (days < DAYS_IN_WEEK) return pluralize(days, 'day')

  const weeks = Math.floor(days / DAYS_IN_WEEK)
  if (weeks < 4) return pluralize(weeks, 'week')

  const months = Math.floor(days / DAYS_IN_MONTH)
  if (months < 12) return pluralize(months, 'month')

  const years = Math.floor(days / DAYS_IN_YEAR)
  return pluralize(years, 'year')
}
