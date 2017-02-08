import React, {PropTypes} from 'react';
import {Dialog, RadioGroup, RadioButton, Input} from 'react-toolbox';
/**
 * Created by jayanth on 06/02/17.
 */
class MakeRcDialog extends React.Component {
    state = {
        value: 'CreateNewRC'
    };

    constructor(props) {
        super(props);
        this.OPTION_1 = "CreateNewRC"
        this.OPTION_2 = "UpdateRC"
        this.OPTION_3 = "DeleteRC"
        this.OPTION={};
    }

    handleToggle = () => {
        this.setState({active: !this.state.active});
    }

    componentDidMount(){
        this.setState({OPTION:this.OPTION_1});
    }

    handleChange = (value) => {
        this.setState({value});
        switch (this.state.value) {
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
                                <Input type='text' label='Version' hint='example-8.11.13' name='8.11.13' value={this.state.label}
                                       onChange={this.handleChange.bind(this, 'name')} maxLength={6}/>
                                <Input type='text' label='Eterno Link' hint='Eterno Logged Version' name='name' value={this.state.label}
                                       onChange={this.handleChange.bind(this, 'label')}/>
                                <Input type='text' label='Stage Link' hint='Stage Logged Version' name='name' value={this.state.label}
                                       onChange={this.handleChange.bind(this, 'label')}/>
                                <Input type='text' label='QA Link' hint='QA Logged Version' name='name' value={this.state.label}
                                       onChange={this.handleChange.bind(this, 'label')}/>
                            </section>
                        </td>
                        }

                        {this.state.OPTION == this.OPTION_1 &&
                        <td style={{paddingRight:50+'px'}}>
                            <section>
                                <Input type='text' label='Version' hint='example-8.11.13' name='8.11.13' value={this.state.label}
                                       onChange={this.handleChange.bind(this, 'name')} maxLength={6}/>
                                <Input type='text' label='Eterno Link' hint='Eterno Logged Version' name='name' value={this.state.label}
                                       onChange={this.handleChange.bind(this, 'label')}/>
                                <Input type='text' label='Stage Link' hint='Stage Logged Version' name='name' value={this.state.label}
                                       onChange={this.handleChange.bind(this, 'label')}/>
                                <Input type='text' label='QA Link' hint='QA Logged Version' name='name' value={this.state.label}
                                       onChange={this.handleChange.bind(this, 'label')}/>
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

export default MakeRcDialog;