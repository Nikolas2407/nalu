"use client";
import { useState, useEffect } from "react";
import "./css/Navbar.css";
import Logo from "../../public/Nalu.png";

const links = [
  { label: "Inicio",      href: "#inicio" },
  { label: "Sabores",   href: "#Sabores" },
  { label: "Nosotros", href: "#Nosotros" },
  { label: "Encuentrános",    href: "#Encuentranos" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeLink, setActive]   = useState("#inicio");

  /* ── Detectar scroll para sombra extra ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active link por scroll ── */
  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className={`navbar__inner${scrolled ? " scrolled" : ""}`}>

          {/* Logo */}
          <a href="#inicio" className="navbar__logo" aria-label="Ir al inicio">
            <img src={Logo.src} alt="Logo" className="navbar__logo-image" />
          </a>

          {/* Links desktop */}
          <ul className="navbar__links">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={activeLink === href ? "active" : ""}
                  onClick={() => handleLinkClick(href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contacto"
            className="navbar__cta"
            onClick={() => handleLinkClick("#contacto")}
          >
            Comprar
          </a>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? " open" : ""}`}>
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={activeLink === href ? "active" : ""}
            onClick={() => handleLinkClick(href)}
          >
            {label}
          </a>
        ))}
        <a
          href="#contacto"
          className="navbar__mobile__cta"
          onClick={() => handleLinkClick("#contacto")}
        >
          Comprar
        </a>
      </div>
    </>
  );
}
