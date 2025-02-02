import {render, html, renderMainFunction, displayErrorMessage } from "../lib/lit-html.js"
import { editItem, getOneItem } from "../services/serverServices.js"
import page from '../../node_modules/page/page.mjs'


const template = (item, editSubmitHandler) => html`
<section id="edit">
   <div class="form form-item">
     <h2>Edit Your Item</h2>
     <form class="edit-form" @submit =${editSubmitHandler}>
       <input type="text" value = ${item.item} name="item" id="item" placeholder="Item" />
       <input
         type="text"
         name="imageUrl"
         value = ${item.imageUrl}
         id="item-image"
         placeholder="Your item Image URL"
       />
       <input
         type="text"
         name="price"
         id="price"
         value = ${item.price}
         placeholder="Price in Euro"
       />
       <input
         type="text"
         name="availability"
         id="availability"
         value = ${item.availability}
         placeholder="Availability Information"
       />
       <input
         type="text"
         name="type"
         id="type"
         value = ${item.type}
         placeholder="Item Type"
       />
       <textarea
         id="description"
         name="description"
         placeholder="More About The Item"
         rows="10"
         cols="50">${item.description}</textarea>
       <button type="submit">Edit</button>
     </form>
   </div>
</section>
`

export async function editPageView(ctx) {
  
  const item = await getOneItem(ctx.params.id)

  const editTemplate = template(item, editSubmitHandler.bind(ctx))

  renderMainFunction(editTemplate);

}

async function editSubmitHandler(e) {
  e.preventDefault();
  
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

  const itemId = this.params.id

  const response = await editItem(itemId, {item, imageUrl, price, type, availability, description})
  page.redirect(`/dashboard/${itemId}`)
}
