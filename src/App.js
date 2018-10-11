import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserProfile from './UserProfile'
import CommentsContainer from './CommentsContainer'
import Header from './Header'
import Comment from './Comment'
import { Route, Switch } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
class App extends Component {
  state = {
    currentUser: null
  }
  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/comments" component={CommentsContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
