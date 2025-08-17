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

const packs: Pack[] = [
  {
    title: "Basic Pack",
    subtitle: "Perfect for short visits",
    price: "500 L",
    duration: "3 days",
    features: ["2GB Data", "50 Minutes", "100 SMS"],
  },
  {
    title: "Standard Pack",
    subtitle: "Great for week-long stays",
    price: "1000 L",
    duration: "7 days",
    features: ["5GB Data", "100 Minutes", "Unlimited SMS"],
  },
  {
    title: "Student Pack",
    subtitle: "Affordable for students & young adults",
    price: "800 L",
    duration: "30 days",
    features: ["10GB Data", "300 Minutes", "Unlimited SMS", "Student Discount"],
  },
  {
    title: "Family Pack",
    subtitle: "Perfect for the whole family",
    price: "2500 L",
    duration: "30 days",
    features: ["25GB Shared Data", "Unlimited Family Calls", "Unlimited SMS", "4 SIM Cards"],
  },
];

export default function PackagesPage() {
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
            <h1 className="hero-title">Packages We Offer</h1>
          </div>

          <div className="pack-grid">
            {packs.map((pack, index) => (
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