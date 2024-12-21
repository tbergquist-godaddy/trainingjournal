const { NEXT_PUBLIC_TMDB_API_KEY } = process.env;

export default function tmdbFetcher(url: string, options: RequestInit = {}) {
  if (!NEXT_PUBLIC_TMDB_API_KEY == null) {
    throw new Error('Missing TMDB API key');
  }
  const { method, headers, ...rest } = options;

  const fetchOptions = {
    method: method ?? 'GET',
    headers: {
      accept: 'application/json',
      ...options.headers,
      Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    ...rest,
  };
  return fetch(`https://api.themoviedb.org${url}`, fetchOptions);
}
