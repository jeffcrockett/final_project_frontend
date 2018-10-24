import React, { Fragment } from 'react' 
import { Card } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import { Grid, Form, TextArea } from 'semantic-ui-react'

class Comment extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        editing: false,
        replying: false,
        value: this.props.comment.content,
        replyContent: '',
        upvotes: this.props.comment.upvotes,
        downvotes: this.props.comment.downvotes,
        orange: false,
        blue: false
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUserPage = () => {
        return this.props.match.url.split('/').includes('users')
    }



    // componentDidMount() {
    //     fetch('http://localhost:3000/api/v1/comments')
    //     .then(res => res.json())
    //     .then()
    // }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    toggleReply = () => {
        debugger
        this.setState({
            replying: !this.state.replying
        })
    }

    updateFrontEndVotes = (upvoting) => {
        const stateScore = this.state.upvotes - this.state.downvotes
        const propsScore = this.props.comment.upvotes - this.props.comment.downvotes
        console.log(stateScore, propsScore)
        if (upvoting) {
            this.setState({
                orange: true,
                blue: false
            })
            if (stateScore === propsScore) {
                this.setState({
                    upvotes: this.state.upvotes + 1
                })
            }
            else if (stateScore - propsScore === -1) {
                this.setState({
                    upvotes: this.state.upvotes + 2
                })
            }
        }
        else {
            this.setState({
                orange: false,
                blue: true
            })
            if (stateScore === propsScore) {
                this.setState({
                    downvotes: this.state.downvotes + 1
                })
            }
            else if (stateScore - propsScore === 1) {
                this.setState({
                    downvotes: this.state.downvotes + 2
                })
            }
        }
    }

    render() {
       
        return (
            <Grid celled>
                <Grid.Row>
                    { !this.onUserPage() &&
                    <Grid.Column width={3}>
                        <div class="column"
                            onClick={() => {
                                this.props.voteOnComment(this.props.comment, true);
                                // this.setState({
                                //     upvotes: this.state.upvotes + 1
                                // })
                                this.updateFrontEndVotes(true)
                            }
                            }><i class={`arrow ${this.state.orange ? 'orange' : ''} circle up icon`}></i></div>
                        {this.state.upvotes - this.state.downvotes}
                        <div class="column"
                            onClick={() => {
                                this.props.voteOnComment(this.props.comment, false);
                                // this.setState({
                                //     downvotes: this.state.downvotes + 1
                                // })
                                this.updateFrontEndVotes(false)
                            }
                            }><i class={`arrow ${this.state.blue ? 'blue' : ''} circle down icon`}></i></div>
                    </Grid.Column>
                    }
        
         
                    <Grid.Column width={this.onUserPage() ? 16 : 13}>
                        <div id={this.props.comment.id}>
                        { !this.onUserPage() ?
                        <Fragment>
                            {this.props.comment.replies.length > 0 &&
                            <p style={{display:'flex'}}>Replies: &nbsp;{this.props.comment.replies && this.props.comment.replies.map(reply => 
                            <a href={`#${reply.id}`}>>>{reply.id} &nbsp;</a>)}
                            </p>
                            }
                            { this.props.comment.parent &&
                            <p style={{display:'flex'}}>Replying to &nbsp; <a href={`#${this.props.comment.parent.id}`}>@{this.props.comment.parent.id}</a></p>
                            }
                        </Fragment>
                        : this.props.comment.post ?
                        <Fragment>
                            <p style={{ display: 'flex' }}><Link to={`/f/${this.props.comment.post.subforum.name}/${this.props.comment.post.subforum.id}/p/${this.props.comment.post.id}`}>{this.props.comment.post.title}</Link>&nbsp;submitted by
                            <Link to={`/users/${this.props.comment.post.user.id}`}>&nbsp;{this.props.comment.post.user.username}&nbsp;</Link>
                            to <Link to={`/f/${this.props.comment.post.subforum.name}/${this.props.comment.post.subforum.id}`}>&nbsp;{this.props.comment.post.subforum.name}</Link></p>
                        </Fragment>
                        : ''
                        
                        }
                            <Link to={`/users/${this.props.comment.user.id}`}>
                                <h4 style={{ display: 'flex' }}>{this.props.comment.user.username}</h4>
                            </Link>
                                { !this.state.editing ?                
                                <p style={{ display: 'flex' }}>
                                    {this.props.comment.content}
                                </p>
                                :
                                <Form>
                                    <TextArea name="value"
                                    onChange={(e) => this.handleOnChange(e)}
                                    value={this.state.value}>
                                    </TextArea><br/>
                                    <a style={{ display: 'flex' }} onClick={() => {
                                        debugger
                                        this.toggleEditing();
                                        if(this.onUserPage()) {
                                            this.props.saveProfileComment(this.state.value, this.props.comment.id)
                                        }
                                        else {
                                        this.props.savePostComment(this.props.comment, this.state.value)
                                        }
                                        }}>
                                    Save</a>
                            
                                </Form>
                            } { !this.onUserPage() && this.props.currentUser &&
                                <Fragment>
                                    <a style={{display:'flex', float: 'left'}} onClick={() => this.toggleReply()}>Reply &nbsp;</a>
                                    {
                                        this.state.replying && this.props.currentUser && 
                                        <Form>
                                            <TextArea placeholder="Write a reply"
                                            value={this.state.replyContent}
                                            name="replyContent"
                                            onChange={(e) => this.handleOnChange(e)}/><br/>
                                            <a onClick={() => {
                                                this.setState({
                                                    replying: false
                                                })
                                                this.props.submitReply(this.state.replyContent, this.props.comment.id)
                                                this.props.getPostFromUrl()
                                            }}>Submit</a>
                                            
                                        </Form>
                                    }
                                    </Fragment>
                                    }
                                {
                                    this.props.currentUser && this.props.currentUser.id === this.props.comment.user.id 
                                    ?
                                <div class='extra content' style={{display:'flex'}}>
                                    <a onClick={() => this.toggleEditing()}>Edit &nbsp;</a>
                                    <a onClick={() => {
                                        this.setState({
                                            replying: false,
                                            editing: false
                                        })
                                        this.props.deletePostComment(this.props.comment);
                                        if(this.onUserPage()) {
                                            this.props.getUserFromUrl()
                                        }
                                        }}>Delete</a>
                                </div>  
                                    : ''
                                }
                            {/* </div> */}
                
                        </div>
                    </Grid.Column>
                </Grid.Row>

        </Grid>
 
        )
    }
}

export default withRouter(Comment)