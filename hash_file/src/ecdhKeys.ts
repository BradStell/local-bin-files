import { createECDH } from 'crypto'

// Generate Alice's keys...
const alice = createECDH('secp521r1')
const aliceKey = alice.generateKeys()

// Generate Bob's keys...
const bob = createECDH('secp521r1')
const bobKey = bob.generateKeys()

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey)
const bobSecret = bob.computeSecret(aliceKey)

console.log(`alices secret:\t${aliceSecret.toString('hex')}`)
console.log(`bobs secret:\t${bobSecret.toString('hex')}`)
