import { html, renderMainFunction } from "../lib/lit-html.js"
import page from '../../node_modules/page/page.mjs'
import { deleteSolution, getOneSolutions } from "../services/serverServices.js"
import { getLikesForUserSolution, likeSolution, totalLikesForSolution } from "../services/likesServices.js"


const template = (likeHandler, deleteHandler, solution, isCreator, hasLiked, solutionLikes) => html`
  <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${solution.imageUrl} alt="example1"/>
          <div>
            <p id="details-type">${solution.type}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${solution.description}</p>
                <p id="more-info">${solution.learnMore}</p>
              </div>
            </div>
            
            <h3>Like Solution:<span id="like">${solutionLikes}</span></h3>
           
            <div id="action-buttons">
            ${isCreator ? html`
             <a href="/dashboard/${solution._id}/edit" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${deleteHandler}>Delete</a>
            ` :
            html`
            ${!hasLiked ? html`
              <a href="javascript:void(0)" id="like-btn" @click=${likeHandler}>Like</a>
            ` :
             ''}
            ` 
          }             
            </div>
          </div>
        </div>
  </section>
`

export async function detailsPageView(ctx) {
    
    const solution = await getOneSolutions(ctx.params.id)

    const isCreator = ctx.getId() === solution._ownerId

    const userId = ctx.getId()
    const userLikesForSolution = await getLikesForUserSolution(solution._id, userId) 
    const hasLiked = userLikesForSolution > 0 ? true : false 

    const solutionLikes = await totalLikesForSolution(solution._id)

    const detailsTemplate = template(likeHandler.bind(ctx), deleteHandler.bind(ctx), solution, isCreator, hasLiked, solutionLikes)
    renderMainFunction(detailsTemplate)

}

async function deleteHandler() {
  
  const choice = confirm('Do you want to delete this.')
  if (!choice) {
    return
  }
  
  const itemId = this.params.id
  const solution = await deleteSolution(itemId)
  page.redirect('/dashboard')

}

async function likeHandler() {
  
  const solutionId = this.params.id;
  const response = await likeSolution({solutionId})
  page.redirect(`/dashboard/${solutionId}`)

}

