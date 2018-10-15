import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import UserComment from './UserComment'
import Comment from './Comment'
import { withRouter } from 'react-router-dom'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        comments: [],
        posts: [],
        editing: false,
        user: null
    }

    componentDidMount = () => {
        const urlId = this.props.match.url.split('/')[2]
        debugger
        fetch(`http://localhost:3000/api/v1/users/${urlId}`)
        .then(res => res.json())
        .then(user => {
            this.setState({
                user: user
            })
        })
    }


 

    // componentDidMount() {
    //     fetch('http://localhost:3000/users/')
    // }

    render() {
        return (
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        Posts
                        {this.state.user && 
                        // this.props.currentUser &&
                        // this.props.currentUser.id === this.state.user.id ? 
                        this.state.user.posts.map(post => 
                            <Grid.Row>
                                {post.title}
                                    {/* <Button onClick={() => this.setState({
                                        editing: true
                                    })}>Edit</Button> */}
                                </Grid.Row>
                        )
                    }
                        
                        {/* // this.state.user.posts.map(post =>
                        // <Grid.Row>{post.title}<br/>
                        
                        { this.state.user && this.state.currentUser && this.state.user.id === this.props.currentUser.id &&
                        <Button onClick={() => this.setState({
                            editing: true
                        })}>Edit</Button>
                        } */}

                        {/* </Grid.Row>)} */}
                    </Grid.Column>
                    <Grid.Column>
                        Comments
                        {this.state.user && this.state.user.comments.map(comment => 
                            <Comment comment={comment}
                                savePostComment={this.props.savePostComment}
                                deletePostComment={this.props.deletePostComment}
                                currentUser={this.props.currentUser} />
                        // <UserComment
                        // key={comment.id} comment={comment}
                        // toggleEdit={this.toggleEdit}
                        // editing={this.state.editing}
                        // handleCommentSave={this.props.handleCommentSave}
                        // deleteComment={this.props.deleteComment}/>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default withRouter(UserProfile)