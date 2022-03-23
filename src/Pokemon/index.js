import React, { useState } from "react";
import "./styles.css";

const Pokemon = (p) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      key={p.id}
      className="container"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <p className="name">{p.name}</p>
      <div className="pokemonDetailsWrapper">
        {p.types.length && (
          <div>
            Types:
            {p.types.map(({ slot, type: { name } }) => (
              <div key={slot}>{name}</div>
            ))}
          </div>
        )}
        <img className="image" src={p.sprites.front_default} />
      </div>

      {isExpanded ? (
        <div className="extraDetails">
          <div>Height: {p.height}</div>
          <div>Weight: {p.weight}</div>
        </div>
      ) : (
        <div className="clickForMore">Click for extra details</div>
      )}
    </div>
  );
};

export default Pokemon;
