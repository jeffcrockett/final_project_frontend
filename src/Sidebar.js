import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Fragment, Button } from 'react'
import { Segment } from 'semantic-ui-react'

class Sidebar extends React.Component {
     
    componentDidMount = () => {

    }

    render() {
        const url = this.props.history.location.pathname.split('/')
        return (
            <div>
                {
                    url[1] === 'f' && url[2] !== 'create' && url[2] !== 'new' ? 
                    <Fragment>
                        <Link to={`/f/${url[2]}/${url[3]}`}><h3>{url[2]}</h3></Link>
                        { this.props.currentUser &&
                        <Link to={`/f/${url[2]}/${url[3]}/p/new`}><h5>New post</h5></Link> 
                        }
                    </Fragment>
                    : ''
                }

                {
                    this.props.currentUser && 
                    <Fragment>
                    <h3>Subscriptions:</h3>
                    {this.props.currentUser.subforums.map(
                        s => <Link to={`/f/${s.name}/${s.id}`}
                        onClick={() => this.props.setSubforum(s)}>
                        <Segment raised><h4>{s.name}</h4></Segment></Link>
                    )}
                    </Fragment>
                }
            </div>
        )
    }
}

export default withRouter(Sidebar)