import { combineReducers } from 'redux';

import items from './items';
import auth from './auth';
import collections from './collections';

export default combineReducers({ items, auth, collections });