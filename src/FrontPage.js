import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class FrontPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid celled>
                { this.props.posts.map (post =>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <h3><Link to={`/f/${post.subforum.name}/p/${post.id}`}
                        onClick={() => this.props.setPost(post)}>{post.title}</Link></h3>
                        <p>submitted by <Link to={`/users/${post.user.id}`}>{post.user.username}</Link> to 
                        <Link to={`/f/${post.subforum.name}/${post.subforum.id}`}>{post.subforum.name}</Link></p>
                    </Grid.Column>
                </Grid.Row>
               )}
            </Grid>
        )
    }
}

export default FrontPage