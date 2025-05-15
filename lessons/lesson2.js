let sc_width = 400;
let sc_height = 400;
function setup() {
  let canvas = createCanvas(sc_width, sc_height);
  canvas.parent('sketch-holder');
  background(0, 190, 255);
  stroke(0);
  noLoop(); 
 }

function draw() {
  for (let i = 10; i < sc_width*2; i += 10){
    line(0, i, i, 10);
  }
  for (let i = 10; i < sc_width*2; i += 10){
    line(10, i, i, 0);   
  }
  for (let i = 10; i < sc_width*2; i += 10){
    line(i, 0, 0, i);
  }
}
function keyPressed() {
    // Check if the user pressed the 's' key
    if (key === 's' || key === 'S') {
      // Save the canvas as an image file (PNG format)
      saveCanvas('my_sketch', 'png');
    }
  }