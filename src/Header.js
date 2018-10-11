import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu>
                <Menu.Item
                    name='editorials'
                    active={activeItem === 'editorials'}
                    onClick={this.handleItemClick}
                >
                    Editorials
                </Menu.Item>
                <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
                    Reviews
                </Menu.Item>
                { 
                    !this.props.currentUser 
                ?
                <div style={{display:'inherit'}}>
                <Link to="/login" className="item">
                    <Menu.Item
                        name='login'
                        // position='right'
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                    >
                    Login
                    </Menu.Item>
                </Link>
                <Link to="/register" className="item">
                    <Menu.Item
                        name='register'
                        // position='right'
                        active={activeItem === 'register'}
                        onClick={this.handleItemClick}
                    >
                    Register
                    </Menu.Item>
                </Link> 
                </div>
                :
                <Link to="/profile" className="item">
                    <Menu.Item
                        name='profile'
                        // position='right'
                        active={activeItem === 'profile'}
                        onClick={this.handleItemClick}
                    >
                        Profile
                    </Menu.Item>
                </Link>

                }
            </Menu>
        )
    }
}