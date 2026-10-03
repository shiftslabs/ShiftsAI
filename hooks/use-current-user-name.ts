import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { hasSupabasePublicConfig } from '@/lib/supabase/keys'

export const useCurrentUserName = () => {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfileName = async () => {
      if (!hasSupabasePublicConfig()) {
        setName('Anonymous')
        return
      }

      try {
        const { data, error } = await createClient().auth.getSession()
        if (error) {
          console.error(error)
        }
        setName(data.session?.user.user_metadata.full_name ?? '?')
      } catch (error) {
        // Supabase not configured
        setName('Anonymous')
      }
    }

    fetchProfileName()
  }, [])

  return name || '?'
}
