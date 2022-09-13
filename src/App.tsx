import React, { useState } from 'react';
import Logo from './components/Logo';
import ScoreBox from './components/ScoreBox';
import Square from './components/Square';
import { getRandomInt } from './utils/helpers';

export enum PlayerTypes {
  PLAYER_X = 1,
  PLAYER_O = 2
}

function App() {
  const [grid, setGrid] = useState(new Array(9).fill(null));
  // TODO: Update this according to the user choice
  const [players, setPlayers] = useState({
    human: PlayerTypes.PLAYER_X,
    computer: PlayerTypes.PLAYER_O
  });

  const move = (index: number, player: number) => {
    setGrid(grid => {
      const gridCopy = grid.concat();
      gridCopy[index] = player;
      return gridCopy;
    });
  };


  const computerMove = () => {
    let index = getRandomInt(0, 8);
    while (grid[index]) {
      index = getRandomInt(0, 8);
    }
    move(index, players.computer);
  };

  const humanMove = (index: number) => {
    if (!grid[index]) {
      move(index, players.human);
      computerMove();
    }
  };

  return (
    <div className='game'>
      <div className='top-row'>
        <Logo />
      </div>

      <div className='grid'>
        {grid.map((value, index) => {
          const isFilled = value !== null;

          return (
            <Square
              isFilled={isFilled}
              player={value}
              className='square'
              key={index}
              onClick={() => humanMove(index)}
            />
          );
        })}
      </div>

      <div className='score-row'>
        <ScoreBox color='#31C3BD' title='X (You)' score={24} />
        <ScoreBox color='#A8BFC9' title='TIES' score={24} />
        <ScoreBox color='#F2B137' title='O (CPU)' score={24} />
      </div>
    </div>
  );
}

export default App;
