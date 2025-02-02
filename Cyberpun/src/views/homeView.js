import {render, html, renderMainFunction } from "../lib/lit-html.js"

const template = () => html`
   <section id="hero">
       <img src="./images/home.png" alt="home" />
       <p>We know who you are, we will contact you</p>
   </section>
`

export function homePageView(ctx) {
   const homeTemplate = template()
   renderMainFunction(homeTemplate);

}

