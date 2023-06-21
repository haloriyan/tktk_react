import React, { useEffect, useRef, useState } from "react";
import { BiCalendar, BiMap, BiMoney } from "react-icons/bi";

const CardLoader = ({count = 5}) => {
    const [cards, setCards] = useState(null);
    const [opacity, setOpacity] = useState(100);
    const intervalAction = useRef('decrease');

    useEffect(() => {
        let tes = setInterval(() => {
            if (intervalAction.current === "decrease") {
                setOpacity(opacity - 10);
            } else {
                setOpacity(opacity + 10);
            }
            if (opacity === 90) {
                intervalAction.current = "decrease";
            }  
            if (opacity === 10) {
                intervalAction.current = "increase";
            }
        }, 100)
        return () => clearInterval(tes);
    })

    useEffect(() => {
        if (cards === null) {
            let crds = [];
            for (let i = 0; i < count; i++) {
                crds.push('card');
            }
            setCards(crds);
        }
    }, [cards, count]);

    return (
        <div className="flex row w-100 gap-10">
            {
                cards !== null &&
                cards.map((card, c) => (
                    <div key={c} className="flex column grow-1 bg-white bordered rounded basis-5" style={{opacity: opacity / 100}}>
                        <div 
                            className="w-100 bg-grey cover rounded-top-left rounded-top-right"
                            style={{aspectRatio: 5/2}} 
                        ></div>
                        <div className="p-2">
                            <div className="text bold bg-grey w-100 h-20"></div>
                            <div className="text bold bg-grey w-30 mt-1 h-20"></div>
                            <div className="mt-2 flex row item-center">
                                <BiCalendar color="#888" />
                                <div className="ml-1 text muted small bg-grey w-40 h-10"></div>
                            </div>
                            <div className="mt-1 flex row item-center">
                                <BiMoney color="#888" />
                                <div className="ml-1 text muted small bg-grey w-40 h-10"></div>
                            </div>
                            <div className="mt-1 flex row item-center">
                                <BiMap color="#888" />
                                <div className="ml-1 text muted small bg-grey w-40 h-10"></div>
                            </div>

                            <div className="mt-3 pt-2 border-top flex row item-center">
                                <div className="bg-grey rounded-max h-40 squarize use-height"></div>
                                <div className="ml-2 text muted small bg-grey w-60 h-10"></div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CardLoader;