import React, { Component } from 'react'
import { connect } from 'react-redux'
import {hideLoading} from 'react-redux-loading';
import { Link } from 'react-router-dom';
import Login from '../Login/login'
import {handlefetchingQues} from './questionsAction'
import './dashboard.css'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={fetchQues:false,questionsFetched:false,showUnansQues:true}
        this.unansweredQues={};
        this.answeredQues={};
        this.getQuestions = this.getQuestions.bind(this)
        this.showWhichCol = this.showWhichCol.bind(this)
    }
    componentWillMount(){
        this.getQuestions()
    }
    componentDidUpdate(){
        this.getQuestions()
    }
    getQuestions = () =>{
        if(Object.keys(this.props.AuthUser).length > 0  && !this.state.fetchQues){
            this.props.dispatch(handlefetchingQues())
            this.setState({fetchQues:true})
        }
        if(Object.keys(this.props.questions).length > 0  && !this.state.questionsFetched && this.state.fetchQues){
            Object.keys(this.props.questions).forEach((ques) =>{
                this.props.AuthUser.answers.hasOwnProperty(ques) ? 
                this.answeredQues[ques] = this.props.questions[ques] :
                this.unansweredQues[ques] = this.props.questions[ques]
            })
            let answeredQues= Object.entries(this.answeredQues)
            .sort((a,b) =>{
                return  b[1].timestamp - a[1].timestamp
            })
            .reduce((obj, [k,v]) => ({
                ...obj, 
                [k]: v
              }), {})

            let unansweredQues= Object.entries(this.unansweredQues)
            .sort((a,b) =>{
                return b[1].timestamp - a[1].timestamp
            })
            .reduce((obj, [k,v]) => ({
                ...obj, 
                [k]: v
            }), {})
            this.answeredQues = answeredQues;
            this.unansweredQues = unansweredQues;
            this.setState({questionsFetched:true})
            this.props.dispatch(hideLoading())
        }
    }
    showWhichCol = (col) =>{
        (col === "Unanswered") ? this.setState({showUnansQues:true}) : this.setState({showUnansQues:false})
    }
    render(){
        return(
            Object.keys(this.props.AuthUser).length === 0 ? <Login/> 
                : 
                <div className="dashboardContainer">
                    <div className="dashboardHeading">
                       <div className= {this.state.showUnansQues ?"typeSelected type" : "type"}  onClick={() =>this.showWhichCol("Unanswered")}>
                           Unanswered Questions
                       </div>
                       <div className= {!this.state.showUnansQues ?"typeSelected type" : "type"} onClick={() =>this.showWhichCol("Answered")}>
                           Answered Questions
                       </div>
                    </div>
                    <div className="dashboardBody">
                    {this.state.questionsFetched ? 
                    this.state.showUnansQues ?
                    <div>
                        {Object.keys(this.unansweredQues).map((ques)=>{
                            return(
                                <div key={ques} className="singleQues">
                                    <div className="nameDiv">
                                        {this.props.users[this.unansweredQues[ques].author].name } asks:
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <img className="LargeImg" src={this.props.users[this.unansweredQues[ques].author].avatarURL} alt="" />
                                        <div className="contentDiv">
                                        <div style={{fontWeight:"bold"}}>Would you Rather</div>
                                        <div>...{this.unansweredQues[ques].optionOne.text}...</div>
                                        <Link style={{width:"100%"}} to={`/question/${ques}`} > <input className="pollBtn" type="button" value="View Poll"/></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                     :
                    <div>
                        {Object.keys(this.answeredQues).map((ques)=>{
                            return(
                                <div key={ques} className="singleQues">
                                <div className="nameDiv">
                                    {this.props.users[this.answeredQues[ques].author].name } asks:
                                </div>
                                <div style={{display:"flex"}}>
                                    <img className="LargeImg" src={this.props.users[this.answeredQues[ques].author].avatarURL} alt="" />
                                    <div className="contentDiv">
                                    <div style={{fontWeight:"bold"}}>Would you Rather</div>
                                    <div>...{this.answeredQues[ques].optionOne.text}...</div>
                                    <Link style={{width:"100%"}} to={`/question/${ques}`} > <input className="pollBtn" type="button" value="View Poll"/></Link>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    : ""
                    }
                    </div>
                </div>
        )

    }
}
const mapStatetoProps = ({users,questions,AuthUser}) =>{
    return{
        users:users,
        questions:questions,
        AuthUser:AuthUser
    }
}
export default connect(mapStatetoProps)(Dashboard)