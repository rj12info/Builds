import {Dialog, Button, Chip} from 'react-toolbox';
import React, { PropTypes } from 'react';

class DialogTags extends React.Component {
    state = {
        active: false
    };

    handleToggle = () => {
        this.setState({active: !this.state.active});
    }

    actions = [
        { label: "Cancel", onClick: this.handleToggle },
        { label: "Save", onClick: this.handleToggle }
    ];

    render () {
        return (
            <div>
                <Button label='Release tags' onClick={this.handleToggle} raised/>
                <Dialog
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title='Tags'>
                    {this.props.tags.split(', ').map(function(object, i){
                        return <Chip>{object}

                        </Chip>;
                    }.bind(this))}
                </Dialog>
            </div>
        );
    }
}

export default DialogTags;