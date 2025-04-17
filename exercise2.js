let offset_x = 200;
let offset_y = 200;

let Q_offset_x = 50;
let Q_offset_y = 50;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder'); // Attach the canvas to a specific div
  frameRate(1);
}

function draw() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  background(color(r,g,b));

  push();
  r = random(255);
  g = random(255);
  b = random(255);
    fill(color(r,g,b));
    circle(offset_x+20+random(50), offset_y+20+random(50), 100);
  push();
    r = random(255);
    g = random(255);
    b = random(255);
    fill(color(r,g,b));
    circle(offset_x-20+random(60), offset_y-20+random(60), 100);
  pop();
  push();
    r = random(255);
    g = random(255);
    b = random(255);
    fill(color(r,g,b));
    circle(offset_x+40+random(60), offset_y+40+random(60), 100);
  pop();
  
  push()
  strokeWeight(5);
    fill('rgb(241,5,5)')
    if(frameCount < 10){
      square(290, 30, frameCount * 10);
    }else{
      square(290, 30, random(90,100));
    }
  pop()
  push()
  strokeWeight(random(10));
    r = random(255);
    g = random(255);
    b = random(255);
      fill(color(r,g,b));
    quad(Q_offset_x+random(160), Q_offset_x+random(160), Q_offset_x+random(160), Q_offset_x+random(160),Q_offset_x+random(160), Q_offset_x+random(160), Q_offset_x+random(160), Q_offset_x)+random(160);
  pop()
}
function mousePressed() {
  frameRate(2);
}
function mouseReleased() {
  frameRate(0);
}
// This function is triggered automatically whenever a key is pressed
function keyPressed() {
  // Check if the user pressed the 's' key
  if (key === 's' || key === 'S') {
    // Save the canvas as an image file (PNG format)
    // The first argument is the filename (without extension)
    saveCanvas('my_sketch', 'png');
  }
}
