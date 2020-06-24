import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from './components/action'
import Dashboard from './components/Dashboard/dashboard'
import AddNewPoll from './components/AddNewPoll/addNewPoll'
import LeaderBoard from './components/LeaderBoard/leaderBoard'
import QuesPollDetails from './components/QuesPollDetails/quesPollDetails'
import Nav from './components/Nav/Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Nav />
          <div className='container'>
            {this.props.loading === true
              ? null
              : 
              <Fragment>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/add' exact component={AddNewPoll} />
                  <Route path='/leaderboard' exact component={LeaderBoard} />
                  <Route path='/question/:id' exact component={QuesPollDetails} />
              </Fragment>
                }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    loading: Object.keys(users).length === 0,
  }
}

export default connect(mapStateToProps)(App)