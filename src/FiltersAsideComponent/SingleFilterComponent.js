import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  const filterObj = state.filters.find(filter => filter.id === ownProps.id);
  if (!filterObj) return {};
  return {
    name: ownProps.name,
    id: ownProps.id,
    active: filterObj.active
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilterToggle: () => {
      dispatch({
        type: 'TOGGLE_FILTER',
        id: ownProps.id
      });
    }
  };
};

function SingleFilterComponent({ id, name, onFilterToggle, active }) {
  console.log('re-rendering component');
  return (
    <div>
      <label>
        <input type="checkbox" onChange={() => onFilterToggle(id)} defaultChecked={active} />
        {!active && name}
        {active && <span className="red">{name}</span>}
      </label>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleFilterComponent);
