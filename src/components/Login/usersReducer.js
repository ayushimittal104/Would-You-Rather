export const users = (state ={},action) =>{
    switch(action.type) {
        case 'RECEIVE_USERS':
            return {
                ...state,...action.users  
            }
        default:
            return state
    }
}
export const AuthUser = (state ={},action) =>{
    switch(action.type) {
        case 'SET_AUTHUSER':
            return action.AuthUser
        default:
            return state
    }
}