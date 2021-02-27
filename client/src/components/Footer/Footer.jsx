import React from "react";
import "./Footer.css";
import Logo from "../../Assets/Images/roam_inverted.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer p-4 mt-5">
      <div className="content has-text-centered">
        <div className="columns is-vcentered">
          <div className="column is-2">
            <div className="navbar-brand">
              <Link to="/">
                <img src={Logo} width="112" className="ml-4 mt-1 footer-logo" />
              </Link>
            </div>
          </div>
          <div className="column is-9">
            <p>
              <strong className="has-text-light">Roam</strong> by{" "}
              <a href="https://github.com/jeanarose" target="_blank">
                Jeana Rose Mathis
              </a>
              ,
              <a href="https://github.com/mollymccollumwx" target="_blank">
                {"  "}
                Molly McCollum
              </a>
              ,{" "}
              <a href="https://github.com/pkriengsiri" target="_blank">
                Pete Kriengsiri
              </a>
              , &{" "}
              <a href="https://github.com/tonyschwebach" target="_blank">
                Tony Schwebach
              </a>
              . The source code is licensed
              <a
                className="has-text-light"
                href="http://opensource.org/licenses/mit-license.php"
              >
                {" "}
                MIT.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
