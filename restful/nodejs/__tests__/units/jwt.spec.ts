import { describe, expect, it } from 'vitest'
import { createToken, verifyToken } from '../../utils/jwt'

describe('json web token util', () => {
  it('should return a token', () => {
    const expected = 'string'
    const actual = typeof createToken({
      id: '0000-aaaa-bbbb-zzzz-9999',
      email: 'john@doe.zz'
    })

    expect(actual).toBe(expected)
  })

  it('should verify and return invalid a token', async () => {
    const expected = { isValid: false, payload: null }
    const actual = await verifyToken('00000-0000-0000-00000-00000')

    expect(actual).toStrictEqual(expected)
  })
})
