import React, { Component} from 'react'
import { NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import {setAuthUser} from '../Login/usersAction'
import './nav.css'
class Nav extends Component{
   signOut = () =>{
     this.props.dispatch(setAuthUser({}))
    }
    render(){
        return (
            <nav className='nav'>
              <ul>
                <li>
                  <NavLink to='/' exact activeClassName='active'>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/add' activeClassName='active'>
                    New Question
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/leaderboard' activeClassName='active'>
                    Leader Board
                  </NavLink>
                </li>
                {this.props.AuthUserName
                ? 
                <div className="rightDiv">
                <div>
                Hello! {this.props.AuthUserName}
                </div>
                <div style={{paddingLeft:"10px"}} onClick={this.signOut}>
                Sign Out
                </div>
                </div>
            : ""}
              </ul>
            </nav>
          )
    }
}

const mapStateToProps = ({AuthUser}) =>{
    return{
        AuthUserName: AuthUser.name
    }

}

export default connect(mapStateToProps)(Nav)