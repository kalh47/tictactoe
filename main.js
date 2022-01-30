//can be any grid size and still works but playing the game is even more liekly to be a draw on larger grids
var gridSize = 3;

function createBlankGrid() {
    var container = document.createElement('div');
    container.className = 'container';
    for (var i = 0; i < gridSize; i++) {
        var line = document.createElement('div');
        line.className = 'line';
        line.id = i;
        for (var j = 0; j < gridSize; j++) {
            var cell = document.createElement('div');
            cell.row = i;
            cell.column = j;
            cell.id = i.toString() + '/' + j.toString();
            cell.addEventListener('mousedown', (e) => onMouseDown(e));
            //o starts
            cell.className = 'cell blank-o';
            line.appendChild(cell);
            if (j == gridSize-1) {
                cell.style.borderRightStyle = 'none';
            }
            if (i == gridSize-1) {
                cell.style.borderBottomStyle = 'none';
            }
        }
        container.appendChild(line);
        document.body.appendChild(container);
    }
}

function onMouseDown(event) {
    //place shape image and change all other cells for next players turn
    if (event.target.classList.contains('blank-o')) {
        var currentClass = 'blank-o';
        var shape = 'o2.png';
        var otherClass = 'blank-x';
        var shapeClass = 'o';
        var winColour = 'lightpink'
    } else if (event.target.classList.contains('blank-x')) {
        var currentClass = 'blank-x';
        var shape = 'x.png';
        var otherClass = 'blank-o';
        var shapeClass = 'x';
        var winColour = 'lightblue'
    } else {
        return
    }
    event.target.classList.remove(currentClass);
    event.target.classList.add(shapeClass);
    var img = document.createElement('img');
    img.src = shape;
    event.target.appendChild(img);
    let blanks = document.getElementsByClassName(currentClass);
    for (var i = blanks.length - 1; i >= 0; i--) {
        let cell = blanks[i]
        cell.classList.remove(currentClass);
        cell.classList.add(otherClass);
    }

    //once shape is placed check its row column and diagonal for a line
    let row = event.target.row;
    let column = event.target.column;
    let win = true;
    let winningCells = [];
    //row
    for (var i = 0; i < gridSize; i++) {
        let gridCell = document.getElementById(row+'/'+i);
        if (!gridCell.classList.contains(shapeClass)) {
            win = false;
            winningCells = [];
            break
        } else {
            winningCells.push(gridCell);
        }
    }
    if (win) {
        let blanks = document.getElementsByClassName(otherClass);
        for (var i = blanks.length - 1; i >= 0; i--) {
            let cell = blanks[i];
            cell.classList.remove(otherClass);
        }
        for (const winCell of winningCells) {
            winCell.style.background = winColour;
        }
    }
    
    //column
    win = true;
    for (var i = 0; i < gridSize; i++) {
        let gridCell = document.getElementById(i+'/'+column);
        if (!gridCell.classList.contains(shapeClass)) {
            win = false;
            winningCells = [];
            break
        } else {
            winningCells.push(gridCell);
        }
    }
    if (win) {
        let blanks = document.getElementsByClassName(otherClass);
        for (var i = blanks.length - 1; i >= 0; i--) {
            let cell = blanks[i];
            cell.classList.remove(otherClass);
        }
        for (const winCell of winningCells) {
            winCell.style.background = winColour;
        }
    }

    //diagonals
    if (row == column) {
        win = true;
        for (var i = 0; i < gridSize; i++) {
            let gridCell = document.getElementById(i+'/'+i);
            if (!gridCell.classList.contains(shapeClass)) {
                win = false;
                winningCells = [];
                break
            } else {
                winningCells.push(gridCell);
            }
        }
    }
    if (win) {
        let blanks = document.getElementsByClassName(otherClass);
        for (var i = blanks.length - 1; i >= 0; i--) {
            let cell = blanks[i];
            cell.classList.remove(otherClass);
        }
        for (const winCell of winningCells) {
            winCell.style.background = winColour;
        }
    }

    
    if (column+row == (gridSize-1)) {
        win= true;
        for (var i = 0; i < gridSize; i++) {
            let gridCell = document.getElementById(i+'/'+(gridSize-(i+1)));
            if (!gridCell.classList.contains(shapeClass)) {
                win = false;
                winningCells = [];
                break
            } else {
                winningCells.push(gridCell);
            }
        }
    } 
    if (win) {
        let blanks = document.getElementsByClassName(otherClass);
        for (var i = blanks.length - 1; i >= 0; i--) {
            let cell = blanks[i];
            cell.classList.remove(otherClass);
        }
        for (const winCell of winningCells) {
            winCell.style.background = winColour;
        }
    }

}


//Sets the mouse events needed for the exercise
function setup() {
    // document.addEventListener('mousedown', onMouseDown);
    // document.addEventListener('mouseup', onMouseUp);
    createBlankGrid();
}

window.onload = () => setup();