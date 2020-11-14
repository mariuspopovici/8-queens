const Board = () => {
  let _board = [...Array(8)].map(() => Array(8).fill(0));

  // use this to track successful placements
  let _stack = [];

  const _isSafe = (row = 0, col = 0) => {
    // check this row
    const isRowSafe = _board[row].every(element => element === 0);
    if (!isRowSafe) return false;

    // check upper diagonal left
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
      if (_board[i][j]) return false;

    // lower diagonal left side
    for (let i = row, j = col; j >= 0 && i < _board.length; i++, j--)
      if (_board[i][j]) return false;

    return true;
  };

  const print = () => {
    console.table(_board);
    _board.forEach(row => console.log(row.join(' '.repeat(3))));
  };

  const get = (x, y) => _board[x][y];

  const solve = () => {
    const start = _stack.pop();
    let [row, col] = start ? start : [0, 0];
    _board[row][col] = 0;

    if (start) row++;

    if (row >= _board.length) {
      return solve();
    }

    // place queens in each column where it's safe
    for (let colIdx = col; colIdx < _board.length; colIdx++) {
      let safe = false;
      for (let rowIdx = row; rowIdx < _board.length; rowIdx++) {
        safe = _isSafe(rowIdx, colIdx);
        if (safe) {
          _stack.push([rowIdx, colIdx]); // add this position to placements stack
          _board[rowIdx][colIdx] = 1; // mark this position as safe
          row = 0; // start with first element on next column
          break;
        }
      }

      // if no safe location was found on this column then backtrack
      if (!safe) {
        return solve();
      }
    }
  };

  return {
    solve,
    print,
    get
  };
};

export { Board };
