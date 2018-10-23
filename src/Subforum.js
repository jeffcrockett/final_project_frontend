import React, { Fragment } from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'
import PostGrid from './PostGrid'
import Sorter from './Sorter'

class Subforum extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        subforum: null
    }

    componentDidMount = () => {
        this.getSubforumFromUrl()
    }
    
    getSubforumFromUrl = () => {
        const urlId = this.props.match.url.split('/')[3]  
        fetch(`http://localhost:3000/api/v1/subforums/${urlId}`)
        .then(res => res.json())
        .then(subforum => {
            this.setState({
                subforum: subforum
            })
        })
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.subforum !== prevProps.subforum) { 
            const urlId = this.props.match.url.split('/')[3]
            fetch(`http://localhost:3000/api/v1/subforums/${urlId}`)
                .then(res => res.json())
                .then(subforum => {
                    this.setState({
                        subforum: subforum
                    })
                })
        }
    }

    subscribe = () => {
        const token = localStorage.getItem('token')
        const params = {
            user_id: this.props.currentUser.id,
            subforum_id: this.state.subforum.id
        }
        fetch('http://localhost:3000/api/v1/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        }).then(res => res.json()).then(json => {
            debugger
            this.props.fetchUser()
        })
    }

    unsubscribe = () => {
        const token = localStorage.getItem('token')
        const params = {
            user_id: this.props.currentUser.id,
            subforum_id: this.state.subforum.id
        }
        fetch(`http://localhost:3000/api/v1/unsubscribe`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            this.props.fetchUser()
        })
    }


    render() {
        return (
            <div>
                {/* <Sorter/> */}
                { this.state.subforum &&
                <Fragment>
                <h1>{this.state.subforum.name}</h1>
                {
                    this.props.currentUser && this.props.currentUser.subforums.map(s => s.id).includes(this.state.subforum.id)
                    ?
                    <Button onClick={() => this.unsubscribe()}>Unsubscribe</Button>
                    :
                    this.props.currentUser 
                    ?
                    <Button onClick={() => this.subscribe()}>Subscribe</Button>
                    : ''
                }
                {/* { this.props.currentUser &&
                <Link to={`/f/${this.state.subforum.name}/${this.state.subforum.id}/p/new`}>
                    <h3>New post</h3>
                </Link>
                } */}
                </Fragment>
                }
            { this.state.subforum && this.state.subforum.posts.map(post =>
                <PostGrid voteOnPost={this.props.voteOnPost}
                post={post}/>
            ) }
            {/* <Grid celled>
            <Grid.Row>
                <Grid.Column width={3}>
                    <div class="column"><i class="arrow circle up icon"></i></div>
                    {post.upvotes - post.downvotes}
                    <div class="column"><i class="arrow circle down icon"></i></div>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Link style={{display:'flex'}}to={`/f/${this.state.subforum.name}/${this.state.subforum.id}/p/${post.id}`}>
                        <h3>{post.title}</h3>
                    </Link>
                </Grid.Column>
            </Grid.Row>
            </Grid> */}
            {/* }
                {this.state.subforum && this.state.subforum.posts.map(post => 
                <Container
                            onClick={() => {
                                console.log(this);
                                this.props.setPost(post)
                            }} >
                
                </Container>)}
                </div>         
                } */}
            </div>
        )
    }
}

export default withRouter(Subforum)