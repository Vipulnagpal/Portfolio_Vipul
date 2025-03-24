import React from 'react';
import DinoGame from './DinoGame';

const GameSection: React.FC = () => {
  return (
    <section className="dino-game-section">
      <h2>Take a Break and Play!</h2>
      <DinoGame />
    </section>
  );
};

export default GameSection; 