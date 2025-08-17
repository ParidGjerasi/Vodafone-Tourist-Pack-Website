"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from "next/navigation";

export default function SpeedTestPage() {
  const router = useRouter();

  return (
    <>
      <div className="page" style={{
        backgroundImage: "url('/assets/durres.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}>
        <Header />
        <main className="main">
          <div className="hero">
            <h1 className="hero-title">Speed Test</h1>
          </div>

          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "1rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
             <img 
                src="/assets/internet_red.png" 
                alt="Internet icon" 
                style={{ width: "100px", height: "auto" }}
               />
            </div>
            
            <h2 style={{
              fontSize: "1.8rem",
              color: "#e60000",
              marginBottom: "1.5rem",
              fontWeight: "bold"
            }}>
              Test Your Vodafone Connection
            </h2>
            
            <p style={{
              fontSize: "1.1rem",
              color: "#666",
              marginBottom: "2rem"
            }}>
              Check your internet speed with our official speed test tool
            </p>

            <div style={{
              border: "2px solid #e2e8f0",
              borderRadius: "1rem",
              overflow: "hidden",
              marginBottom: "2rem"
            }}>
              <iframe 
                src="https://fast.com/" 
                title="Internet Speed Test"
                width="100%" 
                height="400" 
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>

            <div style={{
              backgroundColor: "rgba(248, 249, 250, 0.8)",
              padding: "1.5rem",
              borderRadius: "0.8rem",
              textAlign: "left"
            }}>
              <h3 style={{ color: "#2d3748", marginBottom: "1rem" }}>Speed Test Tips:</h3>
              <ul style={{ color: "#666", lineHeight: "1.6", paddingLeft: "1.5rem" }}>
                <li>Close other applications using internet</li>
                <li>Connect directly to your router if possible</li>
                <li>Test at different times of day for accuracy</li>
                <li>Results may vary based on network conditions</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "3rem 0" }}>
            <button
              onClick={() => router.back()}
              style={{
                padding: "0.6rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#6B7280",
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