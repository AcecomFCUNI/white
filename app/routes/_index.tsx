import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import {
  Contact,
  Counts,
  Features,
  Footer,
  Header,
  Hero,
  Invest,
  JoinUs,
  News,
  Partners,
  SupportUs,
  Testimonials,
} from '~/sections';
import { createSupabaseServerClient } from '~/utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase, headers } = createSupabaseServerClient(request);

  try {
    console.log('=== LOADER START ===');
    console.log('Request cookies:', request.headers.get('Cookie'));

    // Get the session to check if the user is authenticated. According to that, it will render Login/register or Logout
    console.log('Fetching session...');
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Session error:', sessionError);
    } else {
      console.log(
        'Session found:',
        session ? `User: ${session.user.email}` : 'No session'
      );
    }

    const user = session?.user || null;
    console.log('=== LOADER END ===');

    return json(
      { user },
      {
        headers: Array.from(headers.keys()).length > 0 ? headers : undefined,
      }
    );
  } catch (error) {
    console.error('Loader error:', error);
    return json({ user: null });
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Chasqui II' },
    { name: 'Chasqui II', content: 'Chasqui II' },
  ];
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);
  return (
    <>
      <Header user={user} />
      <Hero />
      <main id="main">
        <Features />
        <Counts />
        <Testimonials />
        <Partners />
        <JoinUs />
        <SupportUs />
        <Invest />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
