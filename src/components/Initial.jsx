import React, { useState, useEffect } from "react";

const Initial = ({name, size = 40, textSize = 14, style}) => {
    const [initial, setInitial] = useState(null);

    useEffect(() => {
        let names = name.split(" ");
        let init = names[0][0];
        if (names.length > 1) {
            init = `${init}${names[names.length - 1][0]}`;
        }
        setInitial(init);
    }, [initial]);

    return initial !== null && (
        <div className="ratio-1-1 rounded-max bg-primary centerize" style={{height: size, ...style}}>
            <div className="text white">{initial}</div>
        </div>
    )
}

export default Initial;