// This page handles the Oauth callback from Supabase
// It processes the OAuth code and redirects the user accordingly
// If the user is authenticated, they are redirected to the next page
// If there is an error, they are redirected to the register page with an error message
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { createServerClient } from '@supabase/auth-helpers-remix'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response()
  const url = new URL(request.url)
  const code = url.searchParams.get('code') // The OAuth code from the query parameters
  const next = url.searchParams.get('next') ?? '/' // Default redirect path if 'next' is not provided
  
  if (code) {
    const supabaseClient = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        request,
        response,
      }
    )

    try {
      // Supabase manages all automatically: Exchanging OAuth code for a token
      const { data: { session }, error } = await supabaseClient.auth.getSession()
      
      if (error) {
        console.error('Error getting session after OAuth:', error)
        return redirect('/register?error=auth_error')
      }

      if (session) {
        console.log('User authenticated successfully via OAuth:', session.user.email)
        return redirect(next, {
          headers: response.headers,
        })
      } else {
        // If there is no session, we try to refresh
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
        
        if (userError || !user) {
          console.error('No user found after OAuth callback')
          return redirect('/register?error=auth_error')
        }
        
        console.log('User found, redirecting:', user.email)
        return redirect(next, {
          headers: response.headers,
        })
      }
    } catch (error) {
      console.error('Callback processing error:', error)
      return redirect('/register?error=callback_error')
    }
  }

  return redirect('/register?error=no_code')
}

// This component won't be rendered since we always redirect
export default function AuthCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#CA093C]"></div>
        <p className="mt-4 text-gray-600">Procesando autenticación...</p>
      </div>
    </div>
  )
}
