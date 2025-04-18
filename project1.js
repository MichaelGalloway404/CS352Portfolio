// prevent 'c' key press from generating more than one image
let canLoop = true;

// variables for random rect width and height
let rectHeight = 0;
let rectWidth = 0;

// variabels for range of size the rectangles are allowed to be
let RECT_MIN_W = 25;
let RECT_MAX_W = 200;
let RECT_MIN_H = 25;
let RECT_MAX_H = 200;

// random upper bounds of rect stroke weight
let STROKE_MAX = 10;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
  }
  
  function draw() {
    // placing no loop here allows for one image to generate then pause
    noLoop();

    background(color('black'));
    // variable for random color selection, with a slightly higher chance of white
    let colors = [color('red'),color('yellow'),color('blue'),color('white'),color('white')];
      
    // start by offseting screen to give a feel that there is more out of view
    for(let i = -200; i < width; i += rectWidth){
      rectWidth = random(RECT_MIN_W,RECT_MAX_W);
      strokeWeight(random(STROKE_MAX));
      for (let j = -200; j < width; j += rectHeight){
        // fill with one of four random colors
        fill(color(colors[Math.floor(random(5))]));
        // make it only about a 5% chance that a rectangle will be black
        let rand = random(100);
        if(rand < 95){
          rectHeight = random(RECT_MIN_H,RECT_MAX_H);

          // place a rect at possition i/j which is the last random rectWidth/rectHeight
          // this will nicely aline all shapes, I then shrink each rect by STROKE_MAX
          // to prevent any overlapping of lines and shapes.
          rect(i,j,rectWidth-STROKE_MAX,rectHeight-STROKE_MAX);
        }
      }
    }   
  }

  

// function to save image as png
function keyPressed() {
  // Check if the user pressed the 's' key
  if (key === 's' || key === 'S') {
    // Save the canvas as an image file (PNG format)
    saveCanvas('my_sketch', 'png');
  }
  if(key === 'c' || key === 'C'){
    // only loop if canLoop has been reset by releasing the 'c' key
    if(canLoop){
      loop();
      canLoop = false;
    }
    // turn looping back off
    noLoop();
  }
}

// function to reset were image can be generated
function keyReleased() {
  if(key === 'c' || key === 'C'){
    canLoop = true;
  }
}