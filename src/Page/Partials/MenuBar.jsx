import React, { useState } from "react";
import styles from "./styles/MenuBar.module.css";

const MenuBar = ({active, setActive}) => {
    return (
        <div className="flex column item-end" onClick={() => setActive(!active)}>
            <div className={`${styles.Bar} ${styles.BarOne} ${active ? styles.Active : ''}`}></div>
            <div className={`${styles.Bar} ${styles.BarTwo} ${active ? styles.Active : ''}`}></div>
            <div className={`${styles.Bar} ${styles.BarThree} ${active ? styles.Active : ''}`}></div>
        </div>
    )
}

export default MenuBar;