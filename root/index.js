const board = document.getElementById("board");
const squares = document.getElementsByClassName("square");
const players = ["X", "O"];
let currentPlayer = players[0];
const endMessage = document.createElement("h2");
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = "30px";
endMessage.style.textAlign = "center";
board.after(endMessage);
var someoneWon = false;
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let i = 0; i < squares.length; i++) {

  squareMouseEventListeners(i);

  squares[i].addEventListener("click", () => {
    if (someoneWon) return;
    if (squares[i].textContent !== currentPlayer ||
        (squares[i].textContent === currentPlayer && pickedSquares(i))
    ) {
      return;
    }
    setSquareState(i);
    if (checkWin(currentPlayer)) {
      someoneWon = true;
      shootConfetti()
      endMessage.textContent = `Game over! ${currentPlayer} wins!`;
      return;
    }
    if (checkTie()) {
      someoneWon = true;
      endMessage.textContent = `Tie Game! Click restart to play again`;
      return;
    }
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    if (currentPlayer == players[0]) {
      endMessage.textContent = `X's turn!`;
    } else {
      endMessage.textContent = `O's turn!`;
    }
  });
}

function checkWin(currentPlayer) {
  for (let i = 0; i < winning_combinations.length; i++) {
    const [a, b, c] = winning_combinations[i];
    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function restartButton() {
  someoneWon = false;
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
    squares[i].style.backgroundColor = "rgba(0,0,0,0.10)";
  }
  endMessage.textContent = `X's turn!`;
  currentPlayer = players[0];
}
function squareMouseEventListeners(position) {
  squares[position].addEventListener("mouseover", () => {
    if(someoneWon) return
    if (squares[position].textContent === "" ) {
        squares[position].style.backgroundColor = "rgba(0,0,0,0.3)"
      squares[position].textContent = currentPlayer;
    }
  });

  squares[position].addEventListener("mouseout", () => {
    if(squares[position].textContent === currentPlayer && !pickedSquares(position)){
        squares[position].style.backgroundColor = "rgba(0,0,0,0.1)"
        squares[position].textContent = "";
    }
  });
} 
function setSquareState(position) {
  // Set player
  squares[position].textContent = currentPlayer;
  // Set square color
  squares[position].style.backgroundColor =
    currentPlayer === "X" ? "lightskyblue" : "lightcoral";
}

function pickedSquares(position) {
    return squares[position].style.backgroundColor === "lightcoral" || squares[position].style.backgroundColor === "lightskyblue";
} 

function shootConfetti(){
  var scalar = 5;
  var winner = confetti.shapeFromText({
     text: currentPlayer,
     color: currentPlayer === 'X' ? '#73a8c9' : '#ba6666',
     fontFamily: "Audiowide",
     scalar });

  confetti({
    particleCount: 150,
    startVelocity: 30,
    spread: 360,
    shapes: [winner],
    scalar,
    
  });
}
