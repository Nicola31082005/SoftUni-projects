import { html, renderMainFunction } from "../lib/lit-html.js";
import { getAllItems } from "../services/serverServices.js";

const template = (items) => html`
  <h3 class="heading">Marketplace</h3>
  <section id="dashboard">
    ${items.length > 0
      ? items.map(
          (item) => html`
            <div class="drone">
              <img src=${item.imageUrl} alt=${item.model} />
              <h3 class="model">${item.model}</h3>
              <div class="drone-info">
                <p class="price">Price: €${item.price}</p>
                <p class="condition">Condition: ${item.condition}</p>
                <p class="weight">Weight: ${item.weight}g</p>
              </div>
              <a class="details-btn" href="/dashboard/${item._id}">Details</a>
            </div>
          `
        )
      : html`<h3 class="no-drones">No Drones Available</h3>`
      }
  </section>
`;

export async function dashboardPageView(ctx) {
  
  const items = await getAllItems()  
  const dashboardTemplate = template(items);

  renderMainFunction(dashboardTemplate);
}
