const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function toCamelCase(str: string) {
  return str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

function camelizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    const result = Object.keys(obj).reduce((res, key) => {
      res[toCamelCase(key)] = camelizeKeys(obj[key]);
      return res;
    }, {} as any);
    
    // Override 'id' to be the 'slug' for seamless frontend routing
    if (result.slug) {
      result.backendId = result.id;
      result.id = result.slug;
    }
    
    return result;
  }
  return obj;
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return camelizeKeys(json);
}

export const packagesApi = {
  getAll: () => apiFetch("/packages"),
  get: (id: string) => apiFetch(`/packages/${id}`),
};

export const carsApi = {
  getAll: () => apiFetch("/cars"),
  get: (id: string) => apiFetch(`/cars/${id}`),
};

export const bookingsApi = {
  create: (data: any) => apiFetch("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

export const blogsApi = {
  getAll: () => apiFetch("/blogs"),
  get: (id: string) => apiFetch(`/blogs/${id}`),
};

export const homeHeroesApi = {
  getAll: () => apiFetch("/home-heroes"),
};

export const featuresApi = {
  getAll: () => apiFetch("/features"),
};

export const galleryItemsApi = {
  getAll: () => apiFetch("/gallery-items"),
};

export const settingsApi = {
  get: () => apiFetch("/settings"),
};
