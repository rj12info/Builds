import {Tab, Tabs, Card, Chip, CardTitle, Button, CardActions,  List, ListItem, ListSubHeader, ListDivider, ListCheckbox} from 'react-toolbox';
import axios from 'axios';
import DialogTags from './dialog';
import MakeRCDialog from './rcDilaog';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { dispatch } from 'redux';
import * as addItemActionCreator from './actions/addAction'

class ApkTabs extends React.Component {
    FIRST_TAB="All Builds"
    SECOND_TAB="Recent";
    THIRD_TAB="Play store APKs"
    FOURTH_TAB="Release Doc"

    constructor(props) {
        super(props);
        this.logBuilds = [];
        this.logBuilds.Logged = [];
        const actions = bindActionCreators(addItemActionCreator, dispatch);
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

    componentDidMount(){
        this.loadDBData();
        let { dispatch } = this.props
    }

    componentWillReceiveProps(nextProps){
        console.log("obtained props "+nextProps)
    }

    loadDBData(){
        axios.get('/test')
            .then(function (response) {
                console.log(response);
                this.logBuilds = response.data;
                this.setState({logBuilds:this.logBuilds});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

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
                    <Tab label={this.THIRD_TAB}><small><MakeRCDialog model={this.logBuilds.Logged}/></small></Tab>
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