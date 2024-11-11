const cells = document.querySelectorAll(".cell");
const turnStatus = document.getElementById("turn");
const restartBtn = document.getElementById("restart");

let turn = "X";
let turnCount = 0;
let gameFinished = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameFinished) {
      //dont overwrite
      if (cell.innerHTML !== "") return;
      //switch turns
      cell.innerHTML = turn === "X" ? "X" : "O";
      turn = turn === "X" ? "O" : "X";
      turnStatus.innerHTML = turn;
      turnCount++;
      checkWin();
    }
  });
});

function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML &&
      cells[a].innerHTML !== ""
    ) {
      turnStatus.style.color = "green";
      turnStatus.innerHTML = `${cells[a].innerHTML} wins!`;
      gameFinished = true;
      return;
    }
    if (turnCount === 9) {
      turnStatus.style.color = "red";
      turnStatus.innerHTML = "Draw!";
    }
  }
}

function restartGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  //reset to default values
  turnStatus.innerHTML = "X";
  turnStatus.style.color = "white";
  turn = "X";
  turnCount = 0;
  gameFinished = false
}
