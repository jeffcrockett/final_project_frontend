import React from 'react'

export default class UserProfile extends React.Component {
    state = {
        comments: [],
        posts: []
    }

    // componentDidMount() {
    //     fetch('http://localhost:3000/users/')
    // }

    render() {
        return (
            <div>User profile</div>
        )
    }
}