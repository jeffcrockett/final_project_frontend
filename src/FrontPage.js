import React, { Fragment } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PostGrid from './PostGrid'

class FrontPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                { this.props.posts.map (post =>
                    <PostGrid 
                    voteOnPost={this.props.voteOnPost}
                    post={post}/>
                )}
            </Fragment>
            // <Grid celled>
            //     <Grid.Row>
            //         <Grid.Column width={3}>
            //             <div class="column"><i class="arrow circle up icon"></i></div>
            //             <div class="column"><i class="arrow circle down icon"></i></div>
            //         </Grid.Column>
            //         <Grid.Column width={13}>
            //             <h3><Link style={{display: 'flex'}}to={`/f/${post.subforum.name}/${post.subforum.id}/p/${post.id}`}
            //             onClick={() => this.props.setPost(post)}>{post.title}</Link></h3>
            //             <p style={{display:'flex'}}>submitted by <Link to={`/users/${post.user.id}`}> {post.user.username} </Link> to 
            //             <Link to={`/f/${post.subforum.name}/${post.subforum.id}`}> {post.subforum.name}</Link></p>
            //         </Grid.Column>
            //     </Grid.Row>
            // </Grid>
        )
    }
}

export default FrontPage