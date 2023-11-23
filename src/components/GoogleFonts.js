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