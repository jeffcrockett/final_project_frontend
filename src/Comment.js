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
        debugger
        return (
            <div>
            <div class="ui raised padded text container segment">
                        <h4>{this.props.comment.user.username}</h4>
                    { !this.state.editing ?                
                    <p>
                        {this.props.comment.content}
                    </p>
                    :
                    <p>
                        <textarea name="value"
                        onChange={(e) => this.handleOnChange(e)}
                        value={this.state.value}>
                        </textarea><br/>
                        <a onClick={() => {
                            debugger
                            this.toggleEditing();
                            this.props.savePostComment(this.props.comment, this.state.value)
                            }}>
                        Save</a>
                    </p>
                    }
                    {
                        this.props.currentUser && this.props.currentUser.id === this.props.comment.user.id 
                        ?
                    <div class='extra content'>
                        <a onClick={() => this.toggleEditing()}>Edit | </a>
                        <a onClick={() => this.props.deletePostComment(this.props.comment)}>Delete</a>
                    </div>  
                        : ''
                    }
                </div>
                       
            
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