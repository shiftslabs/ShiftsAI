import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as supabaseKeys from '@/lib/supabase/keys'

import { useAuthCheck } from '../use-auth-check'
import { useCurrentUserImage } from '../use-current-user-image'
import { useCurrentUserName } from '../use-current-user-name'

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn()
}))

describe('Auth Hooks without Supabase config', () => {
  beforeEach(() => {
    vi.spyOn(supabaseKeys, 'hasSupabasePublicConfig').mockReturnValue(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('useAuthCheck returns unauthenticated and not loading when Supabase is not configured', async () => {
    const { result } = renderHook(() => useAuthCheck())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('useCurrentUserName returns Anonymous when Supabase is not configured', async () => {
    const { result } = renderHook(() => useCurrentUserName())

    await waitFor(() => {
      expect(result.current).toBe('Anonymous')
    })
  })

  it('useCurrentUserImage returns null when Supabase is not configured', async () => {
    const { result } = renderHook(() => useCurrentUserImage())

    await waitFor(() => {
      expect(result.current).toBeNull()
    })
  })
})
