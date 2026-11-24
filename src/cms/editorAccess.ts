let passwordEditor = false;
export const usesPasswordEditor = () => passwordEditor;
export const setPasswordEditor = (enabled: boolean) => { passwordEditor = enabled; };

export async function editorRequest<T = unknown>(action: string, body?: unknown, timeout = 15000): Promise<T> {
  const response = await fetch(`/api/cms?action=${action}`, {
    method: body === undefined ? 'GET' : 'POST',
    credentials: 'same-origin',
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(timeout),
  });
  if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Editor backend is unavailable.');
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Editor request failed.');
  return data;
}
