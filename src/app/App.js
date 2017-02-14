import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles
import GrayAppBar from './grayAppBar.js';      // AppBar with simple overrides
import ApkTabBar from './ApkTabs.js';      // AppBar with simple overrides
import NaviDrawer from './NaviDrawer';      // AppBar with simple overrides
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import handlers from './reducers'

var store_0;
var reducer = combineReducers({ items: handlers })
store_0 = createStore(reducer)


const App = () => (
    <Provider store={store_0}>
    <div>
        <GrayAppBar />
        <NaviDrawer/>
        <section style={{padding: 20}}>
            <ApkTabBar/>
        </section>
    </div>
    </Provider>
);

export default App;
