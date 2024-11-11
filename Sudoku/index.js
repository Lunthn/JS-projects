const numberCells = document.querySelectorAll(".number");

//solved sudoku, to test functions
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

//board at the start, what player will start with
const startBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

numberCells.forEach((numberCell) => {
  numberCell.addEventListener("click", () => {
    if (numberCell.innerHTML !== "") {
      numberCell.innerHTML = "";
    } else {
      numberCell.innerHTML = "X";
    }
    checkIfSolved();
  });
});

function resetBoard() {
  numberCells.forEach((numberCell) => {
    numberCell.innerHTML = "";
  })

  // currentBoard = startBoard;
  // drawBoard();
}

function checkRows() {
  for (let j = 0; j < 9; j++) {
    let usedChars = [];
    for (let i = 0; i < 9; i++) {
      if (usedChars.includes(currentBoard[j][i])) {
        console.log("rows not ok");
        return false;
      } else {
        usedChars.push(currentBoard[j][i]);
      }
    }
  }
  console.log("rows ok");
  return true;
}

function checkColumns() {
  for (let j = 0; j < 9; j++) {
    let usedChars = [];
    for (let i = 0; i < 9; i++) {
      if (usedChars.includes(currentBoard[i][j])) {
        console.log("columns not ok");
        return false;
      } else {
        usedChars.push(currentBoard[i][j]);
      }
    }
  }
  console.log("columns ok");
  return true;
}

function checkCells() {
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let usedChars = [];
      for (let x = i; x < i + 3; x++) {
        for (let y = j; y < j + 3; y++) {
          if (usedChars.includes(currentBoard[x][y])) {
            console.log("cells not ok");
            return false;
          } else {
            usedChars.push(currentBoard[x][y]);
          }
        }
      }
    }
  }
  console.log("cells ok");
  return true;
}

function checkBoardFull() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (currentBoard[i][j] == 0) {
        console.log("board not full");
        return false;
      }
    }
  }
  console.log("board full");
  return true;
}

function checkIfSolved() {
  if (checkRows() && checkColumns() && checkCells() && checkBoardFull()) {
    console.log("solved");
    //implement solved sudoku
  } else if (checkBoardFull()) {
    //implement wrong sudoku
  }
  //to nothing if sudoku is not finished
}

function drawBoard(){

}

//backtracking
function generateStartBoard(){

}

//backtracking
function solveStartBoard(){

}



