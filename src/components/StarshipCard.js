import React from 'react';
import './starship.css';

const StarshipCard = ({ starship, compareStarship }) => {
  const { name, starship_class, max_atmosphering_speed, cost_in_credits, passengers, films } = starship;

  return (
    <div className="starship-card">
      <div className="starship-header">
      <h4>{name} - {starship_class}</h4>
      </div>
      <img src="/assets/Star_Wars_Logo.png" className='starship-image' alt="star war logo" width='320px' height='200px' />
      <div className='starship-categories'>
        <button className='button' onClick={() => compareStarship('maxSpeed')}>
          <div>Max Speed</div>
          <div>{max_atmosphering_speed}</div>
        </button>
        <button className='button' onClick={() => compareStarship('creditCost')}>
          <div>Credit Cost</div>
          <div>{cost_in_credits}</div>
        </button>
        <button className='button' onClick={() => compareStarship('passengers')}>
          <div>Passengers</div>
          <div>{passengers}</div>
        </button>
        <button className='button' onClick={() => compareStarship('filmAppearances')}>
          <div>Film Appearances</div>
          <div>{films.length}</div>
        </button>
      </div>
    </div>
  );
};

export default StarshipCard;
