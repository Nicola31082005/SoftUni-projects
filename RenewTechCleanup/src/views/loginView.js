import { html, renderMainFunction } from "../lib/lit-html.js"
import { login } from "../services/auth.js"
import page from '../../node_modules/page/page.mjs'

const template = (loginHandler) => html`
<section id="login">
   <div class="form">
     <img class="border" src="./images/border.png" alt="" />
     <h2>Login</h2>
     <form class="login-form" @submit = ${loginHandler}>
       <input type="text" name="email" id="email" placeholder="email" />
       <input
         type="password"
         name="password"
         id="password"
         placeholder="password"
       />
       <button type="submit">login</button>
       <p class="message">
         Not registered? <a href="/register">Create an account</a>
       </p>
     </form>
   </div>
</section>
`

export function loginPageView(ctx) {
    
    const homeTemplate = template(loginHandler.bind(ctx))
    renderMainFunction(homeTemplate)

}

async function loginHandler(e) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    window.alert('Please fill all the fields.')
    return
  }

  try {
    const response = await login({email, password})
    this.setAccessToken(response.accessToken)
    this.setUserId(response._id)
    page.redirect('/')
  
  } catch (err) {
    alert(err.message)
  }
  
} 