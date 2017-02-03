import {Tab, Tabs, Card, Chip, CardTitle, Button, CardActions,  List, ListItem, ListSubHeader, ListDivider, ListCheckbox} from 'react-toolbox';
import DialogTags from './dialog';
import React, { PropTypes } from 'react';
var jsonData = require('../../src/app/loggedbuilds.json');

class ApkTabs extends React.Component {
    FIRST_TAB="All Builds"
    SECOND_TAB="Recent";
    THIRD_TAB="Play store APKs"
    FOURTH_TAB="Release Doc"

    constructor(props) {
        super(props);
        this.logBuilds = jsonData;
    }
    state = {
        index: 0,
        fixedIndex: 0,
        inverseIndex: 0
    };

    handleTabChange = (index) => {
        this.setState({index});
    };

    handleFixedTabChange = (index) => {
        this.setState({fixedIndex: index});
    };

    handleInverseTabChange = (index) => {
        this.setState({inverseIndex: index});
    };

    handleActive = () => {
    };

    render () {
        return (
            <section>
                <Tabs index={this.state.fixedIndex} onChange={this.handleFixedTabChange} fixed>
                    <Tab label={this.FIRST_TAB}><small>
                        {this.logBuilds.Logged.map(function(object, i){
                            return <Card key={object.title} style={{width: '100%'}}>
                                <CardTitle
                                    title={object.title}
                                    subtitle="Dev logs enabled"
                                />
                                <CardActions>
                                    <Button raised label="Eterno" href={object.eterno} />
                                    <Button raised label="Variant" href={object.variant} />
                                    <Button raised label="QA"  href={object.qc} />
                                    <DialogTags key={"DialogTags"+i} tags={object.tags}/>
                                </CardActions>
                            </Card>;
                        }.bind(this))}

                    </small></Tab>
                    <Tab label={this.SECOND_TAB}><List selectable ripple>
                        <ListCheckbox checked caption='Notify new comics' legend='You will receive a notification when a new one is published' />
                        <ListDivider />
                        <ListItem caption='Contact the publisher' leftIcon='send' />
                        <ListItem caption='Remove this publication' leftIcon='delete' />
                    </List></Tab>
                    <Tab label={this.THIRD_TAB}><small>Play Store apks</small></Tab>
                    <Tab label={this.FOURTH_TAB}><List selectable ripple>
                        {this.logBuilds.Logged.map(function(object, i){
                            return <Card key={"Card"+i} style={{width: '100%'}}>
                                <CardTitle
                                    title={object.title}
                                    subtitle="Dev logs enabled"
                                />

                            </Card>;
                        }.bind(this))}
                    </List></Tab>
                </Tabs>
            </section>
        );

    }
}

export default ApkTabs;