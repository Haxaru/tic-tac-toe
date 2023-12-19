const PlayerManager = (function (
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const players = [
    { name: playerOneName, mark: "X" },
    { name: playerTwoName, mark: "O" },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer =
      activePlayer.mark === "X"
        ? (activePlayer = players[1])
        : (activePlayer = players[0]);
  };

  const setActivePlayer = (num) => {
    activePlayer = players[num];
  };

  const getActivePlayerName = () => activePlayer.name;

  const getActivePlayerMark = () => activePlayer.mark;

  return {
    switchPlayerTurn,
    setActivePlayer,
    getActivePlayerName,
    getActivePlayerMark,
  };
})();

const GameBoardModule = (function (player) {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const addMark = (number) => {
    if (board[number] !== "") return;

    board[number] = player.getActivePlayerMark();
  };

  const filledCells = () => {
    return board.filter((cell) => {
      return cell !== "";
    }).length;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    player.setActivePlayer[0];
  };

  return { getBoard, addMark, filledCells, resetBoard };
})(PlayerManager);

const GameController = (function (board, player) {
  const checkWinner = () => {
    const boardArray = board.getBoard();
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

    for (let condition of winningConditions) {
      const [a, b, c] = condition;

      if (
        boardArray[a] &&
        boardArray[a] === boardArray[b] &&
        boardArray[a] === boardArray[c]
      )
        return true;
    }

    return false;
  };

  const playRound = (number) => {
    if (board.getBoard()[number] !== "") return;

    console.log(`It is currently ${player.getActivePlayerName()}'s turn`);

    board.addMark(number);

    console.log(
      `Mark ${player.getActivePlayerMark()} has been placed at position ${number}`
    );

    console.log(`The board: ${board.getBoard()}`);

    if (checkWinner() === true) {
      console.log(
        `We have a winner! ${player.getActivePlayerName()} wins! The game will now reset!`
      );
      board.resetBoard();
      return;
    }

    if (checkWinner() === false && board.filledCells() >= 9) {
      console.log(
        "The game ended in a tie! Better luck next time! The game will now reset!"
      );
      board.resetBoard();
      return;
    }

    player.switchPlayerTurn();
  };
  return { checkWinner, playRound };
})(GameBoardModule, PlayerManager);
