import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function AdminAuthNav({ backTo, backLabel }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap">
        <div className="navRow">
          <Link className="brand" to="/">
            <img src="/logo.png" alt="" className="logo" />
          </Link>
          <div className="navActions">
            <Link className="btn small ghost" to={backTo || '/'}>
              {backLabel || '← Back to site'}
            </Link>
          </div>
          <button
            type="button"
            className="navMenuBtn"
            aria-label="Toggle menu"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((o) => !o)}
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className={`navDrawer ${mobileNavOpen ? 'isOpen' : ''}`}>
          <Link to={backTo || '/'} onClick={() => setMobileNavOpen(false)}>
            {backLabel || '← Back to site'}
          </Link>
        </div>
      </div>
    </header>
  );
}

AdminAuthNav.propTypes = {
  backTo: PropTypes.string,
  backLabel: PropTypes.string,
};
