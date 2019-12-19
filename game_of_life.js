const WIDTH = 700;
const HEIGHT = 1400;
let grid;
let cols;
let rows;
let res = 10;

function makeGrid(cols, rows){
    let arr = new Array(cols)
    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(HEIGHT, WIDTH);
    cols = HEIGHT / res;
    rows = WIDTH / res;
  
    grid = makeGrid(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}
  
//need to fix the updating of the grid its way too fast and some other things(peer count)
function draw() {
    background(0);
    let nextGrid = makeGrid(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
        let x = i * res;
        let y = j * res;
        if (grid[i][j] == 1) {
          rect(x, y, res, res);
          fill(255);
        }
      }
    }
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j]
            let peers = countPeers(grid, i, j)
            
            if(state == 0 && peers == 3){
                nextGrid[i][j] = 1;
            }else if(state == 1 && peers < 2){
                nextGrid[i][j] = 0;
            }else if(state == 1 && peers > 3){
                nextGrid[i][j] = 0;
            }else if(peers == 2 && state == 1){
                nextGrid[i][j] = 1;
            }else if(peers == 3 && state == 1){
                nextGrid[i][j] = 1;
            }
        }
    }
    grid = nextGrid;
}
  

//consider edges of arr and do not count myself as peer
function countPeers(grid, x, y){
    let peers = 0;
    for (let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            /*if(x+i > 0 && x+i < cols && y+j > 0 && y+j < rows){
                if(grid[x+i][j+y] == 1 && x+i != x && j+y != y){
                    peers++;
                }
            }*/
            if(x+i > 0 && x+i < cols && y+j > 0 && y+j < cols){
                if(grid[x+i][j+y] == 1 && x+i != x && j+y != y){
                    peers++;
                }
            }
        }
    }
    return peers
}