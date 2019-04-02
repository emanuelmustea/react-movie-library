import React from 'react';

export default function SingleFilterComponent({ id, name, onFilterToggle, active }) {
  return (
    <div>
      <label>
        <input type="checkbox" onChange={() => onFilterToggle(id)} defaultChecked={active} />
        {name}
      </label>
    </div>
  );
}
