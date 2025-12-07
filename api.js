// api.js - frontend helper for talking to the Node backend

const API_BASE_URL = "http://localhost:3000/api";

export function getAuthToken() {
  return localStorage.getItem("token") || null;
}

function buildHeaders(withAuth = false) {
  const headers = {
    "Content-Type": "application/json"
  };

  if (withAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

export async function loginApi(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: buildHeaders(false),
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Login failed");
  }

  return res.json(); // { user, token }
}

export async function createOrderApi(orderPayload) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify(orderPayload)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Create order failed");
  }

  return res.json(); // { orderId }
}

export async function getMyOrdersApi() {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
    headers: buildHeaders(true)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch orders");
  }

  return res.json(); // { orders: [...] }
}

export async function getOrderByIdApi(orderId) {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "GET",
    headers: buildHeaders(true)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch order");
  }

  return res.json(); // { order }
}
