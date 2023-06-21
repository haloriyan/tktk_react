import React from "react";
import { BiCameraMovie, BiGroup } from "react-icons/bi";

import config from "../config";
import styles from "./style/Navigation.module.css";

const StreamNavigation = ({viewing, setViewing}) => {
    // items : stage, exhibitor, sponsor
    return (
        <div className={`fixed rounded bg-white flex row item-center justify-center bordered ${styles.StreamNavigation}`}>
            <div className="flex column grow-1 item-center pointer" onClick={() => setViewing('stage')}>
                <BiCameraMovie size={22} color={viewing === 'stage' ? config.primaryColor : '#666'} />
                <div className={`text small mt-05 ${viewing === 'stage' ? 'primary' : 'muted'}`}>Main Stage</div>
            </div>
            <div className="flex column grow-1 item-center pointer" onClick={() => setViewing('exhibitor')}>
                <BiCameraMovie size={22} color={viewing === 'exhibitor' ? config.primaryColor : '#666'} />
                <div className={`text small mt-05 ${viewing === 'exhibitor' ? 'primary' : 'muted'}`}>Exhibitor</div>
            </div>
            <div className="flex column grow-1 item-center pointer" onClick={() => setViewing('sponsor')}>
                <BiCameraMovie size={22} color={viewing === 'sponsor' ? config.primaryColor : '#666'} />
                <div className={`text small mt-05 ${viewing === 'sponsor' ? 'primary' : 'muted'}`}>Sponsor</div>
            </div>
            <div className="flex column grow-1 item-center pointer" onClick={() => setViewing('lounge')}>
                <BiGroup size={22} color={viewing === 'lounge' ? config.primaryColor : '#666'} />
                <div className={`text small mt-05 ${viewing === 'lounge' ? 'primary' : 'muted'}`}>Lounge</div>
            </div>
        </div>
    )
}

export default StreamNavigation;