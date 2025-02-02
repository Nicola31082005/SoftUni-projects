import { render as litRender, html as litHtml } from "../../node_modules/lit-html/lit-html.js";

const mainEl = document.getElementById('main-element');
const navEl = document.querySelector('#wrapper > header > nav')
const errorSpanEl = document.querySelector('body > #notifications > div > span')
const errorDivEl = document.getElementById('errorBox')



export const html = litHtml;
export const render = litRender;

export const renderMainFunction = (template) => {
    render(template, mainEl)
}

export const renderNavFunction = (template) => { 
    render(template, navEl)
}

export const displayErrorMessage = (errMessage) => { 
    errorSpanEl.textContent = errMessage
    errorDivEl.style.display = 'block'
}
