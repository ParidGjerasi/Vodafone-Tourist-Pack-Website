"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import "./styles.css";

export default function SupportPage() {
  const router = useRouter();

  const handleEmailClick = () => {
    const email = "nakontaktoni@vodafone.com";
    const subject = "Customer Support Request";
    const body =
      "Hello Vodafone Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you for your help.\n\nBest regards,";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <>
      <div className="page support-page">
        <Header />
        <main className="main">
          <div className="hero">
            <h1 className="hero-title">Customer Support</h1>
          </div>

          <div className="support-container">
            <div className="support-icon">🎧</div>

            <h2 className="support-title">We're Here to Help!</h2>

            <p className="support-description">
              Our customer support team is available 24/7 to assist you with any
              questions about your Vodafone services, billing, technical issues,
              or account management.
            </p>

            <div className="contact-box">
              <h3>Contact Options:</h3>
              <div className="contact-options">
                <div>
                  <strong className="contact-label">📞 Call:</strong>
                  <br />
                  <span className="phone-number">111</span>
                </div>
                <div>
                  <strong className="contact-label">✉️ Email:</strong>
                  <br />
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEmailClick();
                    }}
                    className="email-link"
                  >
                    nakontaktoni@vodafone.com
                  </a>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={handleEmailClick} className="email-button">
                📧 Send Email
              </button>

              <button
                onClick={() => window.open("tel:111", "_self")}
                className="call-button"
              >
                📞 Call Now
              </button>
            </div>

            <p className="support-footer-text">
              Thank you for choosing Vodafone Albania. Your satisfaction is our
              priority.
            </p>
          </div>

          <div className="back-button-container">
            <button onClick={() => router.back()} className="back-button">
              Back
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
