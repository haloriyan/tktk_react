import React from "react";
import modalStyle from "./styles/Popup.module.css";

const Popup = ({children, style, onDismiss, width = "50%", containerStyle}) => {
    return (
        <div className={`modal-container ${modalStyle.modal_container}`} style={containerStyle} onClick={e => {
            if (e.target.classList.contains('modal-container')) {
                onDismiss();
            }
        }}>
            <div className={`${modalStyle.modal_body} ${style}`} style={{
                width: width
            }}>
                {children}
            </div>
        </div>
    )
}

export default Popup;