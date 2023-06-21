import React from "react";
import styles from "./styles/HeaderStream.module.css";

const HeaderStream = ({title}) => {
    return (
        <div className={`fixed bg-white top-0 left-0 right-0 border bottom flex row item-center justify-center h-70 ${styles.HeaderStream}`}>
            {title}
        </div>
    )
}

export default HeaderStream;