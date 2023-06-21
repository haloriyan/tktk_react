import React from "react";
import config from "../config";

const FAB = ({page, color = config.primaryColor, size = 50, icon, onClick = null}) => {
    return (
        <>
            <div 
                style={{
                    ...styles.fab,
                    width: size,
                    height: size,
                    backgroundColor: color,
                }}
                onClick={() => onClick()}
            >
                {icon}
            </div>
        </>
    )
}

const styles = {
    fab: {
        position: 'fixed',
        bottom: 40,right: 40,
        borderRadius: 999,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    }
}

export default FAB;