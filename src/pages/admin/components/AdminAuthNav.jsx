import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function AdminAuthNav({ backTo, backLabel }) {
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
        </div>
      </div>
    </header>
  );
}

AdminAuthNav.propTypes = {
  backTo: PropTypes.string,
  backLabel: PropTypes.string,
};
