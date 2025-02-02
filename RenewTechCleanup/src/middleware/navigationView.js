import { html, renderNavFunction } from "../lib/lit-html.js";
import { logout } from "../services/auth.js";
import page from '../../node_modules/page/page.mjs'


const template = (logoutHandler, isLogged) => html`
          <div>
            <a href="/dashboard">Solutions</a>
          </div>

          ${isLogged ? 
            html`
          <div class="user">
            <a href="/create">Add Solution</a>
            <a href="javascript:void(0)" @click=${logoutHandler}>Logout</a>
          </div>
            `:
            html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
            `
          }
          
     
`

export async function navigationView(ctx, next) {
    
    const isLogged = ctx.isLogged()
    const navTemplate = template(logoutHandler.bind(ctx), isLogged)
    renderNavFunction(navTemplate)


    next()
}

async function logoutHandler() {
    const accessToken = this.getAccessToken()
    
    const response = await logout(accessToken)
    this.clearStorage()
    page.redirect('/')

}