import { compare, hash } from 'bcrypt'
import { describe, expect, it } from 'vitest'

describe('bcrypt test', () => {
  it('should return a hashed password', async () => {
    const expected = 'string'
    const actual = typeof await hash('hello-world', 10)
    expect(actual).toBe(expected)
  })

  it('should compare password and return boolean', async () => {
    const hashed = await hash('hello', 10)
    const expected = true
    const actual = await compare('hello', hashed)
    expect(actual).toBe(expected)
  })
})
