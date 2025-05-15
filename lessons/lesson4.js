function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    frameRate(5);
}

function draw() {
    background(240);
    // columns
    for (let i = 0; i < 400; i += 15) {
        // rows
        for (let j = 0; j < 400; j += 15) {
            let r = random(255);
            let g = random(255);
            let b = random(255);
            fill(color(r, g, b));
            rect(i, j, 10, 10);
        }
    }
}
function keyPressed() {
    // Check if the user pressed the 's' key
    if (key === 's' || key === 'S') {
        // Save the canvas as an image file (PNG format)
        saveCanvas('my_sketch', 'png');
    }

    // Save a 5-second gif when the user presses the 's' key.
    if (key === 'g' || key === 'G') {
        saveGif('mySketch', 5);
    }
}