import React, { PropTypes } from 'react';
import {Drawer, Button, Card, CardTitle} from 'react-toolbox';
class NaviDrawer extends React.Component {
    state = {
        active: false
    };

    handleToggle = () => {
        this.setState({active: !this.state.active});
    };



    render () {
        return (
            <div>
                <table>
                    <tr>
                        <td cellPadding={100}> <Button raised accent label='Make RC Release' onClick={this.handleToggle} /> </td>
                    <td cellPadding={100}> <Button raised accent label='Open Drawer' onClick={this.handleToggle} /> </td>
                    </tr>
                    </table>
                <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
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