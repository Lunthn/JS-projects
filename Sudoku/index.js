//to-do
//save progess?
//animate auto solving

const sudokuStatusElement = document.getElementById("status-sudoku");
const sudokuContainer = document.querySelector(".game-container");

let currentBoard = [];
let initialBoard = [];

function backToInitial() {
  currentBoard = initialBoard.map((row) => row.slice());
  drawBoard();
  checkIfSolved();
}

function validateRows() {
  for (let row = 0; row < 9; row++) {
    let usedNumbers = new Set();
    for (let col = 0; col < 9; col++) {
      const value = currentBoard[row][col];
      if (value && usedNumbers.has(value)) return false;
      usedNumbers.add(value);
    }
  }
  return true;
}

function validateColumns() {
  for (let col = 0; col < 9; col++) {
    let usedNumbers = new Set();
    for (let row = 0; row < 9; row++) {
      const value = currentBoard[row][col];
      if (value && usedNumbers.has(value)) return false;
      usedNumbers.add(value);
    }
  }
  return true;
}

function validateCells() {
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      let usedNumbers = new Set();
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const value = currentBoard[boxRow + row][boxCol + col];
          if (value && usedNumbers.has(value)) return false;
          usedNumbers.add(value);
        }
      }
    }
  }
  return true;
}

function isBoardFull() {
  return currentBoard.every((row) => row.every((value) => value !== 0));
}

function checkIfSolved() {
  if (validateRows() && validateColumns() && validateCells() && isBoardFull()) {
    sudokuStatusElement.style.color = "green";
    sudokuStatusElement.textContent = "Sudoku has been completed";
    return true;
  } else if (isBoardFull()) {
    sudokuStatusElement.style.color = "red";
    sudokuStatusElement.textContent = "The Sudoku has been filled in wrong";
  } else {
    sudokuStatusElement.style.color = "white";
    sudokuStatusElement.textContent = "Complete the sudoku";
  }
  return false;
}

function drawBoard() {
  sudokuContainer.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("cell");

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("div");
      cell.classList.add("number");

      const numberInput = document.createElement("input");
      numberInput.classList.add("number-input");
      numberInput.type = "number";
      numberInput.min = 1;
      numberInput.max = 9;

      numberInput.value = currentBoard[i][j] || "";

      if (initialBoard[i][j] !== 0) {
        numberInput.style.backgroundColor = "hsl(0, 0%, 35%)";
        numberInput.disabled = true;
      } else {
        numberInput.addEventListener("change", () => {
          const value = Number(numberInput.value);
          if (value >= 1 && value <= 9) {
            currentBoard[i][j] = value;
          } else {
            numberInput.value = "";
            currentBoard[i][j] = 0;
          }
          checkIfSolved();
        });
      }

      cell.appendChild(numberInput);
      rowContainer.appendChild(cell);
    }
    sudokuContainer.appendChild(rowContainer);
  }
}

function generateInitialBoard() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  function isValid(num, row, col) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }
    return true;
  }

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = Array.from({ length: 9 }, (_, k) => k + 1);
          shuffle(numbers);
          for (const num of numbers) {
            if (isValid(num, row, col)) {
              board[row][col] = num;
              if (solve()) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  solve();

  for (let k = 0; k < 20; k++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    board[row][col] = 0;
  }

  initialBoard = board;
  currentBoard = board.map((row) => row.slice());
  backToInitial();
}

function solveInitialBoard() {
  function isValid(num, row, col) {
    for (let i = 0; i < 9; i++) {
      if (currentBoard[row][i] === num) return false;
    }

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i][col] === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  }

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(num, row, col)) {
              currentBoard[row][col] = num;
              if (solve()) return true;
              currentBoard[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve();

  drawBoard();
  checkIfSolved();
}

document.addEventListener("DOMContentLoaded", () => {
  generateInitialBoard();
});
