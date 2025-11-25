import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthencated: false,
  role: null,
  loading: false,
  error: false,
};

const loadUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user_data");
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (userStr && token) {
      return {
        user: JSON.parse(userStr),
        token,
        role,
        isAuthencated: true,
      };
    }
  } catch (error) {
    console.error("Error loading user from storage: ", error);
  }
  return null;
};

const storedAuth = loadUserFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: storedAuth ? { ...initialState, ...storedAuth } : initialState,
  reducers: {
    setCredntials: (state, action) => {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      state.isAuthencated = true;
      state.error = null;

      localStorage.setItem("user_data", JSON.stringify(user));
      localStorage.setItem("access_token", token);
      localStorage.setItem("user_role", role);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthencated = false;
      state.error = null;

      localStorage.removeItem("user_data");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_role");
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredntials, logout, setError, setLoading } =
  authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthencated;
export const selectUserRole = (state) => state.auth.role;
export const selectIsAdmin = (state) => state.auth.role === "admin";
