import React from 'react'
import { Card } from 'semantic-ui-react'
import Comment from './Comment'
import { Form, TextArea, Button } from 'semantic-ui-react'

class Post extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        comment: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    render() {

        return (
            <div>
                <h1>{this.props.post.title}</h1>
                <Form onSubmit={(e) => {
                    console.log('submitting...')
                    e.preventDefault();
                    e.target.reset();
                    this.props.postComment(this.state.comment, this.props.post.id)
                }}>
                    <TextArea placeholder='Write a comment' 
                    onChange={(e) => this.handleOnChange(e)}
                    name="comment" value={this.state.comment}/>
                    <Button type="submit">Submit</Button>
                </Form>
                {this.props.post.comments.map(comment => 
                <Comment comment={comment}
                savePostComment={this.props.savePostComment}
                deletePostComment={this.props.deletePostComment}
                currentUser={this.props.currentUser}/>)}
            </div>
        )
    }
}

export default Post