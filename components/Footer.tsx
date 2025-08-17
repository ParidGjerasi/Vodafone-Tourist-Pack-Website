const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "https://careers.vodafone.com/albania/", label: "Careers" },
    { href: "https://www.vodafone.al/per-median/lajmerime/", label: "News" },
  ],
  services: [
    { href: "/packages", label: "Packages" },
    { href: "/roaming", label: "Roaming" },
    { href: "/internet", label: "Internet" },
  ],
  support: [
    { href: "https://www.vodafone.al/suport/", label: "Help Center" },
    { href: "/contact", label: "Contact" },
    { href: "https://www.vodafone.al/keshilla-per-internetin/", label: "FAQ" },
  ],
  contact: [
    { href: "https://api.whatsapp.com/send?phone=355699000140", label: "WhatsApp" },
    { href: "/email", label: "Email" },
    { href: "https://www.vodafone.al/en/business/na-kontaktoni/", label: "Phone" },
  ],
};
const socialLinks = [
  { href: "#", label: "Facebook", icon: "📘" },
  { href: "#", label: "Instagram", icon: "📷" },
  { href: "#", label: "Twitter", icon: "🐦" },
  { href: "#", label: "YouTube", icon: "📺" },
];
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) => (
  <div className="footer-section">
    <h4>{title}</h4>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          {/* Brand Section */}
          <div>
            <p className="footer-description">
              We provide the best mobile services for tourists visiting Albania.
              Stay connected with our affordable packages.
            </p>
          </div>

          {/* Footer Links */}
          <div className="footer-sections">
            <FooterSection title="Company" links={footerLinks.company} />
            <FooterSection title="Services" links={footerLinks.services} />
            <FooterSection title="Support" links={footerLinks.support} />
            <FooterSection title="Contact" links={footerLinks.contact} />
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            © 2025 Vodafone Albania. All rights reserved.
          </div>
          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <li key={index} aria-label={link.label}>
                {link.icon}
              </li>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
