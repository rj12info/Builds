import {Tab, Tabs, Card, Chip, CardTitle, Button, CardActions, Snackbar} from 'react-toolbox';
import axios from 'axios';
import _ from 'underscore';
import DialogTags from './ReleaseTagsdialog';
import ProgressBarCustom from './ProgressBarCustom'
import RcTabScreen from './RcTabScreen';
import React, {PropTypes} from 'react';

class ApkTabs extends React.Component {
    FIRST_TAB = "Builds"
    SECOND_TAB = "Top 5";
    THIRD_TAB = "Create RC"

    constructor(props) {
        super(props);
        this.logBuilds = [];
        this.logBuilds.Logged = [];
        this.recents = [];
        this.isLoading = false;

    }

    state = {
        index: 0,
        fixedIndex: 0,
        inverseIndex: 0,
        isSuccessFulUpdate: false,
        isUnSuccessFulUpdate: false,
        stageUpdateItem: {},
    };

    handleTabChange = (index) => {
        this.setState({index});
    };

    handleFixedTabChange = (index) => {
        this.setState({fixedIndex: index});
    };

    handleButtonClick = (item) => {
        let clicks = 1;
        item.clicked.clickCount = _.isNumber(item.clicked.clickCount) ? ++item.clicked.clickCount : 1
        axios.post('/addtopfive', item)
            .then(function (response) {
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    handleUpdateClick = (clickedItem) => {
        setTimeout(function(){ this.setState({stageUpdateItem:clickedItem.clicked})}.bind(this), 1000);
        this.setState({fixedIndex:2});
    }

    handleInverseTabChange = (index) => {
        this.setState({inverseIndex: index});
    };

    handleActive = () => {
    };

    componentDidMount() {
        this.loadDBData();
        let {dispatch} = this.props
    }

    addRCItem = (rcitem)=> {
        axios.post('/createrc', rcitem)
            .then(function (response) {
                if (response.data.n == 1 && response.status == 200) {
                    this.loadDBData();
                    this.setState({isUnSuccessFulUpdate: false, isSuccessFulUpdate:true});
                } else {
                    this.setState({isSuccessFulUpdate: false, isUnSuccessFulUpdate: true});
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    updateRCItem = (rcitem)=> {
        axios.post('/update', rcitem)
            .then(function (response) {
                if (response.data.n == 1 && response.status == 200) {
                    this.setState({isSuccessFulUpdate: true, isUnSuccessFulUpdate: false});
                    this.loadDBData();
                } else {
                    console.log("I am inside else");
                    this.setState({isSuccessFulUpdate: false, isUnSuccessFulUpdate: true});
                    console.log("setstage claedd");
                }
            }.bind(this))
            .catch(function (error) {
                console.log("I am inside error");
                console.log(error);
            });
    };

    loadDBData() {
        this.isLoading = true;
        axios.get('/fetchAll')
            .then(function (response) {
                this.logBuilds = response.data;
                this.isLoading = false;
                this.setState({logBuilds: this.logBuilds});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    getRecents = () => {
        this.isLoading = true;
        axios.get('/gettopfive')
            .then(function (response) {
                this.recents = response.data;
                this.isLoading = false;
                this.setState({recents: this.recents});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <section>
                <Tabs index={this.state.fixedIndex} onChange={this.handleFixedTabChange} fixed>
                    <Tab label={this.FIRST_TAB}>
                        <small>
                            {this.isLoading && <ProgressBarCustom mode='indeterminate' active={this.isLoading}/>}
                            {this.logBuilds.map(function (object, i) {
                                return <Card key={object.title} style={{width: '100%'}}>
                                    <CardTitle
                                        title={object.title}
                                        subtitle={object.rcDate}
                                    />
                                    <CardActions>
                                        <Button raised label="Prod" href={object.eterno} onMouseUp={function (e) {
                                            this.handleButtonClick({clicked: object})
                                        }.bind(this)}/>
                                        <Button raised label="Stg" href={object.variant} onMouseUp={function (e) {
                                            this.handleButtonClick({clicked: object})
                                        }.bind(this)}/>
                                        <Button raised label="QA" href={object.qc} onMouseUp={function (e) {
                                            this.handleButtonClick({clicked: object})
                                        }.bind(this)}/>
                                        <Button raised label="Update" onMouseUp={function (e) {
                                            this.handleUpdateClick({clicked: object})
                                        }.bind(this)}/>
                                        <DialogTags key={"DialogTags" + i} tags={object.tags}/>
                                    </CardActions>
                                </Card>;
                            }.bind(this))}

                        </small>
                    </Tab>
                    <Tab label={this.SECOND_TAB} onActive={function (e) {
                        this.getRecents()
                    }.bind(this)}>
                        {this.isLoading && <ProgressBarCustom mode='indeterminate' active={this.isLoading}/>}
                        {this.recents.map(function (object, i) {
                            return <Card key={object.title} style={{width: '100%'}}>
                                <CardTitle
                                    title={object.title}
                                    subtitle={object.rcDate}
                                />
                                <CardActions>
                                    <Button raised label="Prd" href={object.eterno}/>
                                    <Button raised label="Stg" href={object.variant}/>
                                    <Button raised label="QA" href={object.qc}/>
                                    <Button raised label="Update" onMouseUp={function (e) {
                                        this.handleUpdateClick({clicked: object})
                                    }.bind(this)}/>
                                    <DialogTags key={"DialogTags" + i} tags={object.tags}/>
                                </CardActions>
                            </Card>;
                        }.bind(this))}
                    </Tab>
                    <Tab label={this.THIRD_TAB}>
                        <small><RcTabScreen isUnSuccessFulUpdate ={this.state.isUnSuccessFulUpdate}  isSuccessFulUpdate={this.state.isSuccessFulUpdate}
                                            updateRCItem={this.updateRCItem} addRCItem={this.addRCItem}
                                            model={this.logBuilds} stageUpdateItem = {this.state.stageUpdateItem}/>
                        </small>

                    </Tab>

                </Tabs>
            </section>
        );

    }
}

export default ApkTabs;