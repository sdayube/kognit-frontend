export default function queryToObject<T>(queryString: string) {
  const params = new URLSearchParams(queryString);

  const entries = params.entries();

  const data = Object.fromEntries(entries);

  return data as T;
}
