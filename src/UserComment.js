import React from 'react'
import { Button } from 'semantic-ui-react'

class UserComment extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        editing: false,
        content: ''
    }

    handleOnChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    
    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    render() {
        return (
            <table>
                <tr>
                    <td>votes</td>
                    <td>username</td>
                    <td>time submitted</td>
                </tr>
                <tr>
                    { !this.state.editing 
                    ? 
                    <td colSpan={3}>
                        {this.props.comment.content}<br/>
                        <Button onClick={() => this.toggleEdit()}>Edit</Button>
                        <Button onClick={() => this.props.deleteComment(this.props.comment.id)}>Delete</Button>
                    </td>
                    :
                        <td colSpan={3}>
                            <textarea onChange={this.handleOnChange} value={this.state.content}>
                            </textarea><br />
                            <Button onClick={(e) => this.props.handleCommentSave(this.props.comment, this.state.content)}>Save</Button>
                            <Button onClick={() => this.toggleEdit()}>Cancel</Button>
                        </td>

                    }
                </tr>
            </table>
        )
    }
}

export default UserComment