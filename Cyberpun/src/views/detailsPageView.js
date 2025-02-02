import {render, html, renderMainFunction } from "../lib/lit-html.js"
import { deleteItem, getOneItem } from "../services/serverServices.js";
import page from '../../node_modules/page/page.mjs'


const template = (deleteHandler, isCreator, item) => html`
<section id="details">
 <div id="details-wrapper">
   <div>
     <img id="details-img" src=${item.imageUrl} alt="example1" />
     <p id="details-title">${item.item}</p>
   </div>
   <div id="info-wrapper">
     <div id="details-description">
       <p class="details-price">Price: €${item.price}</p>
       <p class="details-availability">
        ${item.availability}
       </p>
       <p class="type">Type: ${item.type}</p>
       <p id="item-description">
         ${item.description}
       </p>
     </div>
     ${isCreator ? 
      html`
     <div id="action-buttons">
       <a href="/dashboard/${item._id}/edit" id="edit-btn">Edit</a>
       <a href="javascript:void(0)" @click=${deleteHandler} id="delete-btn">Delete</a>
     </div>
     `
    : '' 
    }
     
   </div>
 </div>
</section>
`

export async function detailsPageView(ctx) {
  
  const item = await getOneItem(ctx.params.id)
  const isCreator = ctx.getId() === item._ownerId;

  const detailsTemplate = template(deleteHandler.bind(ctx), isCreator, item) 



  renderMainFunction(detailsTemplate);

}

async function deleteHandler() {
  
  const choice = confirm('Do you want to delete this.')

  if (!choice) {
    return
  }

  const itemId = this.params.id;
  const response = await deleteItem(itemId)

  page.redirect('/dashboard')
}
