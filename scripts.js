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
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const addMark = (number) => {
    const player = playerManagement;
    const position = board[number];

    if (position != "") return;

    const mark = player.getActivePlayerMark();

    console.log(`Mark "${mark}" placed at position ${position}`);
  };

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, addMark, printBoard };
})();

const GameControls = (function () {
  const board = GameBoard;
  boardCells = board.getBoard();
  const player = playerManagement;

  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [6, 7, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
  };
  const playRound = (number) => {
    console.log(`It is currently ${player.getActivePlayerName()}'s turn`);

    board.addMark(number);
    board.printBoard();
    player.switchPlayerTurn();
  };
  return { checkWinner, playRound };
})();
