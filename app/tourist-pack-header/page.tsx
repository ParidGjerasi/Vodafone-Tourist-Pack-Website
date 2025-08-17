"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivateModal from "@/components/Activate";
import { useState } from "react";

interface Pack {
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  features: string[];
}

const packs: Pack[] = [
  { title: "Weekend Explorer", subtitle: "Perfect for short city breaks in Albania", price: "700 L", duration: "3 days", features: ["3GB Data", "100 Local & Intl Minutes", "100 SMS"] },
  { title: "Holiday Pack", subtitle: "Ideal for a week at the beach or sightseeing", price: "1200 L", duration: "7 days", features: ["8GB Data", "200 Local & Intl Minutes", "Unlimited SMS"] },
  { title: "Backpacker Pack", subtitle: "Affordable option for students & solo travelers", price: "1500 L", duration: "14 days", features: ["15GB Data", "400 Local & Intl Minutes", "Unlimited SMS", "Free Social Media"] },
  { title: "Family Traveler", subtitle: "Stay connected with the whole family", price: "3000 L", duration: "30 days", features: ["30GB Shared Data", "Unlimited Family Calls", "Unlimited SMS", "4 SIM Cards Included"] },
];

export default function TouristsPackHeaderPage() {
  const [openPack, setOpenPack] = useState<Pack | null>(null);

  const handleActivate = (formData: { name: string; surname: string; email: string; phone: string; }) => {
    console.log(`Activating ${openPack?.title}`, formData);
  };

  // Inline styles mirroring your styles.css
  const styles = {
    pageBg: {
      minHeight: "100vh",
      backgroundImage: "url('/assets/syri.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    } as const,
    main: { flex: 1, maxWidth: 1200, margin: "0 auto", padding: 20 } as const,
    hero: {
      textAlign: "center",
      padding: "50px 20px",
      background: "rgba(255,255,255,0.95)",
      borderRadius: 10,
      marginBottom: 40,
      color: "#333",
    } as const,
    heroTitle: { fontSize: 36, fontWeight: "bold", marginBottom: 20, color: "#333" } as const,
    heroText: { fontSize: 18, color: "#666", maxWidth: 600, margin: "0 auto" } as const,
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 20,
      maxWidth: 800,
      margin: "30px auto",
    } as const,
    card: {
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      overflow: "hidden",
      color: "#333",
      transition: "all .3s ease",
    } as const,
    header: {
      padding: 25,
      textAlign: "center" as const,
      background: "#f8f9fa",
      borderBottom: "3px solid #e60000",
      color: "#333",
    },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#333" } as const,
    subtitle: { color: "#666", marginBottom: 15 } as const,
    price: { fontSize: 28, fontWeight: "bold", color: "#e60000" } as const,
    duration: { color: "#666", fontSize: 14 } as const,
    body: { padding: 25, color: "#333" } as const,
    features: { listStyle: "none", margin: 0, padding: 0 } as const,
    feature: {
      padding: "10px 0",
      borderBottom: "1px solid #f0f0f0",
      display: "flex",
      alignItems: "center",
      color: "#333",
    } as const,
    footer: { padding: 25, background: "#f8f9fa" } as const,
    button: {
      width: "100%",
      background: "#e60000",
      color: "#fff",
      border: "none",
      padding: 15,
      borderRadius: 8,
      fontSize: 16,
      fontWeight: "bold",
      cursor: "pointer",
    } as const,
  };

  return (
    // keep your classNames (for responsive media queries) but override with inline styles
    <div className="page tourist-pack-header" style={styles.pageBg}>
      <Header />

      <main className="main" style={styles.main}>
        <div className="hero" style={styles.hero}>
          <h1 className="hero-title" style={styles.heroTitle}>Tourist Packages We Offer</h1>
          <p className="hero-text" style={styles.heroText}>Choose the best option for your trip.</p>
        </div>

        <div className="pack-grid" style={styles.grid}>
          {packs.map((pack) => (
            <div
              key={pack.title}
              className="pack-card"
              style={styles.card}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}
            >
              <div className="pack-header" style={styles.header}>
                <div className="pack-title" style={styles.title}>{pack.title}</div>
                <div className="pack-subtitle" style={styles.subtitle}>{pack.subtitle}</div>
                <div className="pack-price" style={styles.price}>{pack.price}</div>
                <div className="pack-duration" style={styles.duration}>{pack.duration}</div>
              </div>

              <div className="pack-body" style={styles.body}>
                <ul className="pack-features" style={styles.features}>
                  {pack.features.map((feature) => (
                    <li key={feature} className="pack-feature" style={styles.feature}>
                      {/* tick mark to mirror ::before */}
                      <span style={{ color: "#e60000", fontWeight: 700, marginRight: 10 }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pack-footer" style={styles.footer}>
                <button
                  className="pack-button"
                  style={styles.button}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#cc0000")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#e60000")}
                  onClick={() => setOpenPack(pack)}
                >
                  Activate
                </button>
              </div>
            </div>
          ))}
        </div>

        <ActivateModal
          isOpen={!!openPack}
          packTitle={openPack?.title || ""}
          onClose={() => setOpenPack(null)}
          onActivate={handleActivate}
        />
      </main>

      <Footer />
    </div>
  );
}
