import page from '../../node_modules/page/page.mjs'
import {render, html, renderMainFunction, displayErrorMessage } from "../lib/lit-html.js"
import { createItem } from "../services/serverServices.js";

const template = (submitHandler) => html`
<section id="create">
 <div class="form form-item">
   <h2>Share Your item</h2>
   <form class="create-form" @submit=${submitHandler}>
     
   <input type="text" name="item" id="item" placeholder="Item" />

     <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" />

     <input type="text" name="price" id="price" placeholder="Price in Euro" />

     <input type="text" name="availability" id="availability" placeholder="Availability Information" />

     <input type="text" name="type" id="type" placeholder="Item Type" />

     <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50" ></textarea>

     <button type="submit">Add</button>
   </form>
 </div>
</section>
`

export function createPageView(ctx) {
  
  const createTemplate = template(submitHandler);

  
  renderMainFunction(createTemplate);

}


async function submitHandler(e) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget);

  const item = formData.get('item')
  const imageUrl = formData.get('imageUrl')
  const price = formData.get('price')
  const type = formData.get('type')
  const availability = formData.get('availability')
  const description = formData.get('description')

  if (!item || !imageUrl || !price || !type || !availability || !description) {
    displayErrorMessage('fill all the fields')
    return
  }

  const response = await createItem({item, imageUrl, price, type, availability, description})
  
  page.redirect('/dashboard')

}