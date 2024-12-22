const NEXT_PUBLIC_TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function tmdbFetcher(url: string, options: RequestInit = {}) {
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
