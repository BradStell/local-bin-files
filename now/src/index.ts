import { DateTime } from 'luxon'

const now = DateTime.now()

console.log(`
  Human:      ${new Date().toDateString()}
  ISO Local:  ${now.toISO()}
  ISO Zulu:   ${now.toUTC().toISO()}
  epoch:      ${now.toMillis()}
`)
