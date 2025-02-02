import page from '../node_modules/page/page.mjs'
import { contextEnhancer } from './middleware/ctxEnhancer.js'
import { navigationView } from './middleware/navigationView.js'
import { createPageView } from './views/createView.js'
import { dashboardPageView } from './views/dashboardPageView.js'
import { detailsPageView } from './views/detailsPageView.js'
import { editPageView } from './views/editPageView.js'
import { homePageView } from './views/homePageView.js'
import { loginPageView } from './views/loginView.js'
import { registerPageView } from './views/registerView.js'

page(contextEnhancer)
page(navigationView)
page('/', homePageView)
page('/login', loginPageView)
page('/register', registerPageView)
page('/dashboard', dashboardPageView)
page('/dashboard/:id', detailsPageView)
page('/create', createPageView)
page('/dashboard/:id/edit', editPageView)



//start
page.start()