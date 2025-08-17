"use client";
import './styles.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ActivateModal from '@/components/Activate';
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Pack {
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  features: string[];
}

const roamingPacks: Pack[] = [
  {
    title: "Europe Basic",
    subtitle: "Essential roaming for Europe",
    price: "1200 L",
    duration: "7 days",
    features: ["3GB EU Data", "60 Minutes", "50 SMS", "15 EU Countries"],
  },
  {
    title: "Europe Premium",
    subtitle: "Extended European coverage",
    price: "2000 L",
    duration: "14 days",
    features: ["8GB EU Data", "150 Minutes", "Unlimited SMS", "28 EU Countries", ],
  },
  {
    title: "Global Explorer",
    subtitle: "Worldwide roaming coverage",
    price: "3500 L",
    duration: "30 days",
    features: ["5GB Global Data", "100 Minutes", "100 SMS", "80+ Countries", "Emergency Support"],
  },
  {
    title: "Business Roaming",
    subtitle: "Professional travel solution",
    price: "4500 L",
    duration: "30 days",
    features: ["15GB Global Data", "300 Minutes", "Unlimited SMS", "100+ Countries", "Priority Support",],
  },
];

export default function RoamingPage() {
  const router = useRouter();
  const [openPack, setOpenPack] = useState<Pack | null>(null);

  const handleActivate = (formData: { name: string; surname: string; email: string; phone: string }) => {
    console.log(`Activating ${openPack?.title}`, formData);
  };

  return (
    <>
      <div className="page">
        <Header />
        <main className="main">
          <div className="hero">
            <h1 className="hero-title">Roaming Packages</h1>
            <p className="hero-text">Stay connected wherever you travel with our international roaming plans</p>
          </div>

          <div className="pack-grid">
            {roamingPacks.map((pack, index) => (
              <div key={index} className="pack-card">
                <div className="pack-header">
                  <div className="pack-title">{pack.title}</div>
                  <div className="pack-subtitle">{pack.subtitle}</div>
                  <div className="pack-price">{pack.price}</div>
                  <div className="pack-duration">{pack.duration}</div>
                </div>
                <div className="pack-body">
                  <ul className="pack-features">
                    {pack.features.map((feature, i) => (
                      <li key={i} className="pack-feature">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pack-footer">
                  <button
                    className="pack-button"
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

          <div style={{ textAlign: "center", margin: "3rem 0" }}>
            <button
              onClick={() => router.back()}
              style={{
                padding: "0.6rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}





