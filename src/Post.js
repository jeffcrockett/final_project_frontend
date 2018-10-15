import React from 'react'
import { Card } from 'semantic-ui-react'
import Comment from './Comment'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Post extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        const urlId = this.props.match.url.split('/')[4]
        fetch(`http://localhost:3000/api/v1/posts/${urlId}`)
        .then(res => res.json())
        .then(post => {
            debugger;
            this.setState({
            post: post
        })
    })
    }

    state = {
        comment: '',
        post: null
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    render() {
        debugger
        return (
             <div>
                <h1>{this.state.post && this.state.post.title}</h1>
                { this.props.currentUser && 
                <Form onSubmit={(e) => {
                    console.log('submitting...')
                    e.preventDefault();
                    e.target.reset();
                    this.props.postComment(this.state.comment, this.state.post.id)
                }}>
                    <TextArea placeholder='Write a comment' 
                    onChange={(e) => this.handleOnChange(e)}
                    name="comment" value={this.state.comment}/>
                    <Button type="submit">Submit</Button>
                </Form>
                }
                {this.state.post && this.state.post.comments.map(comment => 
                <Comment comment={comment}
                savePostComment={this.props.savePostComment}
                deletePostComment={this.props.deletePostComment}
                currentUser={this.props.currentUser}/>)}
            </div>
            
        )
    }
}

export default withRouter(Post)