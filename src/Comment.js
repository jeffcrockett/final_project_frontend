import React from 'react' 

export default class Comment extends React.Component {
    constructor(props) {
        super(props)
    }



    componentDidMount() {
        fetch('http://localhost:3000/api/v1/comments')
        .then(res => res.json())
        .then()
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
                    <td colSpan={3}>
                    {this.props.comment.content}
                    {this.props.comment.replies ? 
                    <div>
                    {this.props.comment.replies.map(comment => <Comment comment={comment}/>)}</div> : ''}
                    </td>
                </tr>
            </table>
        )
    }
}