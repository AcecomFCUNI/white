// This page handles the Oauth callback from Supabase
// It processes the OAuth code and redirects the user accordingly
// If the user is authenticated, they are redirected to the next page
// If there is an error, they are redirected to the register page with an error message
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { createSupabaseServerClient } from '~/utils/supabase.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code'); // The OAuth code from the query parameters
  const next = url.searchParams.get('next') ?? '/'; // Default redirect path if 'next' is not provided

  console.log('=== CALLBACK START ===');
  console.log('Full URL:', url.toString());
  console.log('Received code:', code ? 'YES' : 'NO');
  console.log('All URL params:', Object.fromEntries(url.searchParams));
  console.log('Request cookies raw:', request.headers.get('Cookie'));

  if (!code) {
    console.error('No OAuth code provided');
    return redirect('/login?error=no_code');
  }

  const { supabase, headers } = createSupabaseServerClient(request);

  try {
    // Supabase manages all automatically: Exchanging OAuth code for a token
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error getting session after OAuth:', error);
      return redirect('/login?error=auth_error');
    }

    if (data?.session?.user) {
      console.log('User authenticated:', data.session.user.email);
      return redirect(next, { headers });
    }

    return redirect('/login?error=auth_error');
  } catch (error) {
    console.error('Callback processing error:', error);
    return redirect('/login?error=callback_error');
  }
};

// This component won't be rendered since we always redirect
export default function AuthCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#CA093C]"></div>
        <p className="mt-4 text-gray-600">Procesando autenticación...</p>
      </div>
    </div>
  );
}
