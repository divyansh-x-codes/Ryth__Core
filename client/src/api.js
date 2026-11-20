/**
 * RythCore API Client
 * Simple fetch wrapper to communicate with the RythCore backend server.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper to get stored auth token
export function getToken() {
  return localStorage.getItem("rythcore_token");
}

// Helper to set stored auth token
export function setToken(token) {
  if (token) {
    localStorage.setItem("rythcore_token", token);
  } else {
    localStorage.removeItem("rythcore_token");
  }
}

// Standard fetch wrapper
async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "An error occurred while communicating with the server.");
  }

  return data;
}

// Auth API
export const authApi = {
  register: (name, email, password) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  googleLogin: (credentialOrPayload) =>
    request("/auth/google", {
      method: "POST",
      body: JSON.stringify(
        typeof credentialOrPayload === "string"
          ? { credential: credentialOrPayload }
          : credentialOrPayload
      ),
    }),

  me: () => request("/auth/me"),

  logout: () => {
    const token = getToken();
    if (token) {
      request("/auth/logout", { method: "POST" }).catch(() => {});
    }
    setToken(null);
  },
};

// Stories API
export const storiesApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/stories${query ? `?${query}` : ""}`);
  },

  getOne: (idOrSlug) => request(`/stories/${idOrSlug}`),

  create: (storyData) =>
    request("/stories", {
      method: "POST",
      body: JSON.stringify(storyData),
    }),

  toggleLike: (storyId) =>
    request(`/stories/${storyId}/like`, {
      method: "POST",
    }),

  toggleBookmark: (storyId) =>
    request(`/stories/${storyId}/bookmark`, {
      method: "POST",
    }),

  getComments: (storyId) => request(`/stories/${storyId}/comments`),

  addComment: (storyId, content) =>
    request(`/stories/${storyId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),
};

// Categories API
export const categoriesApi = {
  getAll: () => request("/categories"),
};

// Subscriptions & Plans API
export const subscriptionsApi = {
  getPlans: () => request("/subscriptions/plans"),
  subscribe: (planId, autoActivate = false) =>
    request("/subscriptions/subscribe", {
      method: "POST",
      body: JSON.stringify({ planId, autoActivate }),
    }),
  verifyPayment: (providerOrderId, providerPaymentId) =>
    request("/subscriptions/verify-payment", {
      method: "POST",
      body: JSON.stringify({ providerOrderId, providerPaymentId }),
    }),
  myStatus: () => request("/subscriptions/my-status"),
};
