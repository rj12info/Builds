import React, {PropTypes} from 'react';
import {Dropdown} from 'react-toolbox';
const countriesArray = ['Spain', 'England', 'USA', 'Thailand', 'Tongo', 'Slovenia'];
const countriesObject = {'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England', 'EN-en': 'USA'};

class DropdownTest extends React.Component {
    state = {
        title: '8.3.11RC'
    };

    constructor(props) {
        super(props);
        console.log("{this.props.title} "+this.props.dropDownOptions[0].title)
    }


    handleSimpleChange = (value) => {
        this.setState({simple: value});
    };

    handleMultipleChange = (value) => {
        this.setState({multiple: value});
    };

    render () {
        return (
            <div>
                <Dropdown
                    onChange={this.handleSimpleChange}
                    source={this.props.dropDownOptions}
                    value='8.3.11RC'
                />
            </div>
        );
    }
}
export default DropdownTest;




