import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ques.css'
import { saveAns } from '../Dashboard/questionsAction';

class AddNewPoll extends Component {
    constructor(props){
        super(props)
        this.state={ans:""}
        this.optionOne = this.optionOne.bind(this);
        this.optionTwo = this.optionTwo.bind(this);
        this.submitAns = this.submitAns.bind(this)
    }
    optionOne = (event) =>{
        this.setState({ans:event.target.value})
    }
    optionTwo = (event) =>{
        this.setState({ans:event.target.value})
    }
    submitAns = () =>{
        let ans={
            authedUser:this.props.AuthUserID,qid:this.props.ques.id,answer:this.state.ans
        }
        this.props.dispatch(saveAns(ans))
    }
    
    render(){
        return(
            <div className="quesContainer">
                <div className="quesHeadingContainer">
                {this.props.users[this.props.ques.author].name} asks:
                </div>
                <div className="quesBodyContainer">
                <div style={{alignSelf:"flex-start",fontWeight:700}}>Would you Rather...</div>
                <div className="option">
                    <input type="radio" id="option1" value="optionOne" checked={this.state.ans === "optionOne"} onChange={this.optionOne}/>
                    <label htmlFor="option1">{this.props.ques.optionOne.text}</label>
                </div>
               <div className="option"> 
                    <input type="radio" id="option2"  value="optionTwo" checked={this.state.ans === "optionTwo"} onChange={this.optionTwo}/>
                    <label htmlFor="option2">{this.props.ques.optionTwo.text}</label>
               </div>
                <input className="submitBtn" type= "button" value="Submit" onClick={this.submitAns} />
                </div>
            </div>
        )
    }
}

export default connect()(AddNewPoll)