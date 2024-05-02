import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this university?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
