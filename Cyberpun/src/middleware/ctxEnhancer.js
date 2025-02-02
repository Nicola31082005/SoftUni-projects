export function contextEnhancer(ctx, next) {
    
    ctx.setAccessToken = (accessToken) => localStorage.setItem('accessToken', accessToken)
    ctx.getAccessToken = () => localStorage.getItem('accessToken')
    ctx.isLogged = () => !!ctx.getAccessToken()
    ctx.setId = (id) => localStorage.setItem('id', id)
    ctx.getId = () => localStorage.getItem('id')
    ctx.clearLocalStorage = () => localStorage.clear()
     
    next()

}