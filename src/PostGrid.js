 import React, { Fragment } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PostGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        upvotes: this.props.post.upvotes,
        downvotes: this.props.post.downvotes,
        orange: false,
        blue: false,
    }

    componentDidUpdate = (prevProps) => {
        if (this.props !== prevProps) {
            // debugger
            this.setState({
                upvotes: this.props.post.upvotes,
                downvotes: this.props.post.downvotes
            })
        }
    }

    updateFrontEndVotes = (upvoting) => {
        const stateScore = this.state.upvotes - this.state.downvotes
        const propsScore = this.props.post.upvotes - this.props.post.downvotes
        console.log(stateScore, propsScore)
        if (upvoting) {
            this.setState({
                orange: true,
                blue: false
            })
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
            this.setState({
                orange: false,
                blue: true
            })
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
            <Segment raised>
            <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <div class="column"
                            onClick={() => {
                                this.props.voteOnPost(this.props.post, true);
                                // this.setState({
                                //     upvotes: this.state.upvotes + 1
                                // })
                                this.updateFrontEndVotes(true)
                            }
                                }><i class={`arrow ${this.state.orange ? 'orange' : ''} circle up icon`}></i></div>
                            {this.state.upvotes - this.state.downvotes}
                            <div class="column"
                            onClick={() => {
                                this.props.voteOnPost(this.props.post, false);
                                // this.setState({
                                //     downvotes: this.state.downvotes + 1
                                // })
                                this.updateFrontEndVotes(false)
                            }
                                }><i class={`arrow ${this.state.blue ? 'blue' : ''} circle down icon`}></i></div>
                        </Grid.Column>
                        <Grid.Column width={14}>
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
            </Segment>
        )
    }
}

export default PostGrid