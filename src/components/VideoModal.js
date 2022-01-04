import React from "react";
import "../css/master.css";

export default function VideoModal({ showModal, setShowModal, video, title }) {
  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content modal-content-bg">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close btn-light text-white"
              data-bs-dismiss="modal"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              title={title}
              src={`https://www.youtube.com/embed/${video}`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
