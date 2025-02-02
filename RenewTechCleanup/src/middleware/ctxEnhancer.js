export function contextEnhancer(ctx, next) {
    
    ctx.setAccessToken = (accessToken) => localStorage.setItem('accessToken', accessToken) 
    ctx.getAccessToken = () => localStorage.getItem('accessToken')
    ctx.setUserId = (userId) => localStorage.setItem('userId', userId) 
    ctx.getId = () => localStorage.getItem('userId')
    ctx.clearStorage = () => localStorage.clear()
    ctx.isLogged = () => !!ctx.getAccessToken()
    

    next()
}