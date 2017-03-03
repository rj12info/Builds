import {Dialog, Button, Chip} from 'react-toolbox';
import React, { PropTypes } from 'react';

class DialogTags extends React.Component {
    state = {
        success: false
    };

    handleToggle = () => {
        this.setState({success: !this.state.success});
    }

    actions = [
        { label: "Ok", onClick: this.handleToggle }
    ];

    render () {
        return (
            <div>
                <Button label='Tags' onClick={this.handleToggle} raised/>
                <Dialog
                    actions={this.actions}
                    active={this.state.success}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title='Tags'>
                    {this.props.tags.split(', ').map(function(object, i){
                        return <Chip key={"Chip"+i}>{object}

                        </Chip>;
                    }.bind(this))}
                </Dialog>
            </div>
        );
    }
}

export default DialogTags;