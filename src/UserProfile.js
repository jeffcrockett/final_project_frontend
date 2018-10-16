import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import UserComment from './UserComment'
import Comment from './Comment'
import { withRouter } from 'react-router-dom'
import PostCard from './PostCard'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        comments: [],
        posts: [],
        editing: false,
        user: null,
        viewing: 'posts'
    }

    componentDidMount = () => {
        debugger
        this.getUserFromUrl()
    }
    
    getUserFromUrl = () => {
        const urlId = this.props.match.url.split('/')[2]        
        fetch(`http://localhost:3000/api/v1/users/${urlId}`)
        .then(res => res.json())
        .then(user => {
            console.log(this.props.currentUser)
            this.setState({
                user: user
            })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            debugger
        }
    }

    saveProfilePost = (formData, id) => {
        const token = localStorage.getItem('token')
        const params = {
            content: formData
        }
        fetch(`http://localhost:3000/api/v1/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
        .then(json => this.getUserFromUrl())
    }

    saveProfileComment = (formData, id) => {
        const token = localStorage.getItem('token')
        const params = {
            content: formData
        }
        fetch(`http://localhost:3000/api/v1/comments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
            .then(json => this.getUserFromUrl())
    }
    
    
    
    
    // componentDidMount() {
    //     fetch('http://localhost:3000/users/')
    // }

    render() {
        return (
            <div>
                <div class="ui two item stackable tabs menu">
                    <a onClick={() => this.setState({viewing: 'posts'})} 
                    class="item" 
                    data-tab="definition">Posts</a>
                    <a onClick={() => this.setState({viewing: 'comments'})}
                    class="item" data-tab="examples">Comments</a>
                </div>
                { this.state.viewing === 'posts' ?
                <div>
                    Posts
                    {this.state.user && this.state.user.posts.map(post => 
                        <PostCard post={post}
                        currentUser={this.props.currentUser}
                        saveProfilePost={this.saveProfilePost}/>
                    )
                    }
                </div>
                : 
                <div>
                    Comments
                    {this.state.user && this.state.user.comments.map(comment => 
                        <Comment comment={comment}
                            savePostComment={this.props.savePostComment}
                            saveProfileComment={this.saveProfileComment}
                            deletePostComment={this.props.deletePostComment}
                            currentUser={this.props.currentUser} />
                        )}
                </div>
                }
            </div>
        )
    }
}

export default withRouter(UserProfile)