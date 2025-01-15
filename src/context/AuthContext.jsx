import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetProfileQuery } from "../redux/features/users/UserApi";
import { setUser } from "../redux/features/users/userSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [getProfile] = useLazyGetProfileQuery();

  // Fetch and set user profile
  const fetchUserProfile = useCallback(
    async (authToken) => {
      try {
        setLoading(true);
        const response = await getProfile(authToken).unwrap();
        if (response?.data) {
          dispatch(setUser(response.data));
        } else {
          console.error("No user data found in API response.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    },
    [getProfile, dispatch]
  );


  
  // Check token and authenticate user
  useEffect(() => {
    const authenticateUser = async () => {
      setLoading(true);

      // Check for token in URL or localStorage
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");

      let authToken = tokenFromUrl || localStorage.getItem("token");

      if (tokenFromUrl) {
        // Save token in localStorage
        localStorage.setItem("token", tokenFromUrl);

        // Remove token from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (authToken) {
        setToken(authToken);
        await fetchUserProfile(authToken); // Fetch user profile with token
      }
      setLoading(false);
    };

    authenticateUser();
  }, [fetchUserProfile]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    dispatch(setUser(null)); // Clear user data from Redux
  };


 const user = useSelector((state) => state.user.user);
 console.log(user)





  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token && (user?.role.includes("admin") || user?.role.includes("Instructor")), loading, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
