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
        
        // this.setState({
        //     formContent: this.state.post.content
        // })
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
        post: null,
        editing: false
    }

    getPostFromUrl = () => {
        const urlId = this.props.match.url.split('/')[5]
        fetch(`http://localhost:3000/api/v1/posts/${urlId}`)
            .then(res => res.json())
            .then(post => {
                this.setState({
                    post: post,
                    formContent: post.content
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
            this.getPostFromUrl()
        }
    }

    triggerEdit = () => {
        this.setState({
            editing: true
        })
    }

    cancelEdit = () => {
        this.setState({
            editing: false
        })
    }

    editPostContent = (formContent) => {
        this.setState({
            editing: false
        })
        const token = localStorage.getItem('token')
        const params = {
            content: formContent 
        }
        fetch(`http://localhost:3000/api/v1/posts/${this.state.post.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
        .then(json => this.getPostFromUrl())
    }

    submitReply = (content, parentId) => {
        const token = localStorage.getItem('token')    
        const params = {
            content: content,
            parent_id: parentId,
            user_id: this.props.currentUser.id,
            post_id: this.state.post.id
        }

        fetch('http://localhost:3000/api/v1/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
        .then(json => {
            // this.getPostFromUrl()
            console.log(json)
        })
    }



    render() {
        return (
             <div>
                 <Grid>
                     <Grid.Column width={13}>
                        <Grid.Row>
                        <h1 style={{ display: 'flex', marginLeft: '30px' }}>{this.state.post && this.state.post.title}</h1>
                            <h4 style={{ display: 'flex', marginLeft: '30px'  }}>submitted by {this.state.post && this.state.post.user && this.state.post.user.username}</h4>
                        </Grid.Row>
                        <Grid.Row>
                            { !this.state.editing ?       
                            <p style={{ display: 'flex', marginLeft: '30px'  }}>{this.state.post && this.state.post.content}</p>
                            : <Form>
                                <TextArea value={this.state.formContent}
                                name="formContent"
                                onChange={(e) => this.handleOnChange(e)}></TextArea>
                                <a onClick={() => this.editPostContent(this.state.formContent)}>Submit | </a>
                                <a onClick={() => this.cancelEdit()}>Cancel</a>
                                </Form>
                            }
                         { this.props.currentUser && this.state.post &&
                         this.state.post.user.id === this.props.currentUser.id &&
                         <div>
                             { !this.state.editing ? 
                            <div style={{display:'flex', marginLeft:'30px'}}>
                                <a onClick={() => this.triggerEdit()}>Edit |&nbsp;</a>
                                <a>Delete</a>
                            </div>
                             : ''}
                        </div>
                         }
                         </Grid.Row>
                    </Grid.Column>
                    {/* <Grid.Column width={6}>
                        <Grid.Row>
                            { this.state.post && this.props.currentUser &&
                            <Link to={`/f/${this.state.post.subforum.name}/p/new`}>                         
                            New Post
                            </Link>
                            }
                        </Grid.Row>
                    </Grid.Column> */}
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
                
                {this.state.post && this.state.post.comments.map(comment => 
                <Comment comment={comment}
                submitReply={this.submitReply}
                savePostComment={this.props.savePostComment}
                voteOnComment={this.props.voteOnComment}
                deletePostComment={this.props.deletePostComment}
                currentUser={this.props.currentUser}/>)}
                
            </div>
            
        )
    }
}

export default withRouter(Post)