import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import UserComment from './UserComment'
import Comment from './Comment'

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        comments: [],
        posts: [],
        editing: false
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
                        {this.props.currentUser && this.props.currentUser.posts.map(post =>
                        <Grid.Row>{post.title}<br/>
                        <Button onClick={() => this.setState({
                            editing: true
                        })}>Edit</Button></Grid.Row>)}
                    </Grid.Column>
                    <Grid.Column>
                        Comments
                        {this.props.currentUser && this.props.currentUser.comments.map(comment => 
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