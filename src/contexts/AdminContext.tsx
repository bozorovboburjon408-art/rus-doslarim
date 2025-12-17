import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  adminApiCall: <T>(action: string, testData?: any, testId?: string) => Promise<{ success: boolean; data?: T; error?: string }>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const storedPassword = sessionStorage.getItem("admin_password");
    if (token && storedPassword) {
      setIsAdmin(true);
      setAdminPassword(storedPassword);
    }
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success && data.token) {
        sessionStorage.setItem("admin_token", data.token);
        sessionStorage.setItem("admin_password", password);
        setAdminPassword(password);
        setIsAdmin(true);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Noto'g'ri parol" };
      }
    } catch (error) {
      console.error("Admin login error:", error);
      return { success: false, error: "Xatolik yuz berdi" };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_password");
    setAdminPassword(null);
    setIsAdmin(false);
  };

  const adminApiCall = async <T,>(action: string, testData?: any, testId?: string): Promise<{ success: boolean; data?: T; error?: string }> => {
    if (!adminPassword) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-tests`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ password: adminPassword, action, testData, testId }),
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Admin API call error:", error);
      return { success: false, error: "Xatolik yuz berdi" };
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, login, logout, adminApiCall }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
