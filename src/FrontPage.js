import React, { Fragment } from 'react'
import { Grid, Image, Dropdown, Button, Segment} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PostGrid from './PostGrid'

class FrontPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Segment raised>
                {/* <Dropdown text="Sort by">
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => this.props.fetchFrontPage()}>
                            Best
                            </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.props.fetchBackPage()}>
                            Worst
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown> */}
                { this.props.posts.map (post =>
                    <PostGrid 
                    voteOnPost={this.props.voteOnPost}
                    post={post}/>
                )}
                { this.props.startingIndex !== 0 &&
                <Button onClick={() => this.props.fetchPreviousPage()}>Previous</Button>
                }
                <Button onClick={() => this.props.fetchNextPage()}>Next</Button>
            </Segment>
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