"use client";
import img from "./../public/assets/logo.webp";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const menuItems = [
    { name: "Mobile", href: "/" },
    { name: "Fix & TV", href: "/fix-tv" },
    { name: "eShop", href: "/eshop" },
    { name: "Tourist Pack", href: "/tourist-pack-header" },
    { name: "Support", href: "/support" },
    { name: "Speed Test", href: "/speed-test" },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const headerStyle = {
    backgroundColor: "white",
    borderBottom: "1px solid #ddd",
    padding: "15px 0",
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
  };

  const headerContentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  };

  const navStyle = {
    display: "flex",
    gap: "30px",
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "#333",
    padding: "10px 0",
    border: "none",
    outline: "none",
    transition: "color 0.3s ease",
  };

  const headerButtonsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const headerButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  };

  const mobileMenuButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "8px",
    display: "none" as const,
  };

  const mobileNavStyle = {
    display: mobileMenuOpen ? "block" : "none",
    backgroundColor: "white",
    borderTop: "1px solid #ddd",
    padding: "20px",
  };

  const mobileNavLinkStyle = {
    display: "block",
    textDecoration: "none",
    color: "#333",
    padding: "15px 0",
    borderBottom: "1px solid #f0f0f0",
    transition: "color 0.3s ease",
  };

  const searchContainerStyle = { 
    position: "relative" as const 
  };
  
  const searchInputStyle = {
    padding: "0.4rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "0.5rem",
    outline: "none",
  };

  const searchDropdownStyle = {
    position: "absolute" as const,
    top: "35px",
    left: 0,
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    width: "200px",
    zIndex: 10,
  };

  const searchResultItemStyle = {
    display: "block",
    padding: "0.5rem",
    textDecoration: "none",
    color: "#333",
    transition: "background-color 0.3s ease",
  };

  const noResultsStyle = { 
    padding: "0.5rem", 
    color: "#888" 
  };

  const responsiveStyles = `
    @media (max-width: 768px) {
      .mobile-menu-button { display: block !important; }
      .nav { display: none !important; }
    }
  `;

  return (
    <>
      <style jsx>{responsiveStyles}</style>
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          {/* Logo */}
          <Link href="/" style={logoStyle}>
            <Image
              src={img}
              alt="vodafone logo"
              width={50}
              height={50}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav style={navStyle} className="nav">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#e60000";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#333";
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Header Buttons + Search */}
          <div style={headerButtonsStyle}>
            {searchOpen && (
              <div style={searchContainerStyle}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={searchInputStyle}
                />
                {/* Search results dropdown */}
                {query && (
                  <div style={searchDropdownStyle}>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          style={searchResultItemStyle}
                          onClick={() => {
                            setQuery("");
                            setSearchOpen(false);
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.backgroundColor = "#f5f5f5";
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.backgroundColor = "transparent";
                          }}
                        >
                          {item.name}
                        </Link>
                      ))
                    ) : (
                      <div style={noResultsStyle}>
                        No results
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <button
              style={headerButtonStyle}
              onClick={() => setSearchOpen(!searchOpen)}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              🔍
            </button>

            <button
              style={{...mobileMenuButtonStyle, ...headerButtonStyle}}
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav style={mobileNavStyle}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={mobileNavLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#e60000";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#333";
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
