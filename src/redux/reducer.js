import { combineReducers } from 'redux';

import mainReducer, { moduleName as mainModule } from './ducks';

export default combineReducers({
  [mainModule]: mainReducer
});
