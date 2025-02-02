import { html as htmlLit, render as renderLit } from '../../node_modules/lit-html/lit-html.js'

export const html = htmlLit
export const render = renderLit

const mainEl = document.querySelector('#wrapper > main')
const navEl = document.querySelector('#wrapper > header > nav')


export const renderMainFunction = (template) => {
    render(template, mainEl)
}

export const renderNavFunction = (template) => { 
    render(template, navEl)
}