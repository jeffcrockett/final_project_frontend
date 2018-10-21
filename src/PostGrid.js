 import React, { Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PostGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        upvotes: this.props.post.upvotes,
        downvotes: this.props.post.downvotes
    }

    updateFrontEndVotes = (upvoting) => {
        const stateScore = this.state.upvotes - this.state.downvotes
        const propsScore = this.props.post.upvotes - this.props.post.downvotes
        console.log(stateScore, propsScore)
        if (upvoting) {
            if (stateScore === propsScore) {
                this.setState({
                    upvotes: this.state.upvotes + 1
                })
            }
            else if (stateScore - propsScore === -1 ) {
                this.setState({
                    upvotes: this.state.upvotes + 2
                })
            } 
        }
        else {
            if (stateScore === propsScore) {
                this.setState({
                    downvotes: this.state.downvotes + 1
                })
            }
            else if (stateScore - propsScore === 1) {
                this.setState({
                    downvotes: this.state.downvotes + 2
                })
            }
        }
    }

    render() {
        return (
            <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <div class="column"
                            onClick={() => {
                                this.props.voteOnPost(this.props.post, true);
                                // this.setState({
                                //     upvotes: this.state.upvotes + 1
                                // })
                                this.updateFrontEndVotes(true)
                            }
                                }><i class="arrow circle up icon"></i></div>
                            {this.state.upvotes - this.state.downvotes}
                            <div class="column"
                            onClick={() => {
                                this.props.voteOnPost(this.props.post, false);
                                // this.setState({
                                //     downvotes: this.state.downvotes + 1
                                // })
                                this.updateFrontEndVotes(false)
                            }
                                }><i class="arrow circle down icon"></i></div>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Fragment>
                                <Link style={{ display: 'flex' }} to={`/f/${this.props.post.subforum.name}/${this.props.post.subforum.id}/p/${this.props.post.id}`}>
                                    <h3>{this.props.post.title}</h3>
                                </Link>
                                    <p style={{display: 'flex'}}>submitted by 
                                    <Link to={`/users/${this.props.post.user.id}`}>&nbsp;{this.props.post.user.username}&nbsp;</Link>
                                    to <Link to={`/f/${this.props.post.subforum.name}/${this.props.post.subforum.id}`}>&nbsp;{this.props.post.subforum.name}</Link></p>
                            </Fragment>
                        </Grid.Column>
                    </Grid.Row>
            </Grid>
        )
    }
}

export default PostGrid