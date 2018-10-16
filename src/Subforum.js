import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'

class Subforum extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        subforum: null
    }

    componentDidMount = () => {
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


    render() {
        return (
            <div>
                { this.state.subforum &&
                <div>
                <h1>{this.state.subforum.name}</h1>
                { this.props.currentUser &&
                <Link to={`/f/${this.state.subforum.name}/${this.state.subforum.id}/p/new`}>
                    <h3>New post</h3>
                </Link>
                }
                </div>
                }
            <Grid celled>
            { this.state.subforum && this.state.subforum.posts.map(post =>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                </Grid.Column>
                <Grid.Column width={13}>
                    <Link style={{display:'flex'}}to={`/f/${this.state.subforum.name}/${this.state.subforum.id}/p/${post.id}`}>
                        <h3>{post.title}</h3>
                    </Link>
                </Grid.Column>
            </Grid.Row>
            ) }
            </Grid>
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