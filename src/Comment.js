import React from 'react' 
import { Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Comment extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        editing: false,
        replying: false,
        value: this.props.comment.content,
        replyContent: ''
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

    render() {
        return (
            <div id={this.props.comment.id}>
            <div class="ui raised padded text container segment">
            <h6>{this.props.comment.replies && this.props.comment.replies.map(reply => 
            <a href={`#${reply.id}`}>{reply.id}</a>)}</h6>
                        <h4>{this.props.comment.user.username}</h4>
                    { !this.state.editing ?                
                    <p>
                        {this.props.comment.content}
                    </p>
                    :
                    <p>
                        <textarea name="value"
                        onChange={(e) => this.handleOnChange(e)}
                        value={this.state.value}>
                        </textarea><br/>
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
                
                    </p>
                    }
                    {
                        this.props.currentUser && this.props.currentUser.id === this.props.comment.user.id 
                        ?
                    <div class='extra content'>
                        <a onClick={() => this.toggleEditing()}>Edit | </a>
                        <a onClick={() => this.props.deletePostComment(this.props.comment)}>Delete | </a>
                        <a onClick={() => this.toggleReply()}>Reply</a>
                        {
                            this.state.replying && 
                            <div>
                                <textarea placeholder="Write a reply"
                                value={this.state.replyContent}
                                name="replyContent"
                                onChange={(e) => this.handleOnChange(e)}/><br/>
                                <a onClick={() => this.props.submitReply(this.state.replyContent, this.props.comment.id)}>Submit</a>
                                
                            </div>
                        }
                    </div>  
                        : ''
                    }
                </div>
       
            </div>
            // <div>
            //     <Card
            //         meta={this.props.comment.user.username}
            //         description={this.props.comment.content}>    
            //     {
            //     this.props.currentUser.id === this.props.comment.user.id ?
            //     <div>
            //         <a>Edit</a>
            //         <a>Delete</a>
            //     </div>
            //     : ''
            //     }
            //     </Card>
            // </div>
 
        )
    }
}

export default withRouter(Comment)