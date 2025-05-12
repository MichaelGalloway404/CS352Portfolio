// Declare variables for two images
let photo1, photo2;

function preload() {
  // Load both images before setup() runs
  photo1 = loadImage('../mikeNemma.jpg');
}
function setup() {
    let canvas = createCanvas(300, 400);
    canvas.parent('sketch-holder');
    frameRate(1);
}
function draw() {
  image(photo1, 0, 0, width, height); // Draw the second image on top with transparency
  // Loop 100 times to draw small random pieces of the photo
  for (let i = 0; i < 25; i++) {
    
    tint(255, 205); // Apply a semi-transparent tint (alpha = 127) to the second image
    let sx = int(random(photo1.width)); // Random source x position in the photo
    let sy = int(random(photo1.height)); // Random source y position in the photo
    let sw = int(random(10, 150)); // Random source width between 10 and 150 pixels
    let sh = int(random(10, 150)); // Random source height between 10 and 150 pixels
    let dx = int(random(width)); // Random destination x on the canvas
    let dy = int(random(height)); // Random destination y on the canvas

    // Draw a random fragment of the photo at a random position on the canvas
    image(photo1, dx, dy, sw, sh, sx, sy, sw, sh);
    fill(144,255,255,22);
    rect(0,0,300,400);
  }
}

function keyPressed() {
    // Check if the user pressed the 's' key
    if (key === 's' || key === 'S') {
      // Save the canvas as an image file (PNG format)
      saveCanvas('my_sketch', 'png');
    }

    // Save a 5-second gif when the user presses the 's' key.
    if (key === 'g' || key ==='G') {
      saveGif('mySketch', 5);
    }
  }