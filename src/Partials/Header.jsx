import React from "react";
import styles from "./styles/Header.module.css";

const Header = ({children, accent_color = '#fff', style}) => {
    return (
        <div className="fixed top-0 left-0 right-0 flex row item-center justify-center" style={{
            zIndex: 3,
            backgroundColor: accent_color
        }}>
            <div className={`flex row item-center h-55 ${styles.Header}`} style={style}>
                {children}
            </div>
        </div>
    )
}

export default Header;