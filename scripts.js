const playerManagement = (function (
  playerOneName = "Player One",
  PlayerTwoName = "Player Two"
) {
  const players = [
    { name: playerOneName, mark: "X" },
    { name: PlayerTwoName, mark: "O" },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer =
      activePlayer.mark === "X"
        ? (activePlayer = players[1])
        : (activePlayer = players[0]);
  };

  const getActivePlayerName = () => activePlayer.name;

  const getActivePlayerMark = () => activePlayer.mark;

  return { switchPlayerTurn, getActivePlayerName, getActivePlayerMark };
})();

const GameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push([]);
    }
  }

  const getBoard = () => board;

  const addMark = (row, column) => {
    const player = playerManagement;
    const position = board[row][column];

    if (!position === 0) return;

    const mark = player.getActivePlayerMark();

    position.push(mark);
  };

  const printBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {}
    }
  };

  return { getBoard, addMark, printBoard };
})();

const GameControls = (function () {
  const board = GameBoard;
  const player = playerManagement;
  const playRound = (row, column) => {
    console.log(`It is currently ${player.getActivePlayerName()}'s turn`);

    board.addMark(row, column);
    board.printBoard();
    player.switchPlayerTurn();
  };
  return { playRound };
})();

GameControls.playRound(1, 0);
