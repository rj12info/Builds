import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Logo from './Logo.js';
import theme from './grayAppBar.scss';

const grayAppBar = ({ children, ...other }) => (
  <AppBar {...other} theme={theme}>
    <Logo /> <p style={{color:'#000000'}}>Available builds</p>
    {children}
  </AppBar>
);

grayAppBar.propTypes = {
  children: PropTypes.node
};

export default grayAppBar;
