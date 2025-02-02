import page from '../../node_modules/page/page.mjs'
import { html, renderMainFunction, displayErrorMessage } from "../lib/lit-html.js"
import { login } from "../services/userServices.js";

const template = (onSubmit) => html`
<section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${onSubmit}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
</section>
`

export function loginPageView(ctx) {
  const loginTemplate = template(loginSubmitHandler.bind(ctx)) 
  renderMainFunction(loginTemplate);

}

async function loginSubmitHandler(e) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  
  const email = formData.get('email');
  const password = formData.get('password');
  

  if (!email || !password) {
    displayErrorMessage('please fill all the fields')
    return
  }

  const response = await login({email, password})
  
  const userId = response._id;
  const accessToken = response.accessToken;

  this.setAccessToken(accessToken)
  this.setId(userId)
  
  page.redirect('/')

}