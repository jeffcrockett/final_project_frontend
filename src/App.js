import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserProfile from './UserProfile'
import CommentsContainer from './CommentsContainer'
import Header from './Header'
import Comment from './Comment'
import { withRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
class App extends Component {
  state = {
    currentUser: null
  }

  updateUserInfo = currentUser => this.setState({ currentUser });

  logout = () => {
    console.log('logging out...')
    localStorage.clear();
    this.setState({ currentUser: null });
    this.props.history.push('/')
  };

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}
        logout={this.logout}/>
        <Switch>
          <Route exact path="/login" 
          render={() => <LoginForm updateUserInfo={this.updateUserInfo}/> }
          />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/comments" component={CommentsContainer}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
