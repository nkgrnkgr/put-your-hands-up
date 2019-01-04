import * as React from 'react';

export interface NavbarProps {
  isActive: boolean;
  toggleDisplay: () => void;
  resetInput: () => void;
}

const tagLink: React.SFC<NavbarProps> = ({
  isActive = false,
  toggleDisplay = () => {},
  resetInput = () => {}
}) => (
  <nav
    className="navbar is-info is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <a className="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo-white.png"
          alt="Bulma: a modern CSS framework based on Flexbox"
          width="112"
          height="28"
        />
      </a>
      <a
        role="button"
        className="navbar-item navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        onClick={toggleDisplay}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
  </nav>
);

export default tagLink;
