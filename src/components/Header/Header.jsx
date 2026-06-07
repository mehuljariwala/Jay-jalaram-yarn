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
      const isScrolled = window.scrollY > 8;
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
    <header className={`header-bar ${scrolled ? "header-bar-scrolled" : ""}`}>
      <div className="header-brand">
        <span className="header-mark">JJ</span>
        <span className="header-name">
          JAY JALARAM <span className="header-name-accent">JARI</span>
        </span>
      </div>

      <button
        type="button"
        className="header-contact-btn"
        onClick={redirectToWhatsapp}
        aria-label="Contact on WhatsApp"
      >
        <img src={whatsapp} alt="" className="header-contact-icon" />
        <span className="header-contact-num">99984 78787</span>
      </button>
    </header>
  );
}
