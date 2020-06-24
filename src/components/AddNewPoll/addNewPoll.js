import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import Login from '../Login/login'
import {saveQues} from '../Dashboard/questionsAction';
import './newPoll.css'

class AddNewPoll extends Component {
    constructor(props){
        super(props)
        this.state={optionOne:"",optionTwo:"",toHome:false}
        this.optionOne = this.optionOne.bind(this);
        this.optionTwo = this.optionTwo.bind(this);
        this.submitQues = this.submitQues.bind(this)
    }
    optionOne = (event) =>{
        this.setState({optionOne:event.target.value})
    }
    optionTwo = (event) =>{
        this.setState({optionTwo:event.target.value})
    }
    submitQues = () =>{
        let ques ={
            author:this.props.AuthUser.id,
            optionOneText:this.state.optionOne,
            optionTwoText:this.state.optionTwo,
        }
        this.props.dispatch(saveQues(ques))
        this.setState({toHome:true})
    }
    
    render(){
        if(this.state.toHome) return <Redirect to="/" />
        return(
            Object.keys(this.props.AuthUser).length === 0 ? <Login />
            :
            <div className="addPollContainer">
                <div className="newPollheadingContainer">
                    Create a New Question
                </div>
                <div className="newPollbodyContainer">
                <div style={{alignSelf:"flex-start"}}>Complete the question</div>
                <div style={{alignSelf:"flex-start",fontWeight:700}}>Would you Rather...</div>
                <input className="inputField" placeholder="Enter Option One Text Here" value={this.state.optionOne} onChange={this.optionOne}/>
                <div className="or">OR</div>
                <input className="inputField" placeholder="Enter Option Two Text Here" value={this.state.optionTwo} onChange={this.optionTwo}/>
                <input className="submitBtn" type= "button" value="Submit" onClick={this.submitQues} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({AuthUser}) =>{
    return{
        AuthUser:AuthUser
    }
}
export default connect(mapStateToProps)(AddNewPoll)