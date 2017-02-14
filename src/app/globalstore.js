/**
 * Created by jayanth on 09/02/17.
 */

import { createStore, combineReducers } from 'redux'
import handlers from './reducers'

var store_0;
var reducer = combineReducers({ items: handlers })
store_0 = createStore(reducer)
export default store_0;