'use client';
import { useState } from 'react';
import './styles.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FixTVPage() {
  const [activePackage, setActivePackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'basic',
      title: 'Basic Bundle',
      price: '29€/month',
      features: [
        '50 Mbps Internet',
        '80+ TV Channels',
        'Free Installation',
        'WiFi Router Included'
      ],
      featured: false
    },
    {
      id: 'premium',
      title: 'Premium Bundle',
      price: '49€/month',
      features: [
        '200 Mbps Internet',
        '150+ TV Channels',
        'Premium Sports Channels',
        'HD & 4K Content',
        'Video on Demand',
        'Smart TV App'
      ],
      featured: true
    },
    {
      id: 'ultimate',
      title: 'Ultimate Bundle',
      price: '69€/month',
      features: [
        '500 Mbps Internet',
        '200+ TV Channels',
        'International Channels',
        'Premium Movie Packages',
        'Multi-room Setup',
        'Cloud DVR'
      ],
      featured: false
    }
  ];

  const handleActivate = (packageId: string) => {
    if (activePackage === packageId) {
      setActivePackage(null);
    } else {
      setActivePackage(packageId);
    }
  };

  return (
    <>
      <div className="fix-tv-page">
        <div className="background"></div>
        <Header />
        <main className="main">
          <section className="packages-section">
            <h2>Internet & TV Packages</h2>
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`package-card ${pkg.featured ? 'featured' : ''} ${activePackage === pkg.id ? 'active' : ''}`}
                >
                  {pkg.featured && <div className="popular-badge">Best Value</div>}
                  <h3>{pkg.title}</h3>
                  <div className="price">{pkg.price}</div>
                  <ul className="features">
                    {pkg.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    className={`subscribe-btn ${activePackage === pkg.id ? 'active' : ''}`}
                    onClick={() => handleActivate(pkg.id)}
                    disabled={!!activePackage && activePackage !== pkg.id}
                  >
                    {activePackage === pkg.id ? 'Deactivate' : 'Activate'}
                  </button>
                  {activePackage === pkg.id && (
                    <div className="active-status">✅ Package is currently active</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="features-section">
            <h2>Why Choose Vodafone Fix & TV?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <h4>Ultra-Fast Internet</h4>
                <p>Enjoy lightning-fast speeds up to 500 Mbps for seamless streaming and gaming</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📺</div>
                <h4>Premium TV Content</h4>
                <p>Access to hundreds of channels including sports, movies, and international content</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h4>Multi-Device Access</h4>
                <p>Watch your favorite shows on TV, smartphone, tablet, or laptop</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛠️</div>
                <h4>Professional Installation</h4>
                <p>Free professional installation and setup by our certified technicians</p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
