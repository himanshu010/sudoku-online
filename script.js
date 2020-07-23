var arr = [[], [], [], [], [], [], [], [], []];
var temp = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

function initializeTemp(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      temp[i][j] = false;
    }
  }
}

function setTemp(board, temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        temp[i][j] = true;
      }
    }
  }
}

var prefill_color = "grey";
var afterfill_color = "red";

function setColor(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (temp[i][j] == true) {
        arr[i][j].style.color = prefill_color;
      }
    }
  }
}

function resetColor() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j].style.color = afterfill_color;
    }
  }
}

var board = [[], [], [], [], [], [], [], [], []];

let button = document.getElementById("generate-sudoku");
let solve = document.getElementById("solve");

console.log(arr);
function changeBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else arr[i][j].innerText = "";
    }
  }
}
var x = "easy";
var sel = document.getElementById("sel1");
function myFunction() {
  x = document.getElementById("mySelect").value;
}
button.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response);
    initializeTemp(temp);
    resetColor();

    board = response.board;
    setTemp(board, temp);
    setColor(temp);
    changeBoard(board);
    solve.style.display = "block";
    button.style.display = "none";
    sel.style.display = "none";
  };

  var url1 = "https://sugoku.herokuapp.com/board?difficulty=" + x;

  xhrRequest.open("get", url1);
  console.log(url1);
  //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
  xhrRequest.send();
};

function isSafe(board, r, c, n) {
  for (var i = 0; i < 9; i++) {
    if (board[i][c] === n || board[r][i] === n) {
      return false;
    }
  }

  var sx = r - (r % 3);
  var sy = c - (c % 3);
  for (var x = sx; x < sx + 3; x++) {
    for (var y = sy; y < sy + 3; y++) {
      if (board[x][y] == n) {
        return false;
      }
    }
  }
  return true;
}

// you can make a call to changeboard(board) function to update the state on the screen
function solveSudokuHelper(board, r, c) {
  //base case
  if (r == 9) {
    changeBoard(board);
    return true;
  }

  if (c == 9) {
    return solveSudokuHelper(board, r + 1, 0);
  }
  if (board[r][c] != 0) {
    return solveSudokuHelper(board, r, c + 1);
  }

  for (var i = 1; i <= 9; i++) {
    if (isSafe(board, r, c, i)) {
      board[r][c] = i;
      var success = solveSudokuHelper(board, r, c + 1);
      if (success == true) {
        return true;
      }
      board[r][c] = 0;
    }
  }

  return false;
}

function solveSudoku(board) {
  solveSudokuHelper(board, 0, 0);
}

solve.onclick = function () {
  solveSudoku(board);
  sel.style.display = "flex";
  button.style.display = "block";
  solve.style.display = "none";
};

var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}
var sbut = document.getElementById("s-but");
function switchSheet() {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") == "light-theme.css") {
    theme.href = "dark-theme.css";
    sbut.innerHTML = "Light🌞";
  } else {
    theme.href = "light-theme.css";
    sbut.innerHTML = "Dark🌚";
  }
}
