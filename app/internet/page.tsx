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
    title: "GigaFibra Basic",
    subtitle: "Perfect for light browsing",
    price: "1,200 L",
    duration: "Monthly",
    features: ["30 Mbps Download", "15 Mbps Upload", "Unlimited Data", "Free Installation", "24/7 Support"],
  },
  {
    title: "GigaFibra Standard",
    subtitle: "Great for streaming & work",
    price: "1,600 L",
    duration: "Monthly",
    features: ["50 Mbps Download", "25 Mbps Upload", "Unlimited Data", "Free Wi-Fi Router", "HD Streaming"],
  },
  {
    title: "GigaFibra Premium",
    subtitle: "High-speed for power users",
    price: "2,200 L",
    duration: "Monthly",
    features: ["100 Mbps Download", "50 Mbps Upload", "Unlimited Data", "Advanced Router", "4K Streaming", "Priority Support"],
  },
  {
    title: "GigaFibra Ultra",
    subtitle: "Ultimate speed experience",
    price: "3,500 L",
    duration: "Monthly",
    features: ["1 Gbps Download", "500 Mbps Upload", "Unlimited Data", "Premium Router", "8K Ready", "VIP Support"],
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
            <h1 className="hero-title">Internet Packages We Offer</h1>
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