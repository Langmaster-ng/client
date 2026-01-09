const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://lang-learn-app-app-production.up.railway.app';

async function parseResponse(res) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid server response');
  }
}

export async function authPost(endpoint, payload) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await parseResponse(res);


  if (data?.status === 'error') {
    throw new Error(data.message || 'Authentication failed');
  }

  return data;
}

