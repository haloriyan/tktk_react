import React, { useEffect } from "react";
import Squarize from "../../../components/Squarize";

const MatchOccurring = () => {
    useEffect(() => {
        Squarize();
    })
    return (
        <div className="flex row gap-10 p-2 shadow mt-2 mb-2 rounded-more">
            <div className="flex row  grow-1 w-40">
                <div className="flex column item-center grow-1">
                    <div className="h-100 ratio-1-1 rounded-max bg-grey squarize use-height"></div>
                    <div className="text mt-15 small center">IR Surabaya</div>
                </div>
                <div className="text bold size-36 flex column justify-center ml-1">2</div>
            </div>
            <div className="flex row item-center justify-center grow-1 w-20">
                <div>53'</div>
            </div>
            <div className="flex row-reverse grow-1 w-40">
                <div className="flex column item-center grow-1">
                    <div className="h-100 ratio-1-1 rounded-max bg-grey squarize use-height"></div>
                    <div className="text mt-15 small center">IR Surabaya Raya Selatan yang panjang sekali</div>
                </div>
                <div className="text bold size-36 flex column justify-center mr-1">2</div>
            </div>
        </div>
    )
}

export default MatchOccurring;