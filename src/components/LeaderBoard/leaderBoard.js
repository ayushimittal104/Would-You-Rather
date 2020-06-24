import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../Login/login'
import './leaderBoard.css'

class LeaderBoard extends Component {
    constructor(props){
        super(props)
        this.state={users :"",arraySorted:false}
        this.sortUsers = this.sortUsers.bind(this)
        this.showUsers = this.showUsers.bind(this)
    }
    componentDidMount(){
        this.sortUsers()
    }
    componentDidUpdate(){
        this.sortUsers()
    }
    sortUsers = () =>{
        if(this.props.AuthUser && !this.state.arraySorted){
            let users= Object.entries(this.props.users)
            .sort((a,b) =>{
                return  (Object.keys(b[1].answers).length+Object.keys(b[1].questions).length) -
                (Object.keys(a[1].answers).length+ Object.keys(a[1].questions).length)
            })
            .reduce((obj, [k,v]) => ({
                ...obj, 
                [k]: v
              }), {})
        this.setState({users:users,arraySorted:true})
    }
    }
    showUsers = () =>{
        let users =""
        if(this.state.users){
            users= Object.keys(this.state.users).map((user,index) =>{
                return(
                    <div key={index+1} className="singleUser">
                        <img className="userLargeImg"  src={this.state.users[user].avatarURL} alt="" /> 
                       <div className="middleDiv">   
                            <div style={{fontWeight:700,fontSize:"16px"}}>{this.state.users[user].name}</div>
                            <div>Answered Questions   {Object.keys(this.state.users[user].answers).length}</div>
                            <div>Created Questions    {this.state.users[user].questions.length}</div>
                        </div>
                     
                        <div className="scoreBoard">
                            <div style={{borderBottom:"1px solid lightgrey",backgroundColor:"lightgrey",padding:"5px"}}>Score</div>
                            <div style={{padding:"10px"}}> {Object.keys(this.state.users[user].answers).length+this.state.users[user].questions.length}</div>
                        </div>
                    </div>
                )
            })
        }
        return users
    }
    render(){
        return(
                !this.props.AuthUser ? <Login/> 
                : 
                <div className="leaderboardContainer">
                {this.showUsers()}
                </div>
        )

    }
}
const mapStatetoProps = ({users,AuthUser}) =>{
    return{
        users:users,
        AuthUser:Object.keys(AuthUser).length > 0
    }
}
export default connect(mapStatetoProps)(LeaderBoard)