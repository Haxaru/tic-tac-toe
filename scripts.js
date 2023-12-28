const PlayerManager = (function (
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const players = [
    { name: playerOneName, mark: "X" },
    { name: playerTwoName, mark: "O" },
  ];

  const setPlayerNames = () => {
    const playerOneNameInput = document.getElementById("player-1").value;
    const playerTwoNameInput = document.getElementById("player-2").value;

    playerOneNameInput === ""
      ? (players[0].name = playerOneName)
      : (players[0].name = playerOneNameInput);

    playerTwoNameInput === ""
      ? (players[1].name = playerTwoName)
      : (players[1].name = playerTwoNameInput);
  };

  const submitButton = document.querySelector(".submit");
  submitButton.addEventListener("click", () => {
    setPlayerNames();
  });

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
    number = Number(number);

    if (
      number > 8 ||
      number < 0 ||
      isNaN(number) ||
      !Number.isInteger(number) ||
      board[number] !== ""
    )
      return;
    //Validate number selection

    board[number] = player.getActivePlayerMark();
  };

  const filledCells = () => {
    return board.filter((cell) => {
      return cell !== "";
    }).length;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    player.setActivePlayer(0);
  };
  return { getBoard, addMark, filledCells, resetBoard };
})(PlayerManager);

const DomManager = (function (board) {
  const messageDisplay = document.querySelector(".message-display");
  const gameBoardDisplay = document.querySelector(".game-board-display");

  const updateScreen = () => {
    gameBoardDisplay.textContent = "";
    const boardArray = board.getBoard();

    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.classList.add("box");

      div.textContent = boardArray[i];

      gameBoardDisplay.appendChild(div);
    }
  };

  updateScreen();

  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", () => {
    board.resetBoard();
    updateScreen();
    messageDisplay.textContent = "";
  });

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
      [2, 5, 8],
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
    const playerName = player.getActivePlayerName();
    checkWinner();

    if (
      board.getBoard()[number] !== "" ||
      isNaN(number) ||
      !Number.isInteger(number)
    )
      return;

    board.addMark(number);

    if (checkWinner() === true) {
      dom.messageDisplay.textContent = `We have a winner! ${playerName} wins! The game will now reset!`;

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

    dom.messageDisplay.textContent = `It is currently ${playerName}'s turn`;

    dom.updateScreen();
  };

  const handleClick = () => {
    const cells = document.querySelectorAll(".box");
    cells.forEach((element, index) => {
      element.addEventListener("click", () => {
        playRound(index);
      });
    });
  };

  window.addEventListener("click", () => {
    handleClick();
  });

  return { checkWinner, playRound };
})(PlayerManager, GameBoardModule, DomManager);
