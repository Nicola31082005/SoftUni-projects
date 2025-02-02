import page from '../../node_modules/page/page.mjs'
import { html, renderMainFunction, displayErrorMessage } from "../lib/lit-html.js"
import { createItem } from "../services/serverServices.js";

const template = (submitHandler) => html`
<section id="create">
  <div class="form form-item">
    <h2>Add Drone Offer</h2>
    <form class="create-form" @submit=${submitHandler}>
      <input type="text" name="model" id="model" placeholder="Drone Model" />
      <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
      <input type="number" name="price" id="price" placeholder="Price" />
      <input type="number" name="weight" id="weight" placeholder="Weight" />
      <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
      <input type="text" name="condition" id="condition" placeholder="Condition" />
      <textarea name="description" id="description" placeholder="Description"></textarea>
      <button type="submit">Add</button>
    </form>
  </div>
</section>
`

export function createPageView() {
  
  const createTemplate = template(submitHandler);

  renderMainFunction(createTemplate);

}


async function submitHandler(e) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget);

  const model = formData.get('model')
  const imageUrl = formData.get('imageUrl')
  const price = formData.get('price')
  const weight = formData.get('weight')
  const phone = formData.get('phone')
  const condition = formData.get('condition')
  const description = formData.get('description')

  if (!model || !imageUrl || !price || !weight || !phone || !condition || !description) {
    displayErrorMessage('fill all the fields')
    return
  }

  const response = await createItem({model, imageUrl, price, condition, weight, phone, description})
  
  page.redirect('/dashboard')

}