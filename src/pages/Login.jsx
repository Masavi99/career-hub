import { useState } from "react";
import { signUp, signIn, signInWithGoogle, mapAuthError } from "../firebase/authService";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (!EMAIL_RE.test(email)) errs.email = "Enter a valid email address.";
    if (password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (mode === "signup" && !name.trim()) errs.name = "Name is required.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (mode === "signup") {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
      // AppContext's onAuthStateChanged picks up the new session,
      // AppRoutes redirects to /dashboard automatically.
    } catch (err) {
      setErrors({ form: mapAuthError(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setErrors({});
    try {
      await signInWithGoogle();
    } catch (err) {
      setErrors({ form: mapAuthError(err) });
    }
  }

  function toggleMode() {
    setMode((m) => (m === "login" ? "signup" : "login"));
    setErrors({});
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span>💼</span> CareerHub
        </div>
        <p className="login-tagline">Your AI-powered career companion</p>

        <button type="button" className="google-btn" onClick={handleGoogle}>
          <span style={{ fontWeight: 800, fontSize: 16, fontFamily: "serif" }}>G</span>
          Continue with Google
        </button>

        <div className="auth-divider">or</div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {mode === "signup" && (
            <div className="fg">
              <label>Full Name</label>
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

          {errors.form && <span className="field-error">{errors.form}</span>}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: 4 }}
          >
            {loading ? "Signing in…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

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
