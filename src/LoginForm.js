import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        username: '',
        password: ''

    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleLoginSubmit = () => {
        console.log(this.state);
        // send the fetch!
        const url = "http://localhost:3000/api/v1/login";
        const params = {
            username: this.state.username,
            password: this.state.password
        };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r => r.json())
            .then(response => {
                debugger
                localStorage.setItem("token", response.jwt);
                // console.log(response);
                this.props.updateUserInfo(response.user);
                this.props.history.push("/profile");
            });
    };
    render() {
        return (
            <Form onSubmit={(e) => this.handleLoginSubmit(e)}>
                <Form.Field>
                    <label>Username</label>
                    <input type="text"
                    placeholder='username'
                    name="username"
                    onChange={this.handleOnChange}
                    value={this.state.username}
                     />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='password'
                    type="password"
                    name="password"
                    onChange={this.handleOnChange}
                    value={this.state.password} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default withRouter(LoginForm)