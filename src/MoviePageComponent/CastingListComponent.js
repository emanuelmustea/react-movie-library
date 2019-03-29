import React from 'react';
import { imagePathToSrc } from '../helpers/helpers';

function CastingList(props) {
  const castingElements = props.data.cast.map(cast => (
    <div className="person-list" key={cast.cast_id}>
      {(cast.profile_path && <img src={imagePathToSrc(cast.profile_path)} />) || <img src="https://via.placeholder.com/50" />}
      <strong>{cast.name}</strong>
      <br />
      {cast.character}
    </div>
  ));
  const crewElements = props.data.crew.map(crew => (
    <div className="person-list" key={crew.credit_id}>
      {(crew.profile_path && <img src={imagePathToSrc(crew.profile_path)} />) || <img src="https://via.placeholder.com/50" />}
      <strong>{crew.name}</strong>
      <br />
      {crew.job} · <strong>{crew.department}</strong>
    </div>
  ));
  return (
    <div className="row">
      <div className="col half flex column">
        <h3>Casting</h3>
        {castingElements}
      </div>
      <div className="col half flex column">
        <h3>Crew</h3>
        {crewElements}
      </div>
    </div>
  );
}
export default CastingList;
