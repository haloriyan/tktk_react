import React, { useEffect } from "react";
import Squarize from "../../../components/Squarize";

const NextMatch = () => {
    const fixtures = [
        ['Amera CF', 'Indonesia Muda'],
        ['Kangen Band', 'Bima Satria Garuda'],
        ['Arif Cepmek', 'Herman Batagor']
    ];
    useEffect(() => {
        Squarize();
    })
    return (
        <>
            <div className="flex row item-center mb-3">
                <div className="text bold size-20 flex grow-1">Next Match</div>
                <div className="text small primary">Lihat Semua</div>
            </div>
            <div>
                {
                    fixtures.map((fixture, f) => (
                        <div className={`flex row mt-2 pb-1 ${f !== fixtures.length - 1 ? 'border bottom' : ''}`} key={f}>
                            <div className="flex column w-35 item-center">
                                <div className="h-60 squarize use-height rounded-max bg-grey"></div>
                                <div className="mt-1 text small">{fixture[0]}</div>
                            </div>
                            <div className="flex column w-30 item-center justify-center">
                                <div>29 Februari 2024</div>
                                <div className="text small mt-05">20.00 WIB</div>
                            </div>
                            <div className="flex column w-35 item-center">
                                <div className="h-60 squarize use-height rounded-max bg-grey"></div>
                                <div className="mt-1 text small">{fixture[1]}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default NextMatch;