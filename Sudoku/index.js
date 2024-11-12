//to do: draw the board
//to do: generate initial board
//to do: solved the initial board

const numberCellElements = document.querySelectorAll(".number-input");
const sudokuStatusElement = document.getElementById("status-sudoku");

// solved sudoku, to test functions
let currentBoard = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

// board at the start, what player will start with
const initialBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// input
numberCellElements.forEach((numberCell) => {
  numberCell.addEventListener("change", () => {
    if (Number(numberCell.value) > 9 || Number(numberCell.value < 0)) {
      console.log("number is out of range");
      numberCell.value = "";
    } else if (numberCell.value !== "") {

      //change current board here
    }

    drawBoard();
  });
});

function clearBoardCells() {
  numberCellElements.forEach((numberCell) => {
    numberCell.value = "";
  });

  //set current board to initial board here

  drawBoard();
}

function validateRows() {
  for (let j = 0; j < 9; j++) {
    let usedChars = [];
    for (let i = 0; i < 9; i++) {
      if (usedChars.includes(currentBoard[j][i])) {
        return false;
      } else {
        usedChars.push(currentBoard[j][i]);
      }
    }
  }
  return true;
}

function validateColumns() {
  for (let j = 0; j < 9; j++) {
    let usedChars = [];
    for (let i = 0; i < 9; i++) {
      if (usedChars.includes(currentBoard[i][j])) {
        return false;
      } else {
        usedChars.push(currentBoard[i][j]);
      }
    }
  }
  return true;
}

function validateCells() {
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let usedChars = [];
      for (let x = i; x < i + 3; x++) {
        for (let y = j; y < j + 3; y++) {
          if (usedChars.includes(currentBoard[x][y])) {
            return false;
          } else {
            usedChars.push(currentBoard[x][y]);
          }
        }
      }
    }
  }
  return true;
}

function isBoardFull() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (currentBoard[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
}

function checkIfSolved() {
  if (validateRows() && validateColumns() && validateCells() && isBoardFull()) {
    console.log("solved");
    return true;
  }
  return false;
}

function drawBoard() {
  if (checkIfSolved()) {
    sudokuStatusElement.style.color = "green";
    sudokuStatusElement.textContent = "Sudoku has been completed";
  } else if (isBoardFull()) {
    sudokuStatusElement.style.color = "red";
    sudokuStatusElement.textContent = "The Sudoku has been filled in wrong";
  }
  else{
    sudokuStatusElement.style.color = "white";
    sudokuStatusElement.textContent = "Complete the sudoku";
  }
}

//implement backtracking
function generateInitialBoard() {}

//implement backtracking
function solveInitialBoard() {}
