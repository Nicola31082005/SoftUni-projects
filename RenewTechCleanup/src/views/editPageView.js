import { html, renderMainFunction } from "../lib/lit-html.js"
import page from '../../node_modules/page/page.mjs'
import { editSolution, getOneSolutions } from "../services/serverServices.js"



const template = (solution, editSubmitHandler) => html`
<section id="edit">
  <div class="form">
    <img class="border" src=${solution.imageUrl} alt="" />
    <h2>Edit Solution</h2>
    <form class="edit-form" @submit = ${editSubmitHandler}>
      <input
        type="text"
        name="type"
        value=${solution.type}
        id="type"
        placeholder="Solution Type"
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        value=${solution.imageUrl}
        placeholder="Image URL"
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="10"
      >${solution.description}</textarea>
      <textarea
        id="more-info"
        name="more-info"
        placeholder="more Info"
        rows="2"
        cols="10"
      >${solution.learnMore}</textarea>
      <button type="submit">Edit</button>
    </form>
  </div>
</section>
`

export async function editPageView(ctx) {
    
    const solution = await getOneSolutions(ctx.params.id)

    const editTemplate = template(solution, editSubmitHandler.bind(ctx))
    
    renderMainFunction(editTemplate)

}


export async function editSubmitHandler(e) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget);

  const imageUrl = formData.get('image-url')
  const type = formData.get('type')
  const learnMore = formData.get('more-info')
  const description = formData.get('description')

  if (!learnMore || !imageUrl || !type || !description) {
    window.alert('fill all the fields')
    return
  }

  const solutionId = this.params.id

  const response = await editSolution(solutionId, {type, imageUrl, description, learnMore})
  page.redirect(`/dashboard/${solutionId}`)

}