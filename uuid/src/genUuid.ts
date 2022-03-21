import { v4 as uuid } from 'uuid'

type Maybe<T> = T | undefined | null

function start(quantity: Maybe<number> = 1): void {
  if (!quantity) {
    quantity = 1
  }

  for (let i = 0; i < quantity; i++) {
    console.log( uuid() )
  }
}

let quantity: number = 1
if (process.argv[2] !== undefined) {
  quantity = Number.parseInt(process.argv[2])
}
start(quantity)
