import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Movie } from "../types";
import { api } from "../lib/api";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  googleLogin: (name: string, email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, email: string, password?: string) => Promise<void>;
  toggleFavorite: (movieId: string) => Promise<boolean>;
  toggleWishlist: (movieId: string) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    try {
      const profileData = await api.get("/auth/profile");
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          favorites: profileData.favorites,
          wishlist: profileData.wishlist,
        };
      });
    } catch (error) {
      console.error("Failed to load profile details:", error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      
      if (token && savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          // Async fetch updated profile
          fetchProfile();
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };
    
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      
      const userData: User = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        favorites: [],
        wishlist: [],
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Welcome back!");
      fetchProfile();
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string) => {
    setLoading(true);
    try {
      // For seed compatibility, let's pass a default password "user123" for simple register
      const data = await api.post("/auth/register", { name, email, password: "user123" });
      localStorage.setItem("token", data.token);
      
      const userData: User = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        favorites: [],
        wishlist: [],
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (name: string, email: string) => {
    setLoading(true);
    try {
      const data = await api.post("/api/auth/google", { name, email, googleId: "google-mock-id" });
      localStorage.setItem("token", data.token);
      
      const userData: User = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        favorites: [],
        wishlist: [],
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Logged in with Google!");
      fetchProfile();
    } catch (error: any) {
      // Fallback local google simulation if the api route isn't hit
      try {
        const fallbackData = await api.post("/auth/google", { name, email, googleId: "google-mock-id" });
        localStorage.setItem("token", fallbackData.token);
        
        const userData: User = {
          _id: fallbackData._id,
          name: fallbackData.name,
          email: fallbackData.email,
          role: fallbackData.role,
          favorites: [],
          wishlist: [],
        };
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Logged in with Google!");
        fetchProfile();
      } catch (fallbackError: any) {
        toast.error(fallbackError.message || "Google Auth failed");
        throw fallbackError;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateProfile = async (name: string, email: string, password?: string) => {
    try {
      const data = await api.put("/auth/profile", { name, email, password });
      
      const updatedUser: User = {
        ...user!,
        name: data.name,
        email: data.email,
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Update failed");
      throw error;
    }
  };

  const toggleFavorite = async (movieId: string): Promise<boolean> => {
    if (!user) {
      toast.error("Please login to add favorites");
      return false;
    }
    try {
      const data = await api.post(`/movies/${movieId}/favorite`, {});
      await fetchProfile();
      return data.isFavorite;
    } catch (error: any) {
      toast.error(error.message || "Failed to toggle favorite");
      return false;
    }
  };

  const toggleWishlist = async (movieId: string): Promise<boolean> => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return false;
    }
    try {
      const data = await api.post(`/movies/${movieId}/wishlist`, {});
      await fetchProfile();
      return data.inWishlist;
    } catch (error: any) {
      toast.error(error.message || "Failed to toggle wishlist");
      return false;
    }
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleLogin,
        logout,
        updateProfile,
        toggleFavorite,
        toggleWishlist,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
