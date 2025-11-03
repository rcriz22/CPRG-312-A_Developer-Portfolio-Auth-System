const BASE_URL = "https://localhost:3000";

export const getCsrfToken = async () => {
  const res = await fetch(`${BASE_URL}/api/csrf-token`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
};

export const signup = async (formData) => {
  const csrfToken = await getCsrfToken();
  const res = await fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const login = async (form) => {
  return await fetch("https://localhost:3000/api/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(form),
    headers: { "Content-Type": "application/json" }
  });
};

export const getProfile = async () => {
  const res = await fetch("https://localhost:3000/api/me", {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
};

export const sendContactMessage = async (formData) => {
  const csrfToken = await getCsrfToken();
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  return res.json();
};
