import React from "react";
import "./Navbar.css";

function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          Lectorium <span className="navbar-subtitle">/ Diario de Lectura</span>
        </h1>

        <nav className="navbar-nav">
          <button
            className={`nav-link ${activeTab === "read" ? "active" : ""}`}
            onClick={() => setActiveTab("read")}
          >
            Leídos
          </button>
          <button
            className={`nav-link ${activeTab === "to-read" ? "active" : ""}`}
            onClick={() => setActiveTab("to-read")}
          >
            Por leer
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
