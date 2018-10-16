import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu backgroundColor="blue">
                <Link to="/" className="item">
                    <Menu.Item
                        name='home'
                        // position='right'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    >
                        Front
                    </Menu.Item>
                </Link> 
                <Menu.Item right>
                    <Dropdown text='Forums'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to="/f/create">
                                    New forum
                                </Link>
                            </Dropdown.Item>
                            {this.props.subforums.map(s =>
                                <Link to={`/f/${s.name}/${s.id}`}
                                onClick={() => this.props.setSubforum(s)}>
                                    <Dropdown.Item text={s.name} />
                                </Link>
                            )}

                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                {/* <Menu.Item
                    name='editorials'
                    active={activeItem === 'editorials'}
                    onClick={this.handleItemClick}
                >
                    Editorials
                </Menu.Item>
                <Menu.Item name='reviews' active={activeItem === 'reviews'} onClick={this.handleItemClick}>
                    Reviews
                </Menu.Item> */}
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
                <Link to={`/users/${this.props.currentUser.id}`} className="item">
                    <Menu.Item
                        name='profile'
                        // position='right'
                        active={activeItem === 'profile'}
                        onClick={this.handleItemClick}
                    >
                        {this.props.currentUser.username}
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
   
            </Menu>
        )
    }
}