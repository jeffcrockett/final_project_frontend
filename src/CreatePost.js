import React from 'react'
import { Input, TextArea } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class CreatePost extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        title: '',
        content: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                this.props.createPost(this.state)
                }}>
                Title
                <Input onChange={this.handleOnChange}
                name="title"
                content={this.state.title}/><br/>
                Content
                <TextArea 
                onChange={this.handleOnChange}
                value={this.state.content}
                name="content"/>
                <button class="ui button" type="submit">Submit</button>
            </form>
        )
    }
}

export default withRouter(CreatePost)