import {showLoading,hideLoading} from 'react-redux-loading';
import {_getUsers} from '../_DATA';
import {receiveUsers} from './Login/usersAction'
export const handleInitialData = () =>{
    return (dispatch) =>{
    dispatch(showLoading());
    return _getUsers().then((users) => {
        dispatch(receiveUsers(users))
        dispatch(hideLoading())
    })
}
}