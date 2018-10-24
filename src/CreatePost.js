import React from 'react'
import { Input, TextArea, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class CreatePost extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        title: '',
        content: '',
        subforumName: this.props.match.url.split('/')[2],
        subforumId: this.props.match.url.split('/')[3]
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
      
        return (
            <Form onSubmit={(e) => {
                e.preventDefault()
                this.props.createPost(this.state)
                }}>
                <h1 style={{display:'flex'}}>Submit a post to {this.props.match.url.split('/')[2]}</h1>
                <Form.Field>
                    Title
                    <Input onChange={this.handleOnChange}
                    name="title"
                    content={this.state.title}/>
                </Form.Field>
                <Form.Field>
                    Content
                    <TextArea 
                    onChange={this.handleOnChange}
                    value={this.state.content}
                    name="content"/>
                    <button class="ui button" type="submit">Submit</button>
                </Form.Field>
            </Form>
        )
    }
}

export default withRouter(CreatePost)