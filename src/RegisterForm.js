import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class RegisterForm extends React.Component {
    state = {
        username: '',
        password: '',
        confirmPassword: ''
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegisterSubmit = () => {
        console.log(this.state);
        if (this.state.password !== this.state.confirmPassword) {
            console.log("Passwords don't match");
            return;
        }
        // send the fetch!
        const url = "http://localhost:3000/api/v1/users";
        const params = {
            username: this.state.username,
            password: this.state.password
        };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(r => r.json())
            .then(response => {
                // debugger;
                localStorage.setItem("token", response.jwt);
                console.log(response);
                this.props.updateUserInfo(response.user);
                this.props.history.push(`/users/${response.user.id}`);
            });
    };

    render() {
        return (
            <Form onSubmit={(e) => this.handleRegisterSubmit(e)}>
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
                <Form.Field>
                    <label>Confirm Password</label>
                    <input placeholder='confirm password'
                        type="password"
                        name="confirmPassword"
                        onChange={this.handleOnChange}
                        value={this.state.confirmPassword} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default withRouter(RegisterForm)