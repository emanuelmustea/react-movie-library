import { combineReducers } from 'redux';

const filters = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_FILTER': {
      const filterObj = state.find(filter => filter.id === action.id);
      const filterIndex = state.indexOf(filterObj);
      const newState = [...state.slice(0, filterIndex), { ...filterObj, active: !filterObj.active }, ...state.slice(filterIndex + 1)];
      return newState;
    }
    //   return state.map(filter => ({ ...filter, active: !filter.active }));

    case 'ADD_FILTER':
      return [...state, ...action.value];
    case 'DELETE_FILTERS':
      return [];
    default:
      return state;
  }
};
const MovieAppReducer = combineReducers({
  filters
});
export default MovieAppReducer;
