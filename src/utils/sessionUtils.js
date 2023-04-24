export function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

export function storeSession(session) {
  localStorage.setItem("session", JSON.stringify(session));
}

export function removeSession() {
  localStorage.removeItem("session");
}

export function getToken() {
  return JSON.parse(localStorage.getItem("session"))?.token;
}
