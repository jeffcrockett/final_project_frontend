import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Subforum extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                { this.props.subforum.posts &&
                <div> 
                <h1>{this.props.subforum.name}</h1>
                {this.props.subforum.posts.map(post => 
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

export default Subforum