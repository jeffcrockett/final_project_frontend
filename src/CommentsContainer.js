import React from 'react'
import Comment from './Comment'

export default class CommentsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/comments')
        .then(res => res.json())
        .then(json => {
            this.setState({
            comments: json
        })
        })
    }

    render() {
        return (
            <div>
            {this.state.comments.map(comment => <Comment comment={comment}/>)}
            </div>
        )
    }
}