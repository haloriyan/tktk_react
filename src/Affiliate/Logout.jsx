import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AffiliateLogout = () => {
    const [positions, setPositions] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [procceed, setProcceed] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (procceed) {
            setProcceed(false);
            window.localStorage.removeItem('affiliator_data');
            navigate('/affiliate/login')
        }
    })

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
    }, [positions])
    
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex column item-center justify-center">
            <h3 className="m-0 flex row item-center gap-10">
                <div style={{position: 'relative',top: positions[0]}}>L</div>
                <div style={{position: 'relative',top: positions[1]}}>o</div>
                <div style={{position: 'relative',top: positions[2]}}>g</div>
                <div style={{position: 'relative',top: positions[3]}}>g</div>
                <div style={{position: 'relative',top: positions[4]}}>i</div>
                <div style={{position: 'relative',top: positions[5]}}>n</div>
                <div style={{position: 'relative',top: positions[6]}}>g</div>
                <div style={{position: 'relative',top: positions[7]}}> </div>
                <div style={{position: 'relative',top: positions[8]}}>O</div>
                <div style={{position: 'relative',top: positions[9]}}>u</div>
                <div style={{position: 'relative',top: positions[10]}}>t</div>
                <div style={{position: 'relative',top: positions[11]}}>.</div>
                <div style={{position: 'relative',top: positions[12]}}>.</div>
                <div style={{position: 'relative',top: positions[13]}}>.</div>
            </h3>
        </div>
    )
}

export default AffiliateLogout;