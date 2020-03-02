import React from "react";
import whatsapp from "../../icons/whatsapp-icon.png";
import "./Header.css";

function redirectToWhatsapp() {
  window.open(`https://api.whatsapp.com/send?phone=+919998478787`, "_blank");
}
export default function Header() {
  return (
    <div>
      <header className="head">JAY JALARAM JARI</header>
      <div className="mobNo" onClick={redirectToWhatsapp}>
        <img src={whatsapp} alt="whatsapp" className="whatsapp-img" />
        9998478787
      </div>
    </div>
  );
}
