const gameModule = (function () {
  const gameContainer = document.querySelector(".gameDisplay");
  gameBoard = [];

  const CreatePlayer = (name, mark) => {
    return { name, mark };
  };

  const createGameDisplay = () => {
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.classList.add("box");
      div.textContent = gameBoard[i];
      div.setAttribute("data-square", `${i}`);
      div.addEventListener("click", () => {
        if (div.textContent === "") {
          div.textContent = "content has been added";
        } else return;
      });
      gameContainer.appendChild(div);
    }
  };

  return { createGameDisplay, CreatePlayer };
})();

gameModule.createGameDisplay();
const player1 = gameModule.CreatePlayer("sunshine", "x");

console.log(player1);
