import {Tab, Tabs, Card, Chip, CardTitle, Button, CardActions,  List, ListItem, ListSubHeader, ListDivider, ListCheckbox} from 'react-toolbox';
import axios from 'axios';
import DialogTags from './ReleaseTagsdialog';
import RcTabScreen from './RcTabScreen';
import React, { PropTypes } from 'react';

class ApkTabs extends React.Component {
    FIRST_TAB="Builds"
    SECOND_TAB="Recent";
    THIRD_TAB="Create RC"

    constructor(props) {
        super(props);
        this.logBuilds = [];
        this.logBuilds.Logged = [];
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

    handleButtonClick = (clickedItem) => {
        console.log("handleButtonClick "+clickedItem.clicked)
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

   addRCItem = (rcitem)=> {
        axios.post('/createrc',rcitem)
            .then(function (response) {
            }.bind(this))
            .then(function (response) {
                this.loadDBData();
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    loadDBData(){
        axios.get('/fetchAll')
            .then(function (response) {
                console.log("response.data "+response.data);
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
                        {this.logBuilds.map(function(object, i){
                            return <Card key={object.title} style={{width: '100%'}}>
                                <CardTitle
                                    title={object.title}
                                    subtitle="Dev logs enabled"
                                />
                                <CardActions>
                                    <Button raised label="Eterno" href={object.eterno} onMouseUp={function(e){this.handleButtonClick({clicked:object.title})}.bind(this)}/>
                                    <Button raised label="Variant" href={object.variant} onMouseUp={function(e){this.handleButtonClick({clicked:object.title})}.bind(this)}/>
                                    <Button raised label="QA"  href={object.qc} onMouseUp={function(e){this.handleButtonClick({clicked:object.title})}.bind(this)}/>
                                    <DialogTags key={"DialogTags"+i} tags={object.tags}/>
                                </CardActions>
                            </Card>;
                        }.bind(this))}

                    </small></Tab>
                    <Tab label={this.SECOND_TAB}>
                        {this.logBuilds.map(function(object, i){
                            return <Card key={object.title} style={{width: '100%'}}>
                                <CardTitle
                                    title={object.title}
                                    subtitle="Dev logs enabled"
                                />
                                <CardActions>
                                    <Button raised label="Eterno" href={object.eterno}/>
                                    <Button raised label="Variant" href={object.variant}/>
                                    <Button raised label="QA"  href={object.qc}/>
                                    <DialogTags key={"DialogTags"+i} tags={object.tags}/>
                                </CardActions>
                            </Card>;
                        }.bind(this))}
                    </Tab>
                    <Tab label={this.THIRD_TAB}><small><RcTabScreen addRCItem = {this.addRCItem} model={this.logBuilds}/></small></Tab>
                </Tabs>
            </section>
        );

    }
}

export default ApkTabs;