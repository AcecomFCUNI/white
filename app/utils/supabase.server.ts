// This file is used to create a Supabase client for server-side operations
// It handles cookies and headers for authentication and session management

import { createServerClient } from '@supabase/ssr';
import { parse, serialize } from 'cookie';

export function createSupabaseServerClient(request: Request) {
  const cookies = parse(request.headers.get('Cookie') ?? '');
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(key) {
          const value = cookies[key];
          console.log(`Getting cookie: ${key} = ${value || 'undefined'}`);
          return value;
        },
        set(key, value, options) {
          console.log(`Setting cookie: ${key}`);
          const serialized = serialize(key, value, {
            ...options,
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            domain: undefined,
          });
          headers.append('Set-Cookie', serialized);
        },
        remove(key, options) {
          console.log(`Removing cookie: ${key}`);
          const serialized = serialize(key, '', {
            ...options,
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 0,
            path: '/',
            domain: undefined,
          });
          headers.append('Set-Cookie', serialized);
        },
      },
    }
  );

  return { supabase, headers };
}
