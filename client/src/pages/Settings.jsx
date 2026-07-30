import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { api } from "../api";

export default function Settings() {
  const { user, refreshUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [profileMsg, setProfileMsg] = useState("");

  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    try {
      const { user: updated } = await api.updateProfile({ name, theme });
      refreshUser(updated);
      setProfileMsg("Saved ✓");
    } catch (err) {
      setProfileMsg(err.message);
    }
  };

  const setThemeAndSave = async (t) => {
    setTheme(t);
    try {
      const { user: updated } = await api.updateProfile({ theme: t });
      refreshUser(updated);
    } catch { /* local theme still applies */ }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setPwMsg("");
    try {
      await api.changePassword({ currentPassword: pwCurrent, newPassword: pwNew });
      setPwCurrent("");
      setPwNew("");
      setPwMsg("Password updated ✓");
    } catch (err) {
      setPwMsg(err.message);
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("Delete your account permanently? This cannot be undone.")) return;
    try {
      await api.deleteAccount();
      logout();
      navigate("/register");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container narrow">
      <h1>Settings</h1>

      {/* Profile */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Profile</h3>
        <form onSubmit={saveProfile}>
          <label className="field">
            <span>Display name (used on your certificate)</span>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="field">
            <span>Email (read-only)</span>
            <input className="input" value={user.email} disabled />
          </label>
          <div className="row" style={{ gap: 12 }}>
            <button className="btn">Save profile</button>
            {profileMsg && <span className="muted">{profileMsg}</span>}
          </div>
        </form>
      </div>

      {/* Appearance */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Appearance</h3>
        <p className="muted" style={{ marginTop: 0 }}>Choose your theme. It's saved to your account.</p>
        <div className="row" style={{ gap: 12 }}>
          <button className={`btn ${theme === "light" ? "" : "subtle"}`} onClick={() => setThemeAndSave("light")}>
            Light
          </button>
          <button className={`btn ${theme === "dark" ? "" : "subtle"}`} onClick={() => setThemeAndSave("dark")}>
            Dark
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Change password</h3>
        <form onSubmit={changePassword}>
          <label className="field">
            <span>Current password</span>
            <input className="input" type="password" value={pwCurrent}
              onChange={(e) => setPwCurrent(e.target.value)} required />
          </label>
          <label className="field">
            <span>New password (min 8 characters)</span>
            <input className="input" type="password" value={pwNew}
              onChange={(e) => setPwNew(e.target.value)} minLength={8} required />
          </label>
          <div className="row" style={{ gap: 12 }}>
            <button className="btn">Update password</button>
            {pwMsg && <span className="muted">{pwMsg}</span>}
          </div>
        </form>
      </div>

      {/* Danger zone */}
      <div className="card" style={{ borderColor: "var(--danger)" }}>
        <h3 style={{ marginTop: 0, color: "var(--danger)" }}>Danger zone</h3>
        <p className="muted" style={{ marginTop: 0 }}>
          Accounts are also automatically removed after 6 months of inactivity.
        </p>
        <button className="btn danger" onClick={deleteAccount}>Delete my account</button>
      </div>
    </div>
  );
}
