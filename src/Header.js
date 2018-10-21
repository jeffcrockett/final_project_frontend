import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }
//{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }
    state = {
        value: '',
        
    
    }

    // filterSubforums = (e) => {
    //     this.setState({
    //         value: e.target.value
    //     })
    //     console.log(this.props.subforums)
    //     let regex = new RegExp(e.target.value, 'i')
    //     console.log(regex)
    //     this.setState({
    //         filteredSubforums: this.props.subforums.filter(subforum =>
    //             subforum.name.match(regex))
    //     })
    //     console.log(this.state.filteredSubforums)
    // }


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
                    {/* <input type="text" 
                    value={this.state.value}
                    onChange={(e) => this.filterSubforums(e)}/> */}
                    {/* <Dropdown placeholder='Select forum' 
                    onChange={(e) => console.log(e)}
                    fluid search selection options={this.props.subforumOptions} /> */}
                   
                           <Dropdown text='Forums' active visible>
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