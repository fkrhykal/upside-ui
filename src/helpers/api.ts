export default function api(path: string, params?: Record<string, string>): URL {
  const url = new URL(import.meta.env.VITE_API_URL + path)
  if (!params) {
    return url
  }
  for (const key in params) {
    url.searchParams.set(key, params[key])
  }
  return url
}
