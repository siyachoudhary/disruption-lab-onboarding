import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ModuleView from "./pages/ModuleView";
import Quiz from "./pages/Quiz";
import Certificate from "./pages/Certificate";
import Settings from "./pages/Settings";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function PublicOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading…</div>;
  return user ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
        <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />

        <Route path="/" element={<Protected><Dashboard /></Protected>} />
        <Route path="/module/:id" element={<Protected><ModuleView /></Protected>} />
        <Route path="/module/:id/lesson/:lessonIndex" element={<Protected><ModuleView /></Protected>} />
        <Route path="/module/:id/quiz" element={<Protected><Quiz /></Protected>} />
        <Route path="/certificate" element={<Protected><Certificate /></Protected>} />
        <Route path="/settings" element={<Protected><Settings /></Protected>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
