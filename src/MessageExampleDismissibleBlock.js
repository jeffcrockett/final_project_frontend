import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class MessageExampleDismissibleBlock extends Component {
    state = { visible: true }

    handleDismiss = () => {
        this.setState({ visible: false })
    }

    render() {
        if (this.state.visible) {
            return (
                <Message
                    onDismiss={this.handleDismiss}
                    header='Error'
                    content={this.props.msg}
                />
            )
        }

        return (
            <p>
            </p>
        )
    }
}

export default MessageExampleDismissibleBlock