import React from 'react';

const Modal = ({ handleClose, show, handleSubmit, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    console.log("children", children);
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
            </section>
        </div>
    );
};

export default Modal;