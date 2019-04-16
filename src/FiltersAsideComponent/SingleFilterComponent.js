import React from 'react';

function SingleFilterComponent(props) {
  const { id, name, active } = props.filterObj;
  const { onFilterToggle } = props;
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
export default SingleFilterComponent;
