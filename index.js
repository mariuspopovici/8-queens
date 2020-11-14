import { Board } from './src/8queens.js';

const drawBoard = board => {
  const chessBoard = document.getElementById('chessBoard');
  chessBoard.innerHTML = '';

  for (let i = 0; i < 8; i++) {
    const row = chessBoard.appendChild(document.createElement('div'));
    for (let j = 0; j < 8; j++) {
      const span = document.createElement('span');
      if (i % 2 === 0) {
        span.style.backgroundColor = j % 2 === 0 ? 'white' : 'black';
      } else {
        span.style.backgroundColor = j % 2 === 0 ? 'black' : 'white';
      }

      if (board && board.get(i, j)) {
        const img = document.createElement('img');
        img.src = 'img/crown.png';
        img.width = 64;
        img.height = 64;
        span.appendChild(img);
      }

      row.appendChild(span);
    }
  }
};

const run = () => {
  const board = Board();
  board.solve();
  drawBoard(board);
};

run();
document.getElementById('chessBoard').onclick = run;
