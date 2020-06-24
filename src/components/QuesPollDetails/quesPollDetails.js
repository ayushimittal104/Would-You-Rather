import React,{Component } from "react";
import { connect } from "react-redux";
import {hideLoading} from 'react-redux-loading';
import {handlefetchingQues} from '../Dashboard/questionsAction'
import Login from '../Login/login'
import './quesPollDetails.css'
import Ques from "./Ques";

class QuesPollDetails extends Component{
    constructor(props){
        super(props)
        this.state={fetchQues:false}
        this.getQuestions = this.getQuestions.bind(this)
    }
    componentWillMount(){
        this.getQuestions()
    }
    componentDidUpdate(){
        this.getQuestions()
    }
    getQuestions = () =>{
        if(Object.keys(this.props.AuthUser).length > 0  && Object.keys(this.props.questions).length === 0  ){
            this.props.dispatch(handlefetchingQues())
            this.props.dispatch(hideLoading())
        }
    }

   render(){
    return (Object.keys(this.props.AuthUser).length === 0 ?
       <Login />
       : Object.keys(this.props.questions).length > 0 ?
        !this.props.questions.hasOwnProperty(this.props.id) ?
       <div className="error404">
           <div>Error 404</div>
           <div>OOPS....This page doesn't exists</div>
       </div>
       :!this.props.AuthUser.answers.hasOwnProperty(this.props.id) ?
       <Ques users={this.props.users} ques={this.props.questions[this.props.id]} qid={this.props.id} AuthUserID={this.props.AuthUser.id}/>
       :<div className="quesContainer">
            <div className="quesHeadingContainer">
            Asked by {this.props.users[this.props.questions[this.props.id].author].name}:
            </div>
            <div className="quesBodyContainer" style={{height:"250px"}}>
                <div style={{alignSelf:"flex-start",fontWeight:700}}>RESULTS:</div>
                <div className={this.props.AuthUser.answers[this.props.id] === "optionOne" ? "Polloption selected" :"Polloption"}>
                    <div>Would you Rather {this.props.questions[this.props.id].optionOne.text}</div>
                    <div className="progressbar">
                        <div style={{width:`${this.props.questions[this.props.id].optionOne.votes.length / (this.props.questions[this.props.id].optionOne.votes.length + this.props.questions[this.props.id].optionTwo.votes.length)*100}%`}}>{this.props.questions[this.props.id].optionOne.votes.length / (this.props.questions[this.props.id].optionOne.votes.length + this.props.questions[this.props.id].optionTwo.votes.length)*100}%</div>
                    </div>
                    <div>{this.props.questions[this.props.id].optionOne.votes.length} out of {this.props.questions[this.props.id].optionOne.votes.length + this.props.questions[this.props.id].optionTwo.votes.length}</div>
                    {this.props.AuthUser.answers[this.props.id] === "optionOne" ? <div className="choice">Your Choice</div> : ""}
                </div>
                <div className={this.props.AuthUser.answers[this.props.id] === "optionTwo" ? "Polloption selected" :"Polloption"}> 
                    <div>Would you Rather {this.props.questions[this.props.id].optionTwo.text}</div>
                    <div className="progressbar">
                    <div style={{width:`${this.props.questions[this.props.id].optionTwo.votes.length / (this.props.questions[this.props.id].optionOne.votes.length + this.props.questions[this.props.id].optionTwo.votes.length)*100}%`}}>{this.props.questions[this.props.id].optionTwo.votes.length / (this.props.questions[this.props.id].optionOne.votes.length + this.props.questions[this.props.id].optionTwo.votes.length)*100}%</div>
                    </div>
                    <div>{this.props.questions[this.props.id].optionTwo.votes.length} out of {this.props.questions[this.props.id].optionOne.votes.length + this.props.questions[this.props.id].optionTwo.votes.length}</div>
                    {this.props.AuthUser.answers[this.props.id] === "optionTwo" ? <div className="choice">Your Choice</div> : ""}
                </div>
            </div>
       </div>
       :""
    )
   }
}
const mapStatetoProps = ({AuthUser,users,questions},props) =>{
    const { id } = props.match.params
    return{
        id,
        AuthUser:AuthUser,
        users:users,
        questions: questions
    }
}
export default connect(mapStatetoProps)(QuesPollDetails)