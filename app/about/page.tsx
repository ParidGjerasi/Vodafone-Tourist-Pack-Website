import './styles.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="about-page">
        <div className="background-about-page"></div>

        <div className="page">
          <main className="main">
            <h1 className="section-title">About Vodafone Albania</h1>

            <div className="about-box">
              <p>
                Vodafone Albania is committed to providing reliable mobile services to both locals and tourists.
                With extensive 4G and 5G coverage across the country, we make it easy for you to stay connected wherever you go.
              </p>
            </div>

            <div className="about-box">
              <p>
                Our prepaid packages are simple, transparent, and tailored to meet your travel needs.
                Whether you're visiting for a few days or staying longer, Vodafone has the perfect plan for you.
              </p>
            </div>

            <div className="about-box">
              <p>
                We are proud to be Albania’s leading network provider, offering great service, affordable pricing,
                and excellent customer support in multiple languages.
              </p>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

