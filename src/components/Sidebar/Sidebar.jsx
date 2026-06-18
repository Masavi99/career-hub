import { NavLink } from "react-router-dom";
import { NAV_PAGES } from "../../utils/Constants";
import { useApp } from "../../context/AppContext";

export default function Sidebar() {
  const { theme, setTheme } = useApp();
  const mainPages = NAV_PAGES.filter((p) => p.section === "main");
  const morePages = NAV_PAGES.filter((p) => p.section === "more");

  const renderLinks = (pages) =>
    pages.map((page) => (
      <li key={page.id}>
        <NavLink
          to={page.path}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">{page.icon}</span>
          {page.label}
        </NavLink>
      </li>
    ));
    return(
      <aside className="sidebar">
        <h2>CareerHub</h2>
        <nav>
          <ul className="nav-section">{renderLinks(mainPages)}</ul>
          <div className="nav-divider"/>
          <ul className="nav-section">{renderLinks(morePages)}</ul>
        </nav>
        <button
        className="theme-toggle" onClick={()=>setTheme(theme==="dark"?"light":"dark")}
        >
        {theme==="dark"?"☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>
    );
}
