export const receiveUsers = (users) =>{
    return {
        type: 'RECEIVE_USERS',
        users
    }
}

export const authUser = (AuthUser) =>{
    return{
        type:'SET_AUTHUSER',
        AuthUser
    }
}
export const setAuthUser = (AuthUser) =>{
    return(dispatch) =>{
     return dispatch(authUser(AuthUser))
}
}