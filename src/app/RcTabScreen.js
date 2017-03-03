import React, {PropTypes} from 'react';
import {ProgressBarCustom, Dialog, RadioGroup, RadioButton, Input, Dropdown, Button, Snackbar} from 'react-toolbox';
import _ from 'underscore';
import axios from 'axios';
/**
 * Created by jayanth on 06/02/17.
 */
class RcTabScreen extends React.Component {
    state = {
        value: 'CreateNewRC',
        title: '', eterno: '', stage: '', qc: '', tags:'',
        isSuccessFulUpdate: false,
        isSuccessAdd: false,
        emptyfields: false
    };

    constructor(props) {
        super(props);
        this.OPTION_1 = "CreateNewRC"
        this.OPTION_2 = "UpdateRC"
        this.OPTION_3 = "DeleteRC"
        this.UISTATE={};
        this.RC_UPDATE_SUCCESSFUL = "RC update successful";
        this.RC_INSERT_SUCCESSFUL = "RC insert successful";
        this.ERROR_MSG = "An error occured. No records updated";
        this.GENERIC_NO_INPUT = "Please fill all fields";

        this.Logged=this.props.model;
    }

    handleToggle = () => {
        this.setState({success: !this.state.success});
    }

    componentDidMount (){
        this.setState({UISTATE:this.OPTION_1});
    }

    componentWillReceiveProps () {
        this.setState({success: this.props.isSuccessFulUpdate});
        this.setState({failure: this.props.isUnSuccessFulUpdate});
        if(!_.isEmpty(this.props.stageUpdateItem)){
            this.state.title=this.props.stageUpdateItem.title;
            this.state.eterno=this.props.stageUpdateItem.eterno;
            this.state.stage=this.props.stageUpdateItem.variant;
            this.state.qc=this.props.stageUpdateItem.qc;
            this.setState({value:this.OPTION_2});
            this.setState({UISTATE:this.OPTION_2});
            console.log("state "+this.state.value)
        }
    }

    handleTextChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    }

    handleChange = (value) => {
        this.setState({value});
        switch (value) {
            case this.OPTION_1:
                this.setState({UISTATE:this.OPTION_1});
                console.log(this.OPTION_1);
                break;
            case this.OPTION_2:
                this.setState({UISTATE:this.OPTION_2});
                console.log(this.OPTION_2);
                break;
            case this.OPTION_3:
                this.setState({UISTATE:this.OPTION_3});
                console.log(this.OPTION_3);
                break;
        }
    }

    handleCreateBtn = () => {
        if(_.isEmpty(this.state.title) || _.isEmpty(this.state.eterno) || _.isEmpty(this.state.stage) || _.isEmpty(this.state.qc)) {
            this.setState({emptyfields:true});
            return;
        }
        var date = new Date()
        var title = this.state.title;
        this.state.title = title.indexOf("RC") !=-1 ? title.substring(0, title.indexOf("RC")):title;
        this.props.addRCItem(({ title: this.state.title+"RC", eterno: this.state.eterno, stage:this.state.stage,qc: this.state.qc, tags:this.state.tags, timeStamp:parseInt(new Date().valueOf()), rcDate:this.getModifiedDate()}))
    }

    getModifiedDate = () => {
        var dmDate = new Date();
        var month = new Date().getMonth()+1;
        var locale = "en-us";
        month = new Date().toLocaleString(locale, { month: "long" });
        var fullDay = month +" "+dmDate.getDate()+" "+dmDate.getFullYear();
        return fullDay;
    }

    handleUpdateBtn = () => {
        if(_.isEmpty(this.state.title) || _.isEmpty(this.state.eterno) || _.isEmpty(this.state.stage) || _.isEmpty(this.state.qc)) {
            this.setState({emptyfields:true});
            return;
        }
        this.setState({emptyfields:false});
        var title = this.state.title;
        this.state.title = title.indexOf("RC") !=-1 ? title.substring(0, title.indexOf("RC")):title;
        this.props.updateRCItem(({title: this.state.title+"RC", eterno: this.state.eterno, stage:this.state.stage,qc: this.state.qc, tags:this.state.tags}))
    }

    handleSuccessSnackbarClick =() => {
        this.setState({success:false});
    }

    handleErrorSnackbarClick =() => {
        this.setState({failure:false});
    }

    handleErrorEmptyFields =() => {
        this.setState({emptyfields:false});
    }

    render() {
        return (
            <div>
                <table style={{width: '100%'}}>
                    <tbody>
                    <tr>

                        <td style={{verticalAlign: 'top'}}>
                            <RadioGroup name='comic' value={this.state.value} onChange={this.handleChange}>
                                <RadioButton label='Create New RC' value='CreateNewRC'/>
                                <RadioButton label='Update RC' value='UpdateRC'/>
                                <RadioButton label='Delete RC' value='DeleteRC'/>
                            </RadioGroup>
                        </td>
                        {this.state.UISTATE == this.OPTION_1 &&
                        <td>
                            <section>
                                <Input type='text' label={this.OPTION_1} hint='example-8.11.13' name='8.11.13' value={this.state.title}
                                       onChange={this.handleTextChange.bind(this, 'title')} maxLength={6}/>
                                <Input type='text' label='Eterno Link' hint='Eterno Logged Version' name='name' value={this.state.eterno}
                                       onChange={this.handleTextChange.bind(this, 'eterno')}/>
                                <Input type='text' label='Stage Link' hint='Stage Logged Version' name='name' value={this.state.stage}
                                       onChange={this.handleTextChange.bind(this, 'stage')}/>
                                <Input type='text' label='QA Link' hint='QA Logged Version' name='name' value={this.state.qc}
                                       onChange={this.handleTextChange.bind(this, 'qc')}/>
                                <Input type='text' label='Tags' hint='gify, vscroll video, exoplayer' name='name' value={this.state.tags}
                                       onChange={this.handleTextChange.bind(this, 'tags')}/>
                                <Button raised accent label='Create new RC' onClick={this.handleCreateBtn} value={this.state.label}/>
                            </section>
                        </td>
                        }

                        {this.state.UISTATE == this.OPTION_2 &&
                        <td>
                            <section>
                                <Input type='text' label={this.OPTION_2} hint='example-8.11.13' name='8.11.13' value={this.state.title}
                                       onChange={this.handleTextChange.bind(this, 'title')} maxLength={6}/>
                                <Input type='text' label='Eterno Link' hint='Eterno Logged Version' name='name' value={this.state.eterno}
                                       onChange={this.handleTextChange.bind(this, 'eterno')}/>
                                <Input type='text' label='Stage Link' hint='Stage Logged Version' name='name' value={this.state.stage}
                                       onChange={this.handleTextChange.bind(this, 'stage')}/>
                                <Input type='text' label='QA Link' hint='QA Logged Version' name='name' value={this.state.qc}
                                       onChange={this.handleTextChange.bind(this, 'qc')}/>
                                <Button raised accent label='Update RC' onClick={this.handleUpdateBtn} value={this.state.label} />
                            </section>
                        </td>
                        }

                    </tr>
                    </tbody>
                </table>
                <Snackbar
                    action='Dismiss'
                    label={this.GENERIC_NO_INPUT}
                    active={this.state.emptyfields}
                    timeout={2000}
                    onClick={this.handleErrorEmptyFields}
                    ref='snackbar'
                    type='accept'
                />

                <Snackbar
                    action='Dismiss'
                    label={this.state.UISTATE == this.OPTION_1?this.RC_INSERT_SUCCESSFUL:this.RC_UPDATE_SUCCESSFUL}
                    active={this.state.success}
                    timeout={2000}
                    onClick={this.handleSuccessSnackbarClick}
                    ref='snackbar'
                    type='accept'
                />

                <Snackbar
                    action='Dismiss'
                    label={this.ERROR_MSG}
                    active={this.state.failure}
                    timeout={2000}
                    onClick={this.handleErrorSnackbarClick}
                    ref='snackbar'
                    type='accept'
                />
            </div>
        );
    }
}
export default RcTabScreen;