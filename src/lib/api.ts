/**
 * API client to connect with Tootler FastAPI backend when available.
 * Defaults to http://localhost:8000/api/v1
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchLiveFeed(page = 1, pageSize = 20) {
  try {
    const res = await fetch(`${API_BASE}/feed/posts?page=${page}&page_size=${pageSize}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch feed');
    return await res.json();
  } catch (err) {
    console.warn('Live backend unreachable, falling back to mock state:', err);
    return null;
  }
}

export async function fetchLiveDueRetention() {
  try {
    const res = await fetch(`${API_BASE}/learning/retention/due`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch retention cards');
    return await res.json();
  } catch (err) {
    console.warn('Live backend unreachable for retention:', err);
    return null;
  }
}
