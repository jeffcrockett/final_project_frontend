import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'

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
                        <Link to={`/f/${url[2]}/${url[3]}/p/new`}><h5>New post</h5></Link> 
                    </Fragment>
                    : ''
                }
            </div>
        )
    }
}

export default withRouter(Sidebar)