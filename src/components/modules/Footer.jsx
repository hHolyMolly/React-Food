import React from "react";
import { Link } from "react-router-dom";

import { logoObj } from "../../global";

function Footer() {
  return (
    <footer className="footer">
      <div className="_container">
        <div className="footer__body">
          <Link className="footer__logo footer-logo" to="/">
            <img className="footer-logo__icon" width={48} height={48} src={logoObj.imageUrl} alt="Logo" />
            <strong className="footer-logo__title">{logoObj.title}</strong>
            <p className="footer-logo__text">{logoObj.text}</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
