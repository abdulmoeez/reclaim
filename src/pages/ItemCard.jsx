import PropTypes from 'prop-types';
import { escapeHtml } from './admin/adminStorage';

export default function ItemCard({ item, onClaimClick }) {
  const showClaim = item.status !== 'returned' && typeof onClaimClick === 'function';

  return (
    <article className="card">
      <div className="thumb">
        {item.photoDataUrl ? (
          <img src={item.photoDataUrl} alt="" />
        ) : (
          <span className="small">No photo</span>
        )}
      </div>
      <div className="topline">
        <div>
          <span className={`badge ${item.type}`}>
            {item.type.toUpperCase()}
          </span>
          <span className={`badge ${item.status}`}>
            {item.status.toUpperCase()}
          </span>
        </div>
        {item.building ? (
          <span className="badge">{escapeHtml(item.building)}</span>
        ) : null}
      </div>
      <h3 className="cardTitle">{escapeHtml(item.title || 'Untitled')}</h3>
      <p className="desc">
        {escapeHtml(item.description || 'No description provided.')}
      </p>
      <div className="meta">
        <div>
          <span className="small">Category:</span>{' '}
          {escapeHtml(item.category || '—')}
        </div>
        <div>
          <span className="small">Location:</span>{' '}
          {escapeHtml(item.location || '—')}
        </div>
        <div>
          <span className="small">Contact:</span>{' '}
          202-202-2022
        </div>
        <div>
          <span className="small">Date:</span> {escapeHtml(item.date || '—')}
        </div>
      </div>
      {showClaim && (
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            className="btn small primary"
            onClick={() => onClaimClick(item)}
            aria-label="Claim this item"
          >
            Claim
          </button>
        </div>
      )}
    </article>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    building: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    photoDataUrl: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClaimClick: PropTypes.func,
};
