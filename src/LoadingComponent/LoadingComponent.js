import React from 'react';
import './Loading.css';
import '../ui/ui.css';

export default function Loading(props) {
  const renderCards = () => {
    const cardsElements = [];
    for (let i = 0; i < 20; i++) {
      cardsElements.push(
        <div key={i} className="col five">
          <div className="card hoverable">
            <div className="card-head image">
              <div className="loading-image" />
            </div>
            <div className="card-body">
              <h4>
                <div className="loading-bar full" />
              </h4>
              <div className="loading-bar full" />
              <div className="loading-bar seventy" />
              <div className="loading-bar eighty" />
              <div className="loading-bar half" />
              <div className="loading-bar sixty" />
              <div className="loading-bar twenty" />
            </div>
            <div className="card-footer">
              <div className="padding lighter">
                <h1>
                  <div className="loading-bar big half" />
                </h1>
                <div className="loading-bar half" />
              </div>
              <ul>
                <li>
                  <div className="loading-bar half margin" />
                </li>
                <li>
                  <div className="loading-bar half margin" />
                </li>
                <li>
                  <div className="loading-bar half margin" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return cardsElements;
  };
  const { type, className, repeat } = props;
  const returnArray = [];
  let i = 0;
  do {
    returnArray.push(
      type === 'card' ? (
        <div key={i} className="row">
          {renderCards()}
        </div>
      ) : null
    );
    returnArray.push(type === 'bar' ? <div key={i} className={`loading-bar ${className}`} /> : null);
    i++;
  } while (i < repeat);
  return <div className="loading">{returnArray}</div>;
}
