import React from 'react';
import './Loading.css';
import '../ui/ui.css';

export default function Loading() {
  return (
    <div className="simple-loading">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
