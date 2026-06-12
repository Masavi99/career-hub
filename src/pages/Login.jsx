
import { useState }  from "react";
import { useApp }    from "../context/AppContext";

// Simple email regex for client-side validation
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Login() {
  const { setUser } = useApp();

  // ── Form state ─────────────────────────────────────────────
  // useState: each call manages ONE independent piece of state.
  // We keep them separate (not one object) so React can batch
  // efficiently and each setter is stable across renders.
  const [mode,     setMode]     = useState("login"); // "login" | "signup"
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});      // { email?: string, password?: string }
  const [loading,  setLoading]  = useState(false);

  // ── Validation ─────────────────────────────────────────────
  function validate() {
    const errs = {};
    if (!EMAIL_RE.test(email))     errs.email    = "Enter a valid email address.";
    if (password.length < 6)       errs.password = "Password must be at least 6 characters.";
    if (mode === "signup" && !name.trim()) errs.name = "Name is required.";
    return errs;
  }

  // ── Submit ─────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setErrors({});
    setLoading(true);

    // Simulate network delay (replace with real auth call e.g. Supabase)
    await new Promise((r) => setTimeout(r, 800));

    setLoading(false);
    // setUser triggers AppContext to update — App.jsx will re-render
    // and show the main app instead of the Login page
    setUser({ name: name || email.split("@")[0], email });
  }

  // ── Google OAuth (mocked) ───────────────────────────────────
  function handleGoogle() {
    setUser({ name: "John Doe", email: "john.doe@gmail.com" });
  }

  // ── Toggle login / signup ───────────────────────────────────
  function toggleMode() {
    setMode((m) => (m === "login" ? "signup" : "login"));
    setErrors({});  // clear validation errors when switching
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <span>💼</span> CareerHub
        </div>
        <p className="login-tagline">Your AI-powered career companion</p>

        {/* Google button */}
        <button type="button" className="google-btn" onClick={handleGoogle}>
          <span style={{ fontWeight: 800, fontSize: 16, fontFamily: "serif" }}>G</span>
          Continue with Google
        </button>

        <div className="auth-divider">or</div>

        {/* Email / password form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {/* Name field — only shown in signup mode */}
          {mode === "signup" && (
            <div className="fg">
              <label>Full Name</label>
              {/* Controlled input: value comes from state, onChange updates state */}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
          )}

          <div className="fg">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@email.com"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="fg">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: 4 }}
          >
            {loading ? "Signing in…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle between login / signup */}
        <p className="auth-switch">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <span className="auth-link" onClick={toggleMode}>
            {mode === "login" ? "Sign up free" : "Sign in"}
          </span>
        </p>

      </div>
    </div>
  );
}