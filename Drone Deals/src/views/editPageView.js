import { html, renderMainFunction, displayErrorMessage } from "../lib/lit-html.js"
import { editItem, getOneItem } from "../services/serverServices.js"
import page from '../../node_modules/page/page.mjs'


const template = (item, editSubmitHandler) => html`
<section id="edit">
   <div class="form form-item">
     <h2>Edit Offer</h2>
     <form class="edit-form" @submit =${editSubmitHandler}>
       <input type="text" value = ${item.model} name="model" id="model" placeholder="Drone Model" />
       <input
         type="text"
         name="imageUrl"
         value = ${item.imageUrl}
         id="item-image"
         placeholder="Image URL"
       />
       <input
         type="number"
         name="price"
         id="price"
         value = ${item.price}
         placeholder="Price"
       />
       <input
         type="number"
         name="weight"
         id="weight"
         value = ${item.weight}
         placeholder="Weight"
       />
       <input
         type="number"
         name="phone"
         id="phone"
         value = ${item.phone}
         placeholder="Phone Number for Contact"
       />
       <input
         type="text"
         name="condition"
         id="condition"
         value = ${item.condition}
         placeholder="Condition"
       />
       <textarea
         name="description"
         id="description"
         placeholder="Description">${item.description}</textarea>
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


  const itemId = this.params.id

  const response = await editItem(itemId, {model, imageUrl, price, condition, weight, phone, description})
  page.redirect(`/dashboard/${itemId}`)
}
