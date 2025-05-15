function setup() {
    let canvas = createCanvas(390, 200);
    canvas.parent('sketch-holder');
    frameRate(5);
  }
  
  function draw() {
    background(color(255,255,55));
    for (let i = 0; i < 400; i += 10) {            
      let r = random(255);
      let g = random(255);
      let b = random(255);
      fill(color(r,g,b));
      triangle(i, 100, i, 200, 200, 0);
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