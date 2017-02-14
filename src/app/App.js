import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles
import GrayAppBar from './TopGrayAppBar.js';      // AppBar with simple overrides
import ApkTabBar from './ApkTabs.js';      // AppBar with simple overrides
import NaviDrawer from './NaviDrawer';      // AppBar with simple overrides

const App = () => (
    <div>
        <GrayAppBar />
        <NaviDrawer/>
        <section style={{padding: 20}}>
            <ApkTabBar/>
        </section>
    </div>
);

export default App;
