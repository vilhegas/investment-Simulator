import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <header
      style={{
        padding: "16px 20px",
        borderBottom: "1px solid #1b2a44",
        display: "flex",
        gap: "20px",
      }}
    >
      <strong style={{ marginRight: "20px" }}>USD Investor Dashboard</strong>

      <NavLink to="/">Home</NavLink>
      <NavLink to="/simulator">Simulator</NavLink>
      <NavLink to="/portfolio">Portfolio</NavLink>
    </header>
  );
}
