import React, { PropTypes } from 'react';
import {Drawer, Button, Card, CardTitle} from 'react-toolbox';
class NaviDrawer extends React.Component {
    state = {
        fixedIndex: false
    };

    handleButtonClick = () => {
        console.log("handleButtonClick ")
        this.setState({fixedIndex: 2});
    };



    render () {
        return (
            <div>
                <Drawer active={this.state.success} onOverlayClick={this.handleToggle}>
                    <Card style={{width: '100%'}}>
                        <CardTitle
                            title="Logged Builds"
                            subtitle="Dev logs enabled"
                        />
                    </Card>
                    <Card style={{width: '100%'}}>
                        <CardTitle
                            title="Non Logged Builds"
                            subtitle="No Dev logs"
                        />
                    </Card>
                </Drawer>
            </div>
        );
    }
}

export default NaviDrawer;