import React from 'react'
import { Card } from 'semantic-ui-react'
import Comment from './Comment'
import { Form, TextArea, Button, Container, Grid } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'

class Post extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        this.getPostFromUrl()
    //     const urlId = this.props.match.url.split('/')[4]
    //     fetch(`http://localhost:3000/api/v1/posts/${urlId}`)
    //     .then(res => res.json())
    //     .then(post => {
    //         debugger;
    //         this.setState({
    //         post: post
    //     })
    // })
    }

    state = {
        comment: '',
        post: null
    }

    getPostFromUrl = () => {
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

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.post !== prevProps.post) {
            debugger
            this.getPostFromUrl()
        }
    }



    render() {
        debugger
        return (
             <div>
                 <Grid>
                     <Grid.Column width={10}>
                        <Grid.Row>
                        <h1>{this.state.post && this.state.post.title}</h1>    
                        </Grid.Row>
                        <Grid.Row>       
                         <p>{this.state.post && this.state.post.content}</p>
                         </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row>
                            { this.state.post && this.props.currentUser &&
                            <Link to={`/f/${this.state.post.subforum.name}/p/new`}>                         
                            New Post
                            </Link>
                            }
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
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
                <Card.Group>
                {this.state.post && this.state.post.comments.map(comment => 
                <Comment comment={comment}
                savePostComment={this.props.savePostComment}
                deletePostComment={this.props.deletePostComment}
                currentUser={this.props.currentUser}/>)}
                </Card.Group>
            </div>
            
        )
    }
}

export default withRouter(Post)