import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { createSupabaseServerClient } from '~/utils/supabase.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createSupabaseServerClient(request)
  
  try {
    console.log('=== LOGOUT ACTION START ===')
    await supabase.auth.signOut()
    console.log('User signed out successfully')
    console.log('=== LOGOUT ACTION END ===')
  } catch (error) {
    console.error('Error signing out:', error)
  }
  
  return redirect('/', { headers })
}

export const loader = async () => redirect('/')