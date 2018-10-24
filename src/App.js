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
import FrontPage from './FrontPage'
import CreateForum from './CreateForum'
import Sidebar from './Sidebar'
import { Grid } from 'semantic-ui-react'


class App extends Component {
  // constructor() {
    
  // }
  state = {
    currentUser: null,
    subforums: [],
    selectedSubforum: 'asdf',
    posts: [],
    frontPagePosts: [],
    startingIndex: 0
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
    })
      this.setState({
        subforumOptions: this.state.subforums.map(s => {
            let abbrev = s.name.slice(0, 2).toLowerCase()
            return { key: abbrev, value: abbrev, text: s.name }
          })
    })
  })
  }

  fetchFrontPage = () => {
    fetch(`http://localhost:3000/api/v1/frontpage?range=${this.state.startingIndex}`)
    .then(res => res.json()).then(json => this.setState({
      frontPagePosts: json
    }))
  }

  fetchNextPage = () => {
    this.setState({
      startingIndex: this.state.startingIndex + 25
    })
    this.fetchFrontPage()
  }

  fetchPreviousPage = () => {
    this.setState({
      startingIndex: this.state.startingIndex - 25
    })
    this.fetchFrontPage()
  }

  fetchBackPage = () => {
    fetch('http://localhost:3000/api/v1/backpage')
    .then(res => res.json()).then(json => {
      debugger
      this.setState({
      frontPagePosts: json
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
          // this.props.history.push("/");
        });
    }
    // this.fetchAllPosts()
    this.fetchSubforums()
    this.fetchFrontPage()
  }

  createPost = (formData) => {
    const token = localStorage.getItem('token')
    const params = {
      title: formData.title,
      content: formData.content,
      subforum_id: formData.subforumId,
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
        this.props.history.push(`/f/${formData.subforumName}/${formData.subforumId}/p/${post.id}`)
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

  fetchAllPosts = () => {
    fetch('http://localhost:3000/api/v1/posts')
    .then(res => res.json())
    .then(posts => { 
      this.setState({
      posts: posts
    })
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

  voteOnPost = (post, upvoted) => {
    let params;
    const token = localStorage.getItem('token')
    if (upvoted) {
      params = {
        upvotes: post.upvotes + 1
      }
    }
    else {
      params = {
        downvotes: post.downvotes + 1
      }
    }
    fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify(params)
    }).then(res => res.json())
    .then(json => {
      console.log(json)
    })
  }

  voteOnComment = (comment, upvoted) => {
    let params;
    const token = localStorage.getItem('token')
    if (upvoted) {
      params = {
        upvotes: comment.upvotes + 1
      }
    }
    else {
      params = {
        downvotes: comment.downvotes + 1
      }
    }
    fetch(`http://localhost:3000/api/v1/comments/${comment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify(params)
    }).then(res => res.json())
      .then(json => {
        console.log(json)
      })
  }
  
  render() {   
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}
        logout={this.logout}
        subforums={this.state.subforums}
        setSubforum={this.setSubforum}
        subforumOptions={this.state.subforumOptions}/>
      <Grid>
        <Grid.Column width={this.state.currentUser ? 13 : 16}>
        <Grid.Row>
        <Switch>
          <Route exact path="/f/create" 
          render={() => <CreateForum fetchSubforums={this.fetchSubforums}/>}
          />
          <Route exact path="/" render={() => <FrontPage setPost={this.setPost}
            startingIndex={this.state.startingIndex}
            fetchNextPage={this.fetchNextPage}
            fetchPreviousPage={this.fetchPreviousPage}
            fetchFrontPage={this.fetchFrontPage}
            fetchBackPage={this.fetchBackPage}
            voteOnPost={this.voteOnPost}
            posts={this.state.frontPagePosts}/>}/>
          <Route exact path="/login" 
          render={() => <LoginForm updateUserInfo={this.updateUserInfo}/> }
          />
          <Route exact path="/register"
            render={() => <RegisterForm updateUserInfo={this.updateUserInfo} />} />
          <Route exact path="/users/:id" render={() => <UserProfile 
            currentUser={this.state.currentUser}
            savePostComment ={this.savePostComment}
            voteOnComment={this.voteOnComment}
            deletePostComment={this.deletePostComment}/>} />
          <Route exact path="/comments" component={CommentsContainer}/>
          <Route exact path="/f/:name/:id" render={() => <Subforum
            currentUser={this.state.currentUser}
            subforum={this.state.selectedSubforum}
            fetchUser={this.fetchUser}
            setPost={this.setPost}
            voteOnPost={this.voteOnPost}/>
        }
          />
          <Route exact path="/f/:name/:id/p/new" 
            render={() => <CreatePost 
            subforumId={this.state.selectedSubforum.id}
            createPost={this.createPost}/>}/>
          <Route exact path="/f/:name/:id/p/:id" render={() => <Post 
            post={this.state.selectedPost}
            postComment={this.postComment}
            voteOnComment={this.voteOnComment}
            deletePostComment={this.deletePostComment}
            savePostComment={this.savePostComment}
            currentUser={this.state.currentUser}/>}/>
        </Switch>
        </Grid.Row>
        </Grid.Column>
        { this.state.currentUser &&
          <Grid.Column width={3} style={{ border: '1px solid #d4d4d5' }}>
        <Grid.Row>
              <Sidebar 
                currentUser={this.state.currentUser} subforums={this.state.subforums}
                setSubforum={this.setSubforum}/>
          </Grid.Row>
        </Grid.Column>
        }
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
