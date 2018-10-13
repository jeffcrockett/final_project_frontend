import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
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
                <div style={{ display: 'inherit' }}>
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
                <Menu.Item
                    
                    name='logout'
                    // position='right'
                    active={activeItem === 'logout'}
                    onClick={this.handleItemClick}
                >
                    <span onClick={() => this.props.logout()}>Logout</span>
                </Menu.Item>
                </div>

                }
                <Menu.Item>
                    <Dropdown text='Forums'>
                        <Dropdown.Menu>
                            {this.props.subforums.map(s => 
                                <Link 
                                onClick={() => this.props.setSubforum(s)}
                                to={`/f/${s.name}`}>
                                <Dropdown.Item text={s.name} />
                                </Link>
                            )}

                        </Dropdown.Menu>
                    </Dropdown>
                    </Menu.Item>
            </Menu>
        )
    }
}