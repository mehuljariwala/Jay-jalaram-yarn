import React, { useState, useEffect } from "react";
import whatsapp from "../../icons/whatsapp-icon.png";
import "./Header.css";

function redirectToWhatsapp() {
  window.open(`https://api.whatsapp.com/send?phone=+919998478787`, "_blank");
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={`header-container ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-row title-row">
        <div className="header-logo-container">
          <h1 className="header-title">
            <span className="header-title-part">JAY</span>
            <span className="header-title-part">JALARAM</span>
            <span className="header-title-part">JARI</span>
          </h1>
          <div className="header-title-decoration"></div>
        </div>
      </div>

      <div className="header-row contact-row">
        <div className="header-contact" onClick={redirectToWhatsapp}>
          <img src={whatsapp} alt="whatsapp" className="whatsapp-img" />
          <span className="header-contact-value">+91 9998478787</span>
        </div>
      </div>
    </div>
  );
}
