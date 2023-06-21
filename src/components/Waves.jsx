import React from "react";
import styles from "./styles/Waves.module.css";

const Waves = ({count = 3, width = '10%', height = 3, depth = 15}) => {
    return (
        <div style={{marginBottom: 20}}>
            <div className={styles.line} style={{
                width: width,
                height: height * depth,
            }}>
                <div className={styles.mask} style={{
                    width: `25%`,
                    aspectRatio: 1/1,
                }}></div>
            </div>
        </div>
    )
}

export default Waves;