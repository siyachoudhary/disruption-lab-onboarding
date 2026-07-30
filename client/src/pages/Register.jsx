import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container narrow">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Create your account</h1>
        <p className="muted">
          The certificate you earn will carry the name you enter here — use your real full name.
        </p>
        <form onSubmit={submit}>
          <label className="field">
            <span>Full name</span>
            <input className="input" value={name}
              onChange={(e) => setName(e.target.value)} required autoFocus />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="field">
            <span>Password (min 8 characters)</span>
            <input className="input" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} minLength={8} required />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn block" disabled={busy}>
            {busy ? "Creating…" : "Create account"}
          </button>
        </form>
        <p className="muted center" style={{ marginBottom: 0 }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
