import { combineReducers } from '../../../../Library/Caches/typescript/3.3/node_modules/redux';

const filters = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_FILTER': {
      const filterObj = state.find(filter => filter.id === action.id);
      const filterIndex = state.indexOf(filterObj);
      return [...state.slice(0, filterIndex), { ...filterObj, active: !filterObj.active }, ...state.slice(filterIndex + 1)];
    }
    case 'ADD_FILTER':
      return [...state, action.filter];
    default:
      return [];
  }
};
const MovieAppReducer = combineReducers({
  filters
});
export default MovieAppReducer;
