/**
 * Created by jayanth on 01/03/17.
 */
import {ProgressBar} from 'react-toolbox';
import React, { PropTypes } from 'react';
class ProgressBarCustom extends React.Component {
    componentWillMount () {
    }

    state = {
        VISIBILITY: true,
    };


    render () {
        return (
        <section>
            <ProgressBar type="linear" mode='indeterminate' multicolor active = {this.props.show}/>
        </section>
        );
    }
}

export default ProgressBarCustom;