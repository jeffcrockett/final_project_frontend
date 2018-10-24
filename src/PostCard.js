import React from 'react'
import { Form, TextArea, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PostCard extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        id: this.props.post.id,
        editing: false,
        postContent: this.props.post.content
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.post.id !== prevState.id) {
        return {
            ...prevState,
            postContent: nextProps.post.content
        }
    }
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

    componentDidMount = () => {
        this.setState({
            postContent: this.props.post.content
        })
    }

    render() {
        return (
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={16}>               
                       
                        <Link to={`/f/${this.props.post.subforum.name}/${this.props.post.subforum.id}/p/${this.props.post.id}`}>
                            <h3 style={{display: 'flex'}}>{this.props.post.title}</h3>
                        </Link>
                        <h5 style={{ display: 'flex' }}>submitted to <Link to={`/f/${this.props.post.subforum.name}/${this.props.post.subforum.id}`}>&nbsp;{this.props.post.subforum.name}</Link></h5>
                        {!this.state.editing ?
                            <p style={{ display: 'flex' }}>
                            {this.props.post.content}
                            </p>
                        :
                        <Form>
                            <TextArea
                                onChange={(e) => this.handleOnChange(e)}
                                name="postContent"
                                value={this.state.postContent}>
                            </TextArea><br />
                            <a style={{ display: 'flex' }}
                                onClick={() => {
                                debugger
                                this.toggleEditing();
                                this.props.saveProfilePost(this.state.postContent, this.props.post.id);
                            }}>
                                Save</a>
                        </Form>
                    }
                    {
                        this.props.currentUser && this.props.currentUser.id === this.props.post.user.id
                            ?
                            <div style={{ display: 'flex' }} class='extra content'>
                                <a onClick={() => this.toggleEditing()}>Edit |&nbsp;</a>
                                <a onClick={() => this.props.deleteProfilePost(this.props.post.id)}>Delete</a>
                            </div>
                            : ''
                    }
            
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default PostCard