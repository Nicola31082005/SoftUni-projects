import {render, html, renderMainFunction, displayErrorMessage } from "../lib/lit-html.js"
import page from '../../node_modules/page/page.mjs'
import { register } from "../services/userServices.js";

const template = (onSubmit) => html`
<section id="register">
   <div class="form" >
     <h2>Register</h2>
     <form class="register-form" @submit = ${onSubmit}>
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
  const registerTemplate = template(registerSubmitHandler.bind(ctx)) 
  renderMainFunction(registerTemplate);

}

async function registerSubmitHandler(e) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  
  const email = formData.get('email');
  const password = formData.get('password');
  const repassword = formData.get('re-password')
  

  if (!email || !password || !repassword ) {
    displayErrorMessage('please fill the fields')
    return
  }

  if ((password !== repassword)) {
    displayErrorMessage("Passwords don't match!")
    return
  }

  const response = await register({email, password})
 
  const userId = response._id;
  const accessToken = response.accessToken;

  this.setAccessToken(accessToken)
  this.setId(userId)
  
  page.redirect('/')

}
