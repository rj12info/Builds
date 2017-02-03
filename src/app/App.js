import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles
import GrayAppBar from './grayAppBar.js';      // AppBar with simple overrides
import ApkTabBar from './apkTabs.js';      // AppBar with simple overrides
import NaviDrawer from './naviDrawer';      // AppBar with simple overrides
import SuccessButton from './SuccessButton.js';    // A button with complex overrides
import {Button} from 'react-toolbox/lib/button'; // Bundled component import

const App = () => (
    <div>
        <GrayAppBar />
        <NaviDrawer/>
        <section style={{padding: 20}}>
            <ApkTabBar/>
            {/*<SuccessButton label='Success' primary raised/>*/}
            {/*<Button label='Primary Button' onMouseUp={openDrawer} primary/>*/}
        </section>
    </div>
);

function openDrawer() {
}
export default App;
