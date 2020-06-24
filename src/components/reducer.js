import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading';
import {users} from './Login/usersReducer'
import {AuthUser} from './Login/usersReducer'
import {questions} from './Dashboard/questionsReducer'
export default combineReducers({
    users,
    AuthUser,
    questions,
    loadingBar:loadingBarReducer
})