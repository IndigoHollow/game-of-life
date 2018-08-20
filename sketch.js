function create2Darray(cols, rows) {
  let arr = new Array(cols);

  for(let i=0; i<arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

let currentGrid,
    futureGrid,
    cols,
    rows;

const SCL = 20;

function setup() {
  createCanvas(600, 400);

  cols = width / SCL;
  rows = height / SCL;
  currentGrid = create2Darray(cols, rows);

  //fill array(grid) with random dead/alive cells
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      currentGrid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  //draw dead and alive cells on the canvas
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      let x = i * SCL,
          y = j * SCL;

      if(currentGrid[i][j]) {
        fill(255);
        rect(x, y, SCL-1, SCL-1);
      }
    }
  }

  nextGrid = create2Darray(cols,rows);

  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      nextGrid[i][j] = currentGrid[i][j];
      
      let cell = currentGrid[i][j],
          neighbors = countNeighbors(currentGrid, i, j);

      //cover 3 of 4 rules of the Game of life
      if(cell == 0 && neighbors == 3) {
        nextGrid[i][j] = 1;
      } else if(cell == 1 && (neighbors > 3 || neighbors < 2)) {
        nextGrid[i][j] = 0;
      }
    }
  }

  currentGrid = nextGrid;
}

//count neighbors of the cell
function countNeighbors(grid, x, y) {
  let sum = 0;
  
  for(let i=-1; i<2; i++) {
    for(let j=-1; j<2; j++) {
      //if the neighbor of the cell hits the end of the board => replace him on the other end of the board
      let col = (x + i + cols) % cols,
          row = (y + j + rows) % rows;

      sum += grid[col][row]; //if neighbor is alive => increase the sum
    }
  }

  sum -= grid[x][y]; //remove the cell we are counting neighbors of
  return sum;
}