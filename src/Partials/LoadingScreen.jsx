import React, { useEffect, useState } from "react";
import styles from "./styles/Loading.module.css";

const LoadingScreen = () => {
    const [positions, setPositions] = useState([0,0,0,0,0,0,0,0,0,0]);

    useEffect(() => {
        let animationInterval = setInterval(() => {
            let thePositions = [...positions];
            positions.map((pos, p) => {
                if (p % 2 === 0) {
                    let act = "up";
                    if (thePositions[p] >= 5 && act === "down") {
                        act = "up";
                    }
                    if (thePositions[p] <= -5 && act === "up") {
                        act = "down";
                    }

                    if (act === "up") {
                        thePositions[p] -= 5;
                    } 
                    if (act === "down") {
                        thePositions[p] += 5;
                    }
                } else {
                    let act = "down";
                    if (thePositions[p] >= 5 && act === "down") {
                        act = "up";
                    }
                    if (thePositions[p] <= -5 && act === "up") {
                        act = "down";
                    }

                    if (act === "up") {
                        thePositions[p] -= 5;
                    } 
                    if (act === "down") {
                        thePositions[p] += 5;
                    }
                }
            })
            setPositions(thePositions)
        }, 100);

        return () => clearInterval(animationInterval);
    })

    return (
        <>
            <div className={styles.LoadingScreen}>
                <h3 className="m-0 flex row item-center gap-10">
                    <div style={{
                        position: 'relative',
                        top: positions[0]
                    }}>L</div>
                    <div style={{
                        position: 'relative',
                        top: positions[1]
                    }}>o</div>
                    <div style={{
                        position: 'relative',
                        top: positions[2]
                    }}>a</div>
                    <div style={{
                        position: 'relative',
                        top: positions[3]
                    }}>d</div>
                    <div style={{
                        position: 'relative',
                        top: positions[4]
                    }}>i</div>
                    <div style={{
                        position: 'relative',
                        top: positions[5]
                    }}>n</div>
                    <div style={{
                        position: 'relative',
                        top: positions[6]
                    }}>g</div>
                    <div style={{
                        position: 'relative',
                        top: positions[7]
                    }}>.</div>
                    <div style={{
                        position: 'relative',
                        top: positions[8]
                    }}>.</div>
                    <div style={{
                        position: 'relative',
                        top: positions[9]
                    }}>.</div>
                </h3>
            </div>
        </>
    )
}

export default LoadingScreen;