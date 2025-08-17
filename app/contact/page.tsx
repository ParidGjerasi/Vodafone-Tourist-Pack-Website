import Header from '@/components/Header';
import './styles.css';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
<div className="page"> 

 <div className="background-contact-page">
  
    </div>
    <Header/>

    <div className="contact-page">
      <h1 className="contact-title">Contact Vodafone</h1>
      
      <div className="contact-grid">
        
        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <h3>Call Us</h3>
          <a href="tel:191" className="contact-link">+35569140</a>
          <p>24/7 Support</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h3>Email</h3>
          <a href="mailto:help@vodafone.al" className="contact-link">help@vodafone.al</a>
          <p>Quick response</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">💬</div>
          <h3>Live Chat</h3>
          <span className="contact-link">My Vodafone App</span>
          <p>Chat with agents</p>
        </div>

      </div>
    </div>
    <Footer/>

</div>

  );
}