import React, { Fragment } from 'react' 
import { Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
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
        downvotes: this.props.comment.downvotes
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
        this.setState({
            replying: !this.state.replying
        })
    }

    updateFrontEndVotes = (upvoting) => {
        const stateScore = this.state.upvotes - this.state.downvotes
        const propsScore = this.props.comment.upvotes - this.props.comment.downvotes
        console.log(stateScore, propsScore)
        if (upvoting) {
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
                    <Grid.Column width={3}>
                        <div class="column"
                            onClick={() => {
                                this.props.voteOnComment(this.props.comment, true);
                                // this.setState({
                                //     upvotes: this.state.upvotes + 1
                                // })
                                this.updateFrontEndVotes(true)
                            }
                            }><i class="arrow circle up icon"></i></div>
                        {this.state.upvotes - this.state.downvotes}
                        <div class="column"
                            onClick={() => {
                                this.props.voteOnComment(this.props.comment, false);
                                // this.setState({
                                //     downvotes: this.state.downvotes + 1
                                // })
                                this.updateFrontEndVotes(false)
                            }
                            }><i class="arrow circle down icon"></i></div>
                    </Grid.Column>
        
         
                    <Grid.Column width={13}>
                        <div id={this.props.comment.id}>
                        {/* <div class="ui raised text container segment"> */}
                        <h6>{this.props.comment.replies && this.props.comment.replies.map(reply => 
                        <a href={`#${reply.id}`}>>>{reply.id} </a>)}</h6>
                            { this.props.comment.parent &&
                            <h4><a href={`#${this.props.comment.parent.id}`}>@{this.props.comment.parent.id}</a></h4>
                            }
                                    <h4>{this.props.comment.user.username}</h4>
                                { !this.state.editing ?                
                                <p>
                                    {this.props.comment.content}
                                </p>
                                :
                                <Form>
                                    <TextArea name="value"
                                    onChange={(e) => this.handleOnChange(e)}
                                    value={this.state.value}>
                                    </TextArea><br/>
                                    <a onClick={() => {
                                        debugger
                                        this.toggleEditing();
                                        if(this.props.match.url.split('/').includes('users')) {
                                            this.props.saveProfileComment(this.state.value, this.props.comment.id)
                                        }
                                        else {
                                        this.props.savePostComment(this.props.comment, this.state.value)
                                        }
                                        }}>
                                    Save</a>
                            
                                </Form>
                            } { !this.props.match.url.split('/')[1] === 'users' &&
                                <Fragment>
                                    <a onClick={() => this.toggleReply()}>Reply</a>
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
                                            }}>Submit</a>
                                            
                                        </Form>
                                    }
                                    </Fragment>
                                    }
                                {
                                    this.props.currentUser && this.props.currentUser.id === this.props.comment.user.id 
                                    ?
                                <div class='extra content'>
                                    <a onClick={() => this.toggleEditing()}>Edit | </a>
                                    <a onClick={() => {
                                        this.props.deletePostComment(this.props.comment);
                                        if(this.props.match.url.split('/')[1] === 'users') {
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