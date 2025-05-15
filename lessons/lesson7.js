// Declare variables for two images
let photo;

function preload() {
    // Load both images before setup() runs
    photo = loadImage('../me1.jpg');
}
function setup() {
    let canvas = createCanvas(407, 407);
    canvas.parent('sketch-holder');
    noLoop();
}
function draw() {
    background(0);
    for(let i = 0; i<450; i+=51){
        for(let j=0; j<450;j+=51){
            // Copy a region and paste it somewhere else
            let sx = 145, sy = 135, sw = 50, sh = 50; // Source rectangle
            let dx = i, dy = j, dw = 50, dh = 50; // Destination rectangle

            // Use copy() to extract and place part of the image
            copy(photo, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }
}
function keyPressed() {
    // Check if the user pressed the 's' key
    if (key === 's' || key === 'S') {
        // Save the canvas as an image file (PNG format)
        saveCanvas('my_sketch', 'png');
    }
}