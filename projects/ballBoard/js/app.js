const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
const GLUE_IMG = '🧲';

// Model:
var gBoard;
var gGamerPos;
var gEmptyCells;
var gIntervalBall;
var gBallOnBoard;
var gCollected;
var gSound = new Audio('../audio/Fruit.mp3');
var gIsGlued;


function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBallOnBoard = 2;
	gCollected = 0;
	gBoard = buildBoard();
	renderBoard(gBoard);
	setTimeout(function() {
		gIntervalBall = setInterval(() => {
			addBalls();
		}, 3000);
		addGlue(getEmptyCells());
	}, 3000)
}

// Create the Matrix 10 * 12 
function buildBoard() {
	var board = createMat(10, 12);
	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			if (i === 0 || i === board.length - 1 ||
				j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
				if (i === 0 && j === 5) cell.type = FLOOR;
				else if (i === 9 && j === 5) cell.type = FLOOR;
				else if (i === 5 && j === 0) cell.type = FLOOR;
				else if (i === 5 && j === 11) cell.type = FLOOR;
			}
			board[i][j] = cell;
		}
	}
	// Place the gamer and two balls
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	board[2][6].gameElement = BALL;
	board[3][8].gameElement = BALL;
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j });

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';


			strHTML += `\t<td class=" cell ${cellClass}" onclick="moveTo(${i},${j})" >\n`;

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
	if (gIsGlued) return
	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 0 && jAbsDiff === 11) || (iAbsDiff === 9 && jAbsDiff === 0) || (iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		if (targetCell.gameElement === BALL) {
			gCollected++;
			var elCollected = document.querySelector('.collected');
			elCollected.innerText = `${gCollected}`
			gSound.play();
			gBallOnBoard--;
		}
		if (targetCell.gameElement === GLUE) {
			gIsGlued = true
			setTimeout(function () {
				gIsGlued = false
			}, 3000)
		}

		// Move the gamer
		// MODEL
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		gBoard[i][j].gameElement = GAMER;

		// DOM
		renderCell(gGamerPos, '');
		gGamerPos = { i: i, j: j };
		renderCell(gGamerPos, GAMER_IMG);

	} else console.log('TOO FAR', iAbsDiff, jAbsDiff);
	checkVictory();
}

function checkVictory() {
	if (!gBallOnBoard) gameOver();
}
// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location);
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			if (j === 0) {
				moveTo(i, j + 11);
			} else {
				moveTo(i, j - 1);
			}
			break;
		case 'ArrowRight':
			if (j === 11) {
				moveTo(i, j - 11);
			} else {
				moveTo(i, j + 1);
			}
			break;
		case 'ArrowUp':
			if (i === 0) {
				moveTo(i + 9, j);
			} else {
				moveTo(i - 1, j);
			}
			break;
		case 'ArrowDown':
			if (i === 9) {
				moveTo(i - 9, j);
			} else {
				moveTo(i + 1, j);
			}
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function getEmptyCells() {
	gEmptyCells = [];
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			var targetCell = gBoard[i][j];
			if (targetCell.type === FLOOR && targetCell.gameElement === null) {
				targetCell['i'] = i;
				targetCell['j'] = j;
				gEmptyCells.push(targetCell);
			}
		}
	}
	return gEmptyCells;
}

function addBalls() {
	var emptyCells = getEmptyCells()
	var targetCell = emptyCells[getRandomInt(0, emptyCells.length - 1)];
	targetCell.gameElement = BALL;
	var pos = { i: targetCell.i, j: targetCell.j };
	renderCell(pos, BALL_IMG);
	gBallOnBoard++;
}

function addGlue(emptyCells) {
	gIntervalGlue = setInterval(function () {
		var targetCell = emptyCells[getRandomInt(0, emptyCells.length - 1)];
		targetCell.gameElement = GLUE;
	
		var pos = { i: targetCell.i, j: targetCell.j };
		renderCell(pos, GLUE_IMG);
	}, 5000);

}

// When gamer collects all balls – game over 
function gameOver() {
	clearInterval(gIntervalBall);
	clearInterval(gIntervalGlue);
	var elGameOver = document.querySelector('.game-over-container');
	elGameOver.style.display = 'flex';
	var elGameBoard = document.querySelector('.game-board-container');
	elGameBoard.style.display = 'none';
}

// restart the game by clicking a Restart button
function restartGame() {
	var elGameOver = document.querySelector('.game-over-container');
	elGameOver.style.display = 'none';
	var elGameBoard = document.querySelector('.game-board-container');
	elGameBoard.style.display = 'flex';
	initGame();
}
