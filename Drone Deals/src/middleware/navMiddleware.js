import page from '../../node_modules/page/page.mjs'
import { html, renderNavFunction } from "../lib/lit-html.js"
import { logout } from '../services/userServices.js'



const navigationTemplate = (isLogged, logoutHandler) => html`
    <div>
        <a href="/dashboard">Marketplace</a>
    </div>
    ${isLogged
        ?
     html`
     <div class="user">
          <a href="/create">Sell</a>
          <a href="javascript:void(0)" @click=${logoutHandler}>Logout</a>
        </div>
     `
    : html`
    <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
    `
    }
`



export const navigationView = (ctx, next) => {

    const navTemplate = navigationTemplate(ctx.isLogged(), logoutHandler.bind(ctx))
    renderNavFunction(navTemplate)

    next()
}

async function logoutHandler() {

    try {    
        const response = await logout()

        this.clearLocalStorage()
        page.redirect('/')

    } catch (err){
        window.alert(err.message)
    }

}