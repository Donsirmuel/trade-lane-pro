import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';
const JWT_KEY = import.meta.env.VITE_JWT_STORAGE_KEY || 'vendora_jwt';

export type Tokens = { 
  access: string; 
  refresh: string; 
};

export const tokenStore = {
  get(): Tokens | null {
    try {
      const raw = localStorage.getItem(JWT_KEY);
      return raw ? JSON.parse(raw) as Tokens : null;
    } catch {
      return null;
    }
  },
  
  set(tokens: Tokens) {
    localStorage.setItem(JWT_KEY, JSON.stringify(tokens));
  },
  
  clear() {
    localStorage.removeItem(JWT_KEY);
  }
};

export const http = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Add auth token to requests
http.interceptors.request.use((config) => {
  const tokens = tokenStore.get();
  if (tokens?.access) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

// Handle 401 responses with token refresh
let isRefreshing = false;
let queue: Array<() => void> = [];

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error || {};
    
    if (response?.status === 401 && !config._retry) {
      if (isRefreshing) {
        // Wait for current refresh to complete
        await new Promise<void>((resolve) => queue.push(resolve));
        return http(config);
      }
      
      config._retry = true;
      isRefreshing = true;
      
      try {
        const tokens = tokenStore.get();
        if (!tokens?.refresh) {
          throw new Error('No refresh token');
        }
        
        const refreshResponse = await axios.post(`${API_BASE}/api/v1/accounts/token/refresh/`, {
          refresh: tokens.refresh
        });
        
        const newTokens = { 
          access: refreshResponse.data.access, 
          refresh: tokens.refresh 
        };
        tokenStore.set(newTokens);
        
        // Resolve all queued requests
        queue.forEach((fn) => fn());
        queue = [];
        
        return http(config);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        tokenStore.clear();
        window.location.href = '/';
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }
    
    throw error;
  }
);

export default http;
