import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Subforum extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        subforum: null
    }

    componentDidMount = () => {
        const urlId = this.props.match.url.split('/')[3]
        debugger
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
            debugger
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


    render() {
        return (
            <div>
                { this.state.subforum &&
                <div> 
                <h1>{this.state.subforum.name}</h1>
                <Link to={`/f/${this.state.subforum.name}/p/new`}>
                    <h3>New post</h3>
                </Link>
                {this.state.subforum && this.state.subforum.posts.map(post => 
                <Container
                            onClick={() => {
                                console.log(this);
                                this.props.setPost(post)
                            }} >
                <Link 
                    to={`/f/${this.props.subforum.name}/p/${post.id}`}
                >
                    <h3>{post.title}</h3>
                    </Link>
                </Container>)}
                </div>         
                }
            </div>
        )
    }
}

export default withRouter(Subforum)