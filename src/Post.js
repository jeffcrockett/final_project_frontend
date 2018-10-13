import React from 'react'
import { Card } from 'semantic-ui-react'
import Comment from './Comment'
class Post extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        debugger
        return (
            <div>
                <h1>{this.props.post.title}</h1>
                {this.props.post.comments.map(comment => 
                <Comment comment={comment}/>)}
            </div>
        )
    }
}

export default Post