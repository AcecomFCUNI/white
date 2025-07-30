import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { createServerClient } from '@supabase/auth-helpers-remix'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response()
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (code) {
    const supabaseClient = createServerClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_ANON_KEY as string,
      { request, response }
    )

    try {
      const { data, error } = await supabaseClient.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return redirect('/register?error=auth_error')
      }

      if (data?.session) {
        console.log('User authenticated successfully:', data.user)
        // Redirect to dashboard or home page after successful authentication
        return redirect('/', {
          headers: response.headers,
        })
      }
    } catch (error) {
      console.error('Callback error:', error)
      return redirect('/register?error=callback_error')
    }
  }

  // If no code or authentication failed, redirect back to register
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
