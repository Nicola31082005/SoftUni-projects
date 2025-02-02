import page from '../node_modules/page/page.mjs'
import { contextEnhancer } from './middleware/ctxEnhancer.js'
import { navigationView } from './middleware/navMiddleware.js'
import { createPageView } from './views/createView.js'
import { dashboardPageView } from './views/dashboardView.js'
import { detailsPageView } from './views/detailsPageView.js'
import { editPageView } from './views/editPageView.js'
import { homePageView } from './views/homeView.js'
import { loginPageView } from './views/loginView.js'
import { registerPageView } from './views/registerView.js'

page(contextEnhancer)
page(navigationView)

page('/', homePageView)
page('/login', loginPageView)
page('/register', registerPageView)
page('/dashboard', dashboardPageView)
page('/create', createPageView)
page('/dashboard/:id', detailsPageView)
page('/dashboard/:id/edit', editPageView)

// start page
page.start()

