import React from 'react'
import { TextArea } from 'semantic-ui-react'
import { Form, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class CreateForum extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        name: '',
        description: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleForumCreate = (formData) => {
        const token = localStorage.getItem('token')
        const params = {
            name: formData.name,
            description: formData.description
        }
        fetch('http://localhost:3000/api/v1/subforums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
        .then(json => {
            console.log(json);
            this.props.fetchSubforums()
            this.props.history.push(`/f/${json.name}`)
        })
    }

    render() {
        return (
            <Form onSubmit={(e) => this.handleForumCreate(this.state)}>
                <Form.Field>
                    <label>Name</label>
                    <input type="text"
                        placeholder='Name'
                        name="name"
                        onChange={(e) => this.handleOnChange(e)}
                        value={this.state.name}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <TextArea placeholder='Description'
                        name="description"
                        onChange={(e) => this.handleOnChange(e)}
                        value={this.state.description} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default withRouter(CreateForum)