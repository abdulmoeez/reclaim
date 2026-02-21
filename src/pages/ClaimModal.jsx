import { useState } from 'react';
import PropTypes from 'prop-types';
import { escapeHtml } from './admin/adminStorage';

const UMANITOBA_EMAIL_REGEX = /^[^@]+@umanitoba\.ca$/i;

export default function ClaimModal({ item, onClose, onSubmit, onToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uniqueDetail, setUniqueDetail] = useState('');
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      nextErrors.name = 'Name is required.';
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      nextErrors.email = 'Email is required.';
    } else if (!UMANITOBA_EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = 'Email must be @umanitoba.ca format.';
    }

    const trimmedDetail = uniqueDetail.trim();
    if (!trimmedDetail) {
      nextErrors.uniqueDetail = 'Unique identifying detail is required.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      itemId: item.id,
      claimantName: trimmedName,
      claimantEmail: trimmedEmail,
      uniqueDetail: trimmedDetail,
    });
    onToast('Claim submitted. The building will review and contact you.');
    onClose();
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-modal-title"
      onClick={handleOverlayClick}
    >
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2 id="claim-modal-title">Claim: {escapeHtml(item?.title || 'Item')}</h2>
          <button
            type="button"
            className="modalClose"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="claimForm">
          <div className="formGroup">
            <label htmlFor="claim-name">Your name *</label>
            <input
              id="claim-name"
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Jane Smith"
              required
              autoComplete="name"
            />
            {errors.name && <span className="fieldError">{errors.name}</span>}
          </div>

          <div className="formGroup">
            <label htmlFor="claim-email">Your email * (must be @umanitoba.ca)</label>
            <input
              id="claim-email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., jane.smith@umanitoba.ca"
              required
              autoComplete="email"
            />
            {errors.email && <span className="fieldError">{errors.email}</span>}
          </div>

          <div className="formGroup">
            <label htmlFor="claim-detail">Unique identifying detail *</label>
            <p className="formHelp">
              Describe one detail only the owner would know (e.g., sticker, scratch, engraving). Do not include personal information.
            </p>
            <textarea
              id="claim-detail"
              className="input"
              rows={3}
              value={uniqueDetail}
              onChange={(e) => setUniqueDetail(e.target.value)}
              placeholder="e.g., Small blue sticker on the bottom corner"
              required
            />
            {errors.uniqueDetail && <span className="fieldError">{errors.uniqueDetail}</span>}
          </div>

          <div className="modalActions">
            <button type="button" className="btn ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Submit claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ClaimModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onToast: PropTypes.func.isRequired,
};
