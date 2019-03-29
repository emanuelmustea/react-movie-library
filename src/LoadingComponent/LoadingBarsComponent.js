import React from 'react';
import './Loading.css';
import '../ui/ui.css';

export default function LoadingBars(props) {
  const { className, repeat: multiple } = props;
  const returnArray = [];
  for (let i = multiple; i > 0; i--) {
    returnArray.push(<div key={i} className={`loading-bar ${className}`} />);
  }
  return <div className="loading">{returnArray}</div>;
}
