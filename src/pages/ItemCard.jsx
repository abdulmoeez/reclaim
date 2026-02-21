import PropTypes from 'prop-types';
import { escapeHtml } from './admin/adminStorage';

function copyShareText(item, onToast) {
  const text = `Campus Lost & Found
${item.type.toUpperCase()} • ${item.status.toUpperCase()}
${item.title}
Building: ${item.building}
Location: ${item.location}
Date: ${item.date}
Category: ${item.category}

Tip: If claiming, describe a unique identifying detail.`;

  navigator.clipboard
    .writeText(text)
    .then(() => onToast('Copied!'))
    .catch(() => onToast("Couldn't copy (browser blocked)."));
}

export default function ItemCard({ item, onCopyToast }) {
  const handleCopy = () => copyShareText(item, onCopyToast);

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
      <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn small ghost"
          onClick={handleCopy}
          aria-label="Copy share text"
        >
          Copy share text
        </button>
      </div>
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
  onCopyToast: PropTypes.func.isRequired,
};
