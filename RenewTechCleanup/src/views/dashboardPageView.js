import { html, renderMainFunction } from "../lib/lit-html.js"
import page from '../../node_modules/page/page.mjs'
import { getAllSolutions } from "../services/serverServices.js"


const template = (solutions) => html`
  <h2>Solutions</h2>
  <section id="solutions">

  ${solutions.length > 0 ? 
    html `
     ${solutions.map(solution => 
      html`
      <div class="solution">
      <img src=${solution.imageUrl} alt="example3" />
      <div class="solution-info">
        <h3 class="type">${solution.type}</h3>
        <p class="description">
          ${solution.description}
        </p>
        <a class="details-btn" href="/dashboard/${solution._id}">Learn More</a>
      </div>
    </div>
    `
    )}
    `
    :
    html`
    <h2 id="no-solution">No Solutions Added.</h2>
    `
   }
 
  </section>
  <!-- Display an h2 if there are no posts -->
`

export async function dashboardPageView(ctx) {
    
    const solutions = await getAllSolutions()

    const dashboardTemplate = template(solutions)
    renderMainFunction(dashboardTemplate)

}
