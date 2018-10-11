import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default class LoginForm extends React.Component {
    
    handleSubmit() {
        console.log('submitting...')
    }
    render() {
        return (
            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='username' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='password' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}