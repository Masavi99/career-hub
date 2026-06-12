import { createContext,useContext,useReducer,useMemo } from "react";
import { JobReducer } from "../utils/Jobreducer";
import { useLocalStorage } from "../hooks/Uselocalstorage";
import { INITIAL_JOBS } from "../utils/Constants";


const AppContext=createContext(null);
const INITIAL_RESUME = {
  name: "John Doe", title: "Frontend Developer",
  email: "john.doe@email.com", phone: "+1 123-456-7890",
  location: "San Francisco, CA",
  summary: "Frontend Developer with 3+ years building React apps.",
  skills: ["React", "TypeScript", "CSS", "Node.js"],
  experience: [],
};

export function AppProvider({children}){

         const [jobs, dispatch] = useReducer(JobReducer, INITIAL_JOBS);
  // useLocalStorage: persists resume and theme across page refreshes
  const [resume, setResume] = useLocalStorage("ch_resume", INITIAL_RESUME);
  const [theme,  setTheme]  = useLocalStorage("ch_theme",  "dark");
  const [user,   setUser]   = useLocalStorage("ch_user",   null);
 
    

        const value = useMemo( () => ({ jobs, dispatch, resume, setResume, theme, setTheme, user, setUser }),
    [jobs, resume, setResume, theme, setTheme, user, setUser]
  );
 document.documentElement.setAttribute("data-theme", theme);
 
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
 
// Named hook so consumers get a clear error if used outside the provider
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp() must be inside <AppProvider>");
  return ctx;
}
 