let up = 0;
let isUp = false;
let down = 0;
let isDown = false;
let right = 0;
let isRight = false;
let left = 0;
let isLeft = false;
let walk1 = '||';
let walk2 = '| |'; 
let step = 0;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    textAlign(CENTER, CENTER);
    textSize(50);
}

function draw() {
  background(240);

  if(isUp){
    up -= 10;
    step++;
  }else{
    up = up;
  }

  if(isDown){
    down += 10;
    step++;
  }else{
    down = down;
  }

  if(isRight){
    right += 10;
    step++;
  }else{
    right = right;
  }

  if(isLeft){
    left -= 10;
    step++;
  }else{
    left = left;
  }


  if(step%2 == 0){
    // Display the currently selected letter
    text("_\n{O_O}\n--|__|--\n"+walk1, (width / 2)+right+left, (height / 2)+up+down);
  }else{
    // Display the currently selected letter
    text("_\n{O_O}\n--|__|--\n"+walk2, (width / 2)+right+left, (height / 2)+up+down);
  }
  
}

// This function runs whenever a key is pressed
function keyPressed() {
  if(key === "w" || key === "W"){
    isUp = true;
  }
  if(key === "s" || key === "S"){
    isDown = true;
  }
  if(key === "a" || key === "A"){
    isLeft = true;
  }
  if(key === "d" || key === "D"){
    isRight = true;
  }
}
function keyReleased() {
  if(key === "w" || key === "W"){
    isUp = false;
  }
  if(key === "s" || key === "S"){
    isDown = false;
  }
  if(key === "a" || key === "A"){
    isLeft = false;
  }
  if(key === "d" || key === "D"){
    isRight = false;
  }
}