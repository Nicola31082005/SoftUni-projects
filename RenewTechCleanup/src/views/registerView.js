import { html, renderMainFunction } from "../lib/lit-html.js"
import page from '../../node_modules/page/page.mjs'
import { register } from "../services/auth.js"


const template = (registerHandler) => html`
<section id="register">
  <div class="form">
    <img class="border" src="./images/border.png" alt="" />
    <h2>Register</h2>
    <form class="register-form" @submit = ${registerHandler}>
      <input
        type="text"
        name="email"
        id="register-email"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
  </div>
</section>
`

export function registerPageView(ctx) {
    
    const homeTemplate = template(registerHandler.bind(ctx))
    renderMainFunction(homeTemplate)

}


async function registerHandler(e) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  const email = formData.get('email')
  const password = formData.get('password')
  const repassword = formData.get('re-password')

  if (!email || !password || !repassword ) {
    window.alert('Please fill all the fields.')
    return
  }

  if (password !== repassword) {
    window.alert("Passwords don't match!")
    return
  }

  const response = await register({email, password})
  
  this.setAccessToken(response.accessToken)
  this.setUserId(response._id)

  page.redirect('/')
} 
