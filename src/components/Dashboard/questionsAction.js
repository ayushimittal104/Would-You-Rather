import {showLoading, hideLoading} from 'react-redux-loading';
import {_getQuestions, _saveQuestionAnswer, _saveQuestion} from '../../_DATA'
import { authUser } from '../Login/usersAction';
import { handleInitialData } from '../action';
const receiveQues = (questions) =>{
    return {
        type: 'RECEIVE_QUESTIONS',
        questions
    }
}
export const handlefetchingQues = () =>{
    return (dispatch) =>{
        dispatch(showLoading());
        return _getQuestions().then((questions) => {
            dispatch(receiveQues(questions))
        })
    }
}

export const saveAns = (ans) =>{
    return (dispatch,getState) => {
        let {AuthUser} = getState()
         AuthUser.answers[ans.qid] =ans.answer
        return _saveQuestionAnswer(ans)
        .then(() =>{
            dispatch(handlefetchingQues())
            dispatch(hideLoading())
            dispatch(handleInitialData())
            dispatch(authUser(AuthUser))
        })
    }
}

export const saveQues = (ques) =>{
    return (dispatch,getState) => {
        let {AuthUser} = getState()
        return _saveQuestion(ques)
        .then((formattedQuestion) =>{
            AuthUser.questions.push(formattedQuestion.id)
            dispatch(handlefetchingQues())
            dispatch(hideLoading())
            dispatch(handleInitialData())
            dispatch(authUser(AuthUser))
        })
    }
}
