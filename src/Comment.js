import React from 'react' 
import { Card } from 'semantic-ui-react'
export default class Comment extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        editing: false,
        value: this.props.comment.content
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

    toggleEditing() {
        this.setState({
            editing: !this.state.editing
        })
    }

    render() {
        return (
            <div class='ui card'>           
                <div class='content'>
                    <div class='meta'>
                        {this.props.comment.user.username}</div>
                    { !this.state.editing ?                
                    <div class='description'>
                        {this.props.comment.content}
                    </div>
                    :
                    <div class='description'>
                        <textarea name="value"
                        onChange={(e) => this.handleOnChange(e)}
                        value={this.state.value}>
                        </textarea>
                        <a onClick={() => {
                            debugger
                            this.toggleEditing();
                            this.props.savePostComment(this.props.comment, this.state.value)
                            }}>
                        Save</a>
                    </div>
                    }
                </div>
                    {
                        this.props.currentUser.id === this.props.comment.user.id 
                        ?
                    <div class='extra content'>
                        <a onClick={() => this.toggleEditing()}>Edit | </a>
                        <a onClick={() => this.props.deletePostComment(this.props.comment)}>Delete</a>
                    </div>  
                        : ''
                    }
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