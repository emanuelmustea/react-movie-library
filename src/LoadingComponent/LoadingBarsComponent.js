import React from 'react';
import './Loading.css';
import '../ui/ui.css';

export default function LoadingBars(props) {
  const { className, repeat: multiple } = props;
  const returnArray = [];
  let i = 0;
  do {
    returnArray.push(<div key={i} className={`loading-bar ${className}`} />);
    i++;
  } while (i < multiple);
  return <div className="loading">{returnArray}</div>;
}
