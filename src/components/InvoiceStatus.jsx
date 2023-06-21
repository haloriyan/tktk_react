import React from "react";

const InvoiceStatus = ({status}) => {
    let bg = "bg-green";
    let displayText = "Paid";
    if (status === 0) {
        bg = "bg-red";
        displayText = "Unpaid";
    }

    return (
        <div className="flex row">
            <div className={`rounded p-05 mt-1 pl-2 pr-2 ${bg} transparent`}>
                {displayText}
            </div>
        </div>
    )
}

export default InvoiceStatus;