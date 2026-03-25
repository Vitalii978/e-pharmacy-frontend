import React from 'react';
import './ButtonsModal.css';

const ButtonsModal = ({ title, cancelAction }) => {
  return (
    <div className="modal-buttons">
      <button type="submit" className="modal-btn confirm-btn">
        {title}
      </button>

      <button
        type="button"
        className="modal-btn cancel-btn"
        onClick={() => cancelAction(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default ButtonsModal;
