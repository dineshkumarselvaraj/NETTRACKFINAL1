import {combineReducers} from 'redux'
//import mess from './reducer'

import mess from './toggle/toggleReducer'
import movi from './Homepage/moviesReducer'

const rootReducer = combineReducers({
    mess,movi
});

export default rootReducer;