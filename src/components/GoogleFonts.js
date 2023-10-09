import React, { useEffect } from "react";

// const GoogleFonts = ({family = 'Poppins'}) => {
//     useEffect(() => {
//         let el = document.createElement('style');
//         el.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=${family}&display=swap');
//         body {
//             font-family: ${family} !important;
//         }
//         `;
//         document.head.appendChild(el);
//     }, []);
// }
const GoogleFonts = (family = {family: 'Poppins'}) => {
    let el = document.createElement('style');
    let cssContent = `@import url('https://fonts.googleapis.com/css2?family=${family.family.replace(/ /g, '+')}&display=swap');
    body {
        font-family: '${family.family}' !important;
    }
    `;
    el.innerHTML = cssContent;
    document.head.appendChild(el);
}

export default GoogleFonts;