"use client";
import React, { useEffect, useState } from "react";

export default function PacketList() {
  const [packets, setPackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [form, setForm] = useState({ name: "", surname: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // load packets on mount
  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/packets", { signal: ac.signal, cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch packets");
        return r.json();
      })
      .then((packetsData) => {
        const sorted = packetsData.slice().sort((a, b) => Number(a.price) - Number(b.price));
        setPackets(sorted);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Load failed");
          setLoading(false);
        }
      });
    return () => ac.abort();
  }, []);

  const fetchPackets = () => {
    fetch("/api/packets", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        const sorted = data.slice().sort((a, b) => Number(a.price) - Number(b.price));
        setPackets(sorted);
      })
      .catch((err) => setError(err.message || "Load failed"));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.surname.trim()) errors.surname = "Surname is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Please enter a valid email address";
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+35569\d{7}$/.test(form.phone)) errors.phone = "Phone must start with +35569 followed by 7 digits";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // If active -> toggle deactivate (no body)
  // If not active -> open modal to collect details and POST /api/activations
  const toggleActivation = (packet) => {
    if (packet.isActive) {
      setSubmitting(true);
      // Use the proxy shim: POST /api/packets/:id/toggle
      fetch(`/api/packets/${packet.id}/toggle`, { method: "POST" })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to deactivate packet");
          return res.json().catch(() => ({}));
        })
        .then(() => fetchPackets())
        .catch((err) => {
          console.error("Error deactivating packet:", err);
          setError("Failed to deactivate packet. Please try again.");
        })
        .finally(() => setSubmitting(false));
    } else {
      setSelectedPacket(packet);
      setModalOpen(true);
      setFormErrors({});
    }
  };

  // Submit modal -> stores customer details via /api/activations
  const handleActivate = (e) => {
    e.preventDefault();
    if (!validateForm() || !selectedPacket) return;

    setSubmitting(true);
    const activationData = {
      packetId: selectedPacket.id,
      customerInfo: {
        name: form.name.trim(),
        surname: form.surname.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
    };

    fetch("/api/activations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activationData),
    })
      .then(async (res) => {
        if (!res.ok) {
          let msg = "Failed to activate packet";
          try {
            const errorData = await res.json();
            msg = errorData?.message || msg;
          } catch {}
          throw new Error(msg);
        }
        return res.json().catch(() => ({}));
      })
      .then(() => {
        fetchPackets();
        closeModal();
        alert(`${selectedPacket.name} has been activated successfully!`);
      })
      .catch((err) => {
        console.error("Error activating packet:", err);
        setError(err.message || "Failed to activate packet");
      })
      .finally(() => setSubmitting(false));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPacket(null);
    setForm({ name: "", surname: "", email: "", phone: "" });
    setFormErrors({});
    setSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (loading) return <div style={{ textAlign: "center", padding: 20 }}>Loading...</div>;

  if (error)
    return (
      <div style={{ textAlign: "center", padding: 20, color: "red" }}>
        Error: {error}
        <button
          onClick={() => {
            setError(null);
            fetchPackets();
          }}
          style={{ marginLeft: 10, padding: "5px 10px" }}
        >
          Retry
        </button>
      </div>
    );

  const hasActivePacket = packets.some((p) => p.isActive);

  return (
    <>
      <div className="title-bar">
        <h1 className="hero-title">Vodafone Tourist Packs</h1>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Statistics Bar (only packs) */}
        <div className="stats-bar">
          <div className="stat">
            <div className="stat-number">{packets.length}</div>
            <div className="stat-label">Total Packs</div>
          </div>
          <div className="stat">
            <div className="stat-number">{packets.filter((p) => p.isActive).length}</div>
            <div className="stat-label">Active Packs</div>
          </div>
        </div>

        {/* Packs Grid */}
        <div className="pack-grid">
          {packets.map((packet) => {
            const isDisabled = hasActivePacket && !packet.isActive;
            return (
              <div key={packet.id} className={`pack-card ${packet.isActive ? "active" : ""}`}>
                <div className={`pack-header ${packet.isActive ? "active" : ""}`}>
                  <div className="pack-title">{packet.name}</div>
                  <div className="pack-subtitle">{packet.description}</div>
                  <div className="pack-price">
                    {packet.price} {packet.currency}
                  </div>
                  <div className="pack-duration">{packet.durationDays} days</div>
                </div>

                <div className="pack-body">
                  <ul className="pack-features">
                    <li className="pack-feature">{packet.dataAmount}</li>
                    <li className="pack-feature">{packet.minutes}</li>
                    <li className="pack-feature">{packet.sms}</li>
                    {packet.category === "Student" && <li className="pack-feature">Student Discount</li>}
                    {packet.category === "Family" && <li className="pack-feature">4 SIM Cards</li>}
                  </ul>
                </div>

                <div className="pack-footer">
                  <div className="pack-actions">
                    <button
                      onClick={() => toggleActivation(packet)}
                      disabled={isDisabled || submitting}
                      className={`pack-button ${packet.isActive ? "active" : ""} ${submitting ? "loading" : ""}`}
                    >
                      {packet.isActive ? "DEACTIVATE" : "ACTIVATE"}
                    </button>
                  </div>

                  {packet.isActive ? (
                    <div className="active-status">
                      <span>✅</span>
                      <span>Packet is currently active</span>
                    </div>
                  ) : (
                    <div className="status-placeholder" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activation Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} disabled={submitting}>
              ✖
            </button>
            <h2 className="modal-title">Activate {selectedPacket?.name}</h2>
            <form className="modal-form" onSubmit={handleActivate}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className={`modal-input ${formErrors.name ? "error" : ""}`}
                />
                {formErrors.name && <div className="modal-error">{formErrors.name}</div>}
              </div>

              <div>
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={form.surname}
                  onChange={handleInputChange}
                  required
                  className={`modal-input ${formErrors.surname ? "error" : ""}`}
                />
                {formErrors.surname && <div className="modal-error">{formErrors.surname}</div>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  className={`modal-input ${formErrors.email ? "error" : ""}`}
                />
                {formErrors.email && <div className="modal-error">{formErrors.email}</div>}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+35569xxxxxxx"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                  className={`modal-input ${formErrors.phone ? "error" : ""}`}
                />
                {formErrors.phone && <div className="modal-error">{formErrors.phone}</div>}
              </div>

              <button type="submit" className="modal-submit" disabled={submitting}>
                {submitting ? "Activating..." : "Activate"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Styles */}
      <style jsx>{`
        /* Centered red title bar that is NOT fixed */
        .title-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #e60000 0%, #cc0000 100%);
          color: white;
          padding: 12px 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          width: fit-content;
          margin: 16px auto 0; /* sits under your hero */
        }
        .hero-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
          color: white;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin: 20px auto;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
        }
        .stat { text-align: center; }
        .stat-number { font-size: 24px; font-weight: bold; color: #e60000; }
        .stat-label { color: #666; font-size: 14px; }

        .pack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
        .pack-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .pack-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
        .pack-card.active { border: 2px solid #28a745; box-shadow: 0 4px 15px rgba(40,167,69,0.2); }

        .pack-header {
          padding: 25px;
          text-align: center;
          background: #f8f9fa;
          border-bottom: 3px solid #e60000;
        }
        .pack-header.active { background: #e8f5e8; border-bottom-color: #28a745; }
        .pack-title { font-size: 20px; font-weight: bold; margin-bottom: 8px; color: #333; }
        .pack-subtitle { color: #666; margin-bottom: 15px; font-size: 14px; }
        .pack-price { font-size: 28px; font-weight: bold; color: #e60000; margin-bottom: 5px; }
        .pack-duration { color: #666; font-size: 14px; }

        .pack-body { padding: 25px; flex-grow: 1; }
        .pack-features { list-style: none; margin: 0; padding: 0; }
        .pack-feature { padding: 10px 0; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; }
        .pack-feature:last-child { border-bottom: none; }
        .pack-feature::before { content: "✓"; color: #e60000; font-weight: bold; margin-right: 10px; font-size: 16px; }

        .pack-footer { padding: 25px; background: #f8f9fa; margin-top: auto; }
        .pack-actions { display: flex; gap: 10px; justify-content: center; margin-bottom: 15px; }
        .pack-button {
          background: #e60000; color: white; border: none; padding: 12px 24px; border-radius: 8px;
          font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.3s ease; position: relative;
        }
        .pack-button:hover { background: #cc0000; }
        .pack-button.active { background: #28a745; }
        .pack-button.active:hover { background: #218838; }
        .pack-button:disabled { background: #ccc; cursor: not-allowed; }
        .pack-button.loading { background: #ccc; cursor: not-allowed; }
        .pack-button.loading::after {
          content: ""; position: absolute; width: 16px; height: 16px; margin: auto;
          border: 2px solid transparent; border-top-color: #ffffff; border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .active-status {
          padding: 10px; background: #d4edda; border-radius: 6px; font-size: 14px;
          color: #155724; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px; height: 40px;
        }
        .status-placeholder { height: 40px; }

        .modal-overlay {
          position: fixed; inset: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex; justify-content: center; align-items: center; z-index: 1001;
        }
        .modal-content {
          background-color: #fff; padding: 2rem; border-radius: 1rem; width: 90%; max-width: 400px; position: relative;
        }
        .modal-close { position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; font-size: 1.5rem; cursor: pointer; }
        .modal-title { text-align: center; margin-bottom: 1rem; color: #333; }
        .modal-form { display: flex; flex-direction: column; gap: 1rem; }
        .modal-input { padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; }
        .modal-input.error { border-color: #e60000; }
        .modal-error { color: #e60000; font-size: 0.875rem; margin-top: 0.25rem; }
        .modal-submit { margin-top: 1rem; padding: 0.6rem; font-size: 1rem; background-color: #e60000; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
        .modal-submit:hover { background-color: #cc0000; }

        @media (max-width: 768px) {
          .pack-grid { grid-template-columns: 1fr; }
          .stats-bar { flex-direction: column; gap: 15px; max-width: 100%; }
        }
      `}</style>
    </>
  );
}
