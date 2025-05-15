// Declare variables for two images
let photo1, photo2;

function preload() {
  // Load both images before setup() runs
  photo1 = loadImage('../me1.jpg');
  photo2 = loadImage('../me2.jpg');
}
function setup() {
    let canvas = createCanvas(300, 300);
    canvas.parent('sketch-holder');
}

function draw() {
  image(photo1, 0, 0, photo1.width, photo1.height); // Draw the first image at its native size
  tint(255, 27); // Apply a semi-transparent tint (alpha = 127) to the second image
  image(photo2, 20, 10, photo2.width, photo2.height); // Draw the second image on top at its native size
}

function keyPressed() {
    // Check if the user pressed the 's' key
    if (key === 's' || key === 'S') {
      // Save the canvas as an image file (PNG format)
      saveCanvas('my_sketch', 'png');
    }
  }