import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import theme from './SuccessButton.scss';
import openDrawer from './App.js';
const SuccessButton = (props) => <Button {...props} theme={theme} />;

export default SuccessButton;
