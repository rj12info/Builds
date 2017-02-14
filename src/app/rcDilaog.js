import React, {PropTypes} from 'react';
import {Dialog, RadioGroup, RadioButton, Input, Dropdown, Button} from 'react-toolbox';
import axios from 'axios';
import { connect } from 'react-redux'
import * as addItemActionCreator from './actions/addAction'
/**
 * Created by jayanth on 06/02/17.
 */
class MakeRcDialog extends React.Component {
    state = {
        value: 'CreateNewRC',
        title: '', eterno: '', stage: '', qa: ''
    };

    constructor(props) {
        super(props);
        this.OPTION_1 = "CreateNewRC"
        this.OPTION_2 = "UpdateRC"
        this.OPTION_3 = "DeleteRC"
        this.OPTION={};
        this.Logged=this.props.model;
        this.setState({OPTION:this.OPTION_1});
        console.log("logged in tab "+this.Logged)
    }

    handleToggle = () => {
        this.setState({active: !this.state.active});
    }

    handleBuildSelection = (value) => {
        this.currentSelectedBuild = this.Logged.get(value);
    };

    componentDidMount(){
        this.setState({OPTION:this.OPTION_1});
    }
    handleTextChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    }

    handleChange = (value) => {
        this.setState({value});
        switch (value) {
            case this.OPTION_1:
                this.setState({OPTION:this.OPTION_1});
                console.log(this.OPTION_1);
                break;
            case this.OPTION_2:
                this.setState({OPTION:this.OPTION_2});
                console.log(this.OPTION_2);
                break;
            case this.OPTION_3:
                this.setState({OPTION:this.OPTION_3});
                console.log(this.OPTION_3);
                break;
        }
        // this.setState({active: !this.state.active});
    }

    handleCreateBtn = () => {
        axios.get('/test')
            .then(function (response) {
                var addItemActionCreator = function (item) {
                    return {
                        type: 'ADD_ITEM',
                        item: item
                    }
                }

                this.props.dispatch(addItemActionCreator({ id: 1234, description: 'anything' }))
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    handleUpdateBtn = () => {
        console.log("handleUpdateBtn "+this.state.value+" "+this.state.eterno+" "+this.state.qa+" "+this.state.stage);
    }

    actions = [
        {label: "Cancel", onClick: this.handleToggle},
        {label: "Save", onClick: this.handleToggle}
    ];

    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>

                        <td style={{paddingRight:50+'px',verticalAlign: 'top'}}>
                            <RadioGroup name='comic' value={this.state.value} onChange={this.handleChange}>
                                <RadioButton label='Create New RC' value='CreateNewRC'/>
                                <RadioButton label='Update RC' value='UpdateRC'/>
                                <RadioButton label='Delete RC' value='DeleteRC'/>
                            </RadioGroup>
                        </td>
                        {this.state.OPTION == this.OPTION_1 &&
                        <td style={{paddingRight:50+'px'}}>
                            <section>
                                <Input type='text' label={this.OPTION_1} hint='example-8.11.13' name='8.11.13' value={this.state.title}
                                       onChange={this.handleTextChange.bind(this, 'title')} maxLength={6}/>
                                <Input type='text' label='Eterno Link' hint='Eterno Logged Version' name='name' value={this.state.eterno}
                                       onChange={this.handleTextChange.bind(this, 'eterno')}/>
                                <Input type='text' label='Stage Link' hint='Stage Logged Version' name='name' value={this.state.stage}
                                       onChange={this.handleTextChange.bind(this, 'stage')}/>
                                <Input type='text' label='QA Link' hint='QA Logged Version' name='name' value={this.state.qa}
                                       onChange={this.handleTextChange.bind(this, 'qa')}/>
                                <Button raised accent label='Create new RC' onClick={this.handleCreateBtn} value={this.state.label}/>
                            </section>
                        </td>
                        }

                        {this.state.OPTION == this.OPTION_2 &&
                        <td style={{paddingRight:50+'px'}}>
                            <section>
                                <Input type='text' label={this.OPTION_2} hint='example-8.11.13' name='8.11.13' value={this.state.title}
                                       onChange={this.handleTextChange.bind(this, 'title')} maxLength={6}/>
                                <Input type='text' label='Eterno Link' hint='Eterno Logged Version' name='name' value={this.state.eterno}
                                       onChange={this.handleTextChange.bind(this, 'eterno')}/>
                                <Input type='text' label='Stage Link' hint='Stage Logged Version' name='name' value={this.state.stage}
                                       onChange={this.handleTextChange.bind(this, 'stage')}/>
                                <Input type='text' label='QA Link' hint='QA Logged Version' name='name' value={this.state.qa}
                                       onChange={this.handleTextChange.bind(this, 'qa')}/>
                                <Button raised accent label='Update RC' onClick={this.handleUpdateBtn} value={this.state.label} />
                            </section>
                        </td>
                        }

                        {this.state.OPTION == this.OPTION_3 &&
                        <td style={{paddingRight:50+'px'}}>
                            <section>
                                <strong>Currently not available</strong>
                            </section>
                        </td>
                        }
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state/*, props*/) => {
    return {
        frozen: state.value,
        time: state.title,
        // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
        // for you to see its stringified version in our page. More about that here:
        // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
        reduxState: state,
    }
}

export default connect(mapStateToProps)(MakeRcDialog)