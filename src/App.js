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
import Subforum from './Subforum'
import Post from './Post'
import CreatePost from './CreatePost'

class App extends Component {
  // constructor() {
    
  // }
  state = {
    currentUser: null,
    subforums: [],
    selectedSubforum: 'asdf'
  }

  updateUserInfo = currentUser => {
    this.setState({ currentUser })
  };

  fetchSubforums = () => {    
    fetch('http://localhost:3000/api/v1/subforums')
    .then(res => res.json())
    .then(subforums => {
 
      this.setState({
      subforums: subforums,
      selectedSubforum: subforums[0]
    })
  })
  }

  fetchUser = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`)
    .then(res => res.json())
    .then(user => {
      this.updateUserInfo(user)
    })
  }

  postComment = (content, postId) => {
    
    console.log(this.state)
    const token = localStorage.getItem('token')
    const params = {
      content: content,
      post_id: postId,
      user_id: this.state.currentUser.id
    } 
    fetch(`http://localhost:3000/api/v1/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }, 
      body: JSON.stringify(params)
    }).then(res => res.json())
      .then(json => {
        this.fetchUser();
        this.fetchPost(postId);
      })
  }

  componentDidMount = () => {
    const url = "http://localhost:3000/api/v1/profile";
    const token = localStorage.getItem("token");
    if (token) {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(response => {
          this.updateUserInfo(response.user);
          this.props.history.push("/profile");
        });
    }
    this.fetchSubforums()
  }

  createPost = (formData) => {
    const token = localStorage.getItem('token')
    const params = {
      title: formData.title,
      content: formData.content,
      subforum_id: this.state.selectedSubforum.id,
      user_id: this.state.currentUser.id
    }
    fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
      .then(post => {
        this.setState({
          selectedPost: post 
        })
        console.log(post)
        this.props.history.push(`/f/${this.state.selectedSubforum.name}/p/${post.id}`)
      })
  }

  deletePostComment = (comment) => {
    const token = localStorage.getItem('token');
    const postId = comment.post_id
    fetch(`http://localhost:3000/api/v1/comments/${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id: comment.id})
    }).then(res => res.json()).then(json => {
      this.fetchUser()
      this.fetchPost(postId)
    })
  }
  
  setSubforum = (subforum) => {
    this.setState({
      selectedSubforum: subforum
    })   
  }

  setPost = (post) => {
    this.setState({
      selectedPost: post
    })
  }
  
  logout = () => {
    console.log('logging out...')
    localStorage.clear();
    this.setState({ currentUser: null });
    this.props.history.push('/')
  };
  
  handleCommentSave = (comment, content) => {
    const params = {
      content: content
    }
    const token = localStorage.getItem('token')
    console.log('comment is', comment, 'content is', content)
    fetch(`http://localhost:3000/api/v1/comments/${comment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
    .then(user => {
      console.log(user)
      
      this.updateUserInfo(user)
    })
  }

  deleteComment = (id) => {
    const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/api/v1/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id
      })
    }).then(res => res.json())
    .then(json => console.log(json))
  }

  fetchPost = (id) => {
    fetch(`http://localhost:3000/api/v1/posts/${id}`)
    .then(res => res.json())
    .then(post => {
      this.setState({
      selectedPost: post 
    })
    })
  }

  savePostComment = (comment, content) => {
    const token = localStorage.getItem('token')
    const params = {
      content: content
    }
    fetch(`http://localhost:3000/api/v1/comments/${comment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params)
    }).then(res => res.json()).then(json => {
      this.fetchUser();
      this.fetchPost(comment.post_id)})
  }
  
  render() {   
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}
        logout={this.logout}
        subforums={this.state.subforums}
        setSubforum={this.setSubforum}/>
        <Switch>
          <Route exact path="/login" 
          render={() => <LoginForm updateUserInfo={this.updateUserInfo}/> }
          />
          <Route exact path="/register"
            render={() => <RegisterForm updateUserInfo={this.updateUserInfo} />} />
          <Route exact path="/profile" render={() => <UserProfile 
          currentUser={this.state.currentUser}
          savePostComment ={this.savePostComment}
          deletePostComment={this.deletePostComment}/>} />
          <Route exact path="/comments" component={CommentsContainer}/>
          <Route exact path="/f/:name" render={() => <Subforum
          subforum={this.state.selectedSubforum}
          setPost={this.setPost}/>
        }
          />
          <Route exact path="/f/:name/p/new" 
          render={() => <CreatePost 
          subforumId={this.state.selectedSubforum.id}
          createPost={this.createPost}/>}/>
          <Route exact path="/f/:name/p/:id" render={() => <Post 
          post={this.state.selectedPost}
          postComment={this.postComment}
          deletePostComment={this.deletePostComment}
          savePostComment={this.savePostComment}
          currentUser={this.state.currentUser}/>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
