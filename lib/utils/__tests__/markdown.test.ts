import { describe, expect, it } from 'vitest'

import { stripMarkdownText } from '../markdown'

describe('stripMarkdownText', () => {
  it('handles null and undefined values safely', () => {
    expect(stripMarkdownText(null)).toBe('')
    expect(stripMarkdownText(undefined)).toBe('')
    expect(stripMarkdownText('')).toBe('')
  })

  it('strips markdown formatted text correctly', () => {
    expect(stripMarkdownText('**Hello** _World_')).toBe('Hello World')
    expect(stripMarkdownText('# Heading\nSome content')).toBe(
      'Heading Some content'
    )
  })
})
