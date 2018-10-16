import React from 'react'

class PostCard extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        editing: false,
        postContent: this.props.post.content
    }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div class="ui raised padded text container segment">
                    <h3>{this.props.post.title}</h3>
                    {!this.state.editing ?
                        <p>
                            {this.props.post.content}
                        </p>
                        :
                        <p>
                            <textarea
                                onChange={(e) => this.handleOnChange(e)}
                                name="postContent"
                                value={this.state.postContent}>
                            </textarea><br />
                            <a onClick={() => {
                                debugger
                                this.toggleEditing();
                                this.props.saveProfilePost(this.state.postContent, this.props.post.id);
                            }}>
                                Save</a>
                        </p>
                    }
                    {
                        this.props.currentUser && this.props.currentUser.id === this.props.post.user.id
                            ?
                            <div class='extra content'>
                                <a onClick={() => this.toggleEditing()}>Edit | </a>
                                <a onClick={() => () => console.log('deleting...')}>Delete</a>
                            </div>
                            : ''
                    }
                </div>


            </div>
        )
    }
}

export default PostCard