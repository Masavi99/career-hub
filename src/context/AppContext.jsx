import { createContext, useContext, useReducer, useMemo, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { JobReducer } from "../utils/Jobreducer";
import { useLocalStorage } from "../hooks/Uselocalstorage";
import { INITIAL_JOBS } from "../utils/Constants";

const AppContext = createContext(null);
const INITIAL_RESUME = {
  name: "John Doe", title: "Frontend Developer",
  email: "john.doe@email.com", phone: "+1 123-456-7890",
  location: "San Francisco, CA",
  summary: "Frontend Developer with 3+ years building React apps.",
  skills: ["React", "TypeScript", "CSS", "Node.js"],
  experience: [],
};

export function AppProvider({ children }) {
  const [jobs, dispatch] = useReducer(JobReducer, INITIAL_JOBS);
  const [resume, setResume] = useLocalStorage("ch_resume", INITIAL_RESUME);
  const [theme, setTheme] = useLocalStorage("ch_theme", "dark");

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? { uid: firebaseUser.uid, name: firebaseUser.displayName, email: firebaseUser.email }
          : null
      );
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // Firebase doesn't re-fire onAuthStateChanged after updateProfile(),
  // so callers (e.g. Settings) re-sync `user` from auth.currentUser manually.
  const refreshUser = () => {
    const firebaseUser = auth.currentUser;
    setUser(
      firebaseUser
        ? { uid: firebaseUser.uid, name: firebaseUser.displayName, email: firebaseUser.email }
        : null
    );
  };

  const value = useMemo(
    () => ({ jobs, dispatch, resume, setResume, theme, setTheme, user, authLoading, refreshUser }),
    [jobs, resume, setResume, theme, setTheme, user, authLoading]
  );

  document.documentElement.setAttribute("data-theme", theme);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp() must be inside <AppProvider>");
  return ctx;
}
