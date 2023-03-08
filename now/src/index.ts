import { DateTime } from 'luxon'

const now = DateTime.now()

// const now = new Date()

console.log(`
  ISO Local:  ${now.toISO()}
  ISO Zulu:   ${now.toUTC().toISO()}
  epoch:      ${now.toMillis()}
`)
