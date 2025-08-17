"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PacketList from "../components/PacketList";
import { ActivationStep } from "@/components/ActivationStep";
import './styles.css'; 

const activationSteps = [
  {
    number: "1",
    title: "Choose Pack",
    text: "Select the tourist pack that fits your needs",
  },
  {
    number: "2",
    title: "Click Activate",
    text: "Press the activate button on your chosen pack",
  },
  {
    number: "3",
    title: "Start Using",
    text: "Your pack is ready to use immediately",
  },
  {
   number: "4",
   title: "Enjoy Benefits",
   text: "Access all features and stay connected throughout your trip",
 }
];

const DummyPacketList = () => {
  // your logic here
  return (
    <div>
      {/* Render your packet list here */}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="page main-page">   
      <Header />

      <main className="main">
        {/* Hero Section */}
        <section className="hero">
          <h1 className="hero-title">Welcome to Vodafone Albania</h1>
          <p className="hero-text">
            Stay connected during your visit to Albania with our special tourist
            packages. Choose the perfect plan for your needs.
          </p>
        </section>

        {/* Live Database Packs Section */}
        <section>
          <PacketList />
        </section>

        {/* How to Activate Section */}
        <h2 className="section-title">How to Activate</h2>
        <div className="steps">
          {activationSteps.map((step, index) => (
            <ActivationStep
              key={index}
              number={step.number}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}