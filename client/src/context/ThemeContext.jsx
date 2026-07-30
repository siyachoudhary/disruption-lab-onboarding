import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { user } = useAuth();
  // Default to the user's saved theme, else whatever was last used locally.
  const [theme, setTheme] = useState(
    () => localStorage.getItem("dl_theme") || "light"
  );

  // When a user logs in, adopt their saved preference.
  useEffect(() => {
    if (user?.theme) setTheme(user.theme);
  }, [user]);

  // Apply to <html> and persist locally.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dl_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
