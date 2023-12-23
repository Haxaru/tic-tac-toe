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

const DomManager = (function (board) {
  const messageDisplay = document.querySelector(".message-display");
  const gameBoardDisplay = document.querySelector(".game-board-display");

  const updateScreen = () => {
    gameBoardDisplay.textContent = "";

    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");

      div.classList.add("box");

      div.textContent = board.getBoard()[i];

      gameBoardDisplay.appendChild(div);
    }
  };

  return { messageDisplay, gameBoardDisplay, updateScreen };
})(GameBoardModule);

const GameController = (function (player, board, dom) {
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

    board.addMark(number);

    if (checkWinner() === true) {
      dom.messageDisplay.textContent = `We have a winner! ${player.getActivePlayerName()} wins! The game will now reset!`;

      dom.updateScreen();
      board.resetBoard();
      return;
    }

    if (checkWinner() === false && board.filledCells() >= 9) {
      dom.messageDisplay.textContent =
        "The game ended in a tie! Better luck next time! The game will now reset!";

      dom.updateScreen();
      board.resetBoard();
      return;
    }

    player.switchPlayerTurn();

    dom.messageDisplay.textContent = `It is currently ${player.getActivePlayerName()}'s turn`;

    dom.updateScreen();
  };

  return { checkWinner, playRound };
})(PlayerManager, GameBoardModule, DomManager);
