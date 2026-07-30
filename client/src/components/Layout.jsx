import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { api, IS_DEMO } from "../api";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const { user, logout, refreshUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Sidebar collapse state, remembered across reloads.
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("dl_sidebar_collapsed") === "1"
  );
  const toggleSidebar = () => {
    setCollapsed((c) => {
      localStorage.setItem("dl_sidebar_collapsed", c ? "0" : "1");
      return !c;
    });
  };

  // Toggling the theme also persists it to the user's account (if logged in).
  const onToggle = async () => {
    toggleTheme();
    if (user) {
      const next = theme === "light" ? "dark" : "light";
      try {
        const { user: updated } = await api.updateProfile({ theme: next });
        refreshUser(updated);
      } catch {
        /* non-critical — local theme still applies */
      }
    }
  };

  return (
    <>
      {IS_DEMO && (
        <div className="demo-banner no-print">
          Demo mode — this is a preview; your account and progress are saved only in this browser.
        </div>
      )}
      <nav className="nav no-print">
        {user && (
          <button
            className="nav-toggle"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Show menu" : "Hide menu"}
            title={collapsed ? "Show menu" : "Hide menu"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <rect x="2" y="4" width="16" height="2" rx="1" fill="currentColor" />
              <rect x="2" y="9" width="16" height="2" rx="1" fill="currentColor" />
              <rect x="2" y="14" width="16" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        )}
        <div className="brand-lockup">
          <Logo size={38} />
          <div className="brand-text">
            <span className="brand-title">Disruption Lab</span>
            <span className="brand-sub">powered by Gies</span>
          </div>
        </div>
        <div className="spacer" />
        <button className="btn subtle" onClick={onToggle}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
        {user && (
          <button
            className="btn ghost"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Log out
          </button>
        )}
      </nav>

      {user ? (
        <div className="shell">
          <Sidebar collapsed={collapsed} />
          <main className="shell-main">{children}</main>
        </div>
      ) : (
        children
      )}
    </>
  );
}
