const TOKEN_KEY = 'authToken';
const IS_LOGGED_IN_KEY = 'isLoggedIn';

export const login = (token) => {
  // In a real application, you would also securely store the authentication token here
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(IS_LOGGED_IN_KEY, 'true');
};

export const logout = () => {
  // Clear the authentication token and logged-in status
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(IS_LOGGED_IN_KEY);
  // Redirect to home or login page as needed
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  return localStorage.getItem(IS_LOGGED_IN_KEY) === 'true';
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// This is a placeholder for a function you would use to refresh the authentication token.
// Implementing this would depend on your backend's token refresh mechanism.
export const refreshToken = async () => {
  // Placeholder for token refresh logic
};