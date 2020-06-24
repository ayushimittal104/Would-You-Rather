import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setAuthUser} from './usersAction'
import  * as img from '../../logo192.png'
import './loginCss.css'

class Login extends Component {
    constructor(props){
        super(props)
        this.state={users:this.props.users,showUsers:false,AuthUser:"",err:""};
        this.showUsers = this.showUsers.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    showUsers = () =>{
        this.state.showUsers ? this.setState({showUsers:false}) : this.setState({showUsers:true})
    }
    selectUser = (AuthUser) =>{
       this.setState({err:"",AuthUser:AuthUser})
    }
    signIn = () =>{
        if(this.state.AuthUser.id){
            this.props.dispatch(setAuthUser(this.state.AuthUser))
        }
        else{
            this.setState({err:"Select a user"})
        }
    }
    render(){
        return(
            <div className="loginContainer">
                <div className="headingContainer">
                    <p style={{fontWeight:"bold",fontSize:"15px"}}>Welcome to the Would You Rather App!</p>
                    <p>Please sign in to continue</p>
                </div>
                <div className="bodyContainer">
                    <p className="signin">SIGN IN</p>
                    <img className="img" src={img} alt="img" />
                    <div className="userInput" onClick={this.showUsers}>
                    <div style={{textAlign:"left",padding:"6px"}}>{this.state.AuthUser.name}</div>
                    <div className="drpdwnarrow"></div>
                    {this.state.showUsers ? 
                    <ul className="userList">
                        {Object.keys(this.state.users).map((user) =>{
                            return(
                            <li className="user" key={this.state.users[user].id} onClick={() =>this.selectUser(this.state.users[user])}>
                                <img className="userImg"  src={this.state.users[user].avatarURL} alt="" />
                                <span>{this.state.users[user].name}</span>
                            </li>
                            )
                        })}
                    </ul> : ""}
                    </div>
                    {this.state.err ? <div style={{color:"red"}}> {this.state.err} </div> :""} 
                    <input className="signInBtn" type= "button" value="Sign In" onClick={this.signIn} />
                </div>
            </div>
        )
    }
}
const mapStatetoProps = ({users}) =>{
   return{ users:users
   }
}
export default connect(mapStatetoProps)(Login)