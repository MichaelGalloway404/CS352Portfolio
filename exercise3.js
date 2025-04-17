let y_offset = 0;
let width_offset = 0;

function setup() {
    let canvas = createCanvas(590, 550);
  canvas.parent('sketch-holder');
    frameRate(5);
  }
  
  function draw() {
    background(240);
    
    if (frameCount % 2 == 0){
        // columns
        for (let i = 0; i < 600; i += 20) {
            // rows
            for (let j = 0; j < 600; j += 150){
                fill('black');
                rect(i, j, 10, 100);
                rect(1, j+50, 1000, 10);
            }
        }
        // diagonal row
        for (let i = 0; i < 600; i += 20) {
            fill('black');
            rect(i, i, 10, 100);
        }
    }else{
        y_offset += 1;
        width_offset += 2;
        if(y_offset == 25){
            y_offset = 5;
            width_offset = 10;
        }
        // columns
        for (let i = 0; i < 600; i += 20) {
            // rows
            for (let j = 0; j < 600; j += 150){
                fill('black');
                rect(i, j, 10, 100);
                rect(0, j+50-y_offset, 1000, 10+width_offset);
            }
        }
        // diagonal row
        for (let i = 0; i < 600; i += 20) {
            fill('black');
            rect(i, i, 10, 100);
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
    if (key === 'g' || key ==='G') {
      saveGif('mySketch', 5);
    }
  }