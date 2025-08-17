"use client";

import { FormEvent, ChangeEvent, useState } from "react";

interface ActivateModalProps {
  packTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onActivate: (formData: { name: string; surname: string; email: string; phone: string }) => void;
}

export default function ActivateModal({ packTitle, isOpen, onClose, onActivate }: ActivateModalProps) {
  const [form, setForm] = useState({ name: "", surname: "", email: "", phone: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onActivate(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          width: "90%",
          maxWidth: "400px",
          position: "relative",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Activate {packTitle}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={form.surname}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="+35569xxxxxxx"
            pattern="\+35569\d{7}"
            value={form.phone}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{
              marginTop: "1rem",
              padding: "0.6rem",
              fontSize: "1rem",
              backgroundColor: "#e60000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Activate
          </button>
        </form>
      </div>
    </div>
  );
}
