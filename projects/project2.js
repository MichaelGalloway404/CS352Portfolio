let palette;
let SquareOrCircle = [0,100];
function setup() {
    let canvas = createCanvas(500, 500);
    canvas.parent('sketch-holder');
    noLoop();                   
    rectMode(CENTER);           
    noStroke();
    palett = [color(70, 136, 149),color(70, 149, 108),color(102, 190, 145),color(169, 190, 102),color(201, 137, 77),(0),(255)]
}

function draw() {
    background(random(0, 255), random(0, 255), random(0, 255)); // full spectrum background
    let blockSize = 25;        // Size of each square block

    // major pattern in background
    drawQuiltPattern();

    // Loop over the canvas in a grid
    for (let y = -blockSize; y < height; y += blockSize) {
        for (let x = -blockSize; x < width; x += blockSize) {
            push();
            fill(0, random(0, 200), random(150, 255));
            // four rectangles to divid quilt
            // horizontal lines
            rect(0, 10, 1000, 25);
            rect(0, 490, 1000, 25);
            rect(0, 250, 1000, 25);

            // vertical lines
            rect(10, 0, 25, 1000);
            rect(490, 0, 25, 1000);
            rect(250, 0, 25, 1000);
            pop()

            push();
            
            for (let i = 0; i < 600; i += 20) {
                // full spectrum of color but dark
                fill(random(0, 155), random(0, 155), random(0, 155)); 
                // random embroidering from rectangles to circles
                // horizontal lines
                rect(i, 10, 10, 10, random(0, 5));
                rect(i, 490, 10, 10, random(0, 5));
                rect(i, 250, 10, 10, random(0, 5));

                // vertical lines
                rect(10, i, 10, 10, random(0, 5));
                rect(490, i, 10, 10, random(0, 5));
                rect(250, i, 10, 10, random(0, 5));
            }
            noStroke();
            pop()
        }
    }
}

// major quilt pattern
function drawQuiltPattern() {
    let cols = random(5, 155);
    let rows = cols;                // add for posible rectangles
    let w = width / cols;
    let h = height / rows;
    let lined = random([true,false]);
    if(lined){
        stroke(0);
    }
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let n = noise(x * 0.3, y * 0.3);        // smooth variation per block better than random
            let offset = map(n, 0, 1, -10, 40);     // greater shift from grid
            let sw = map(n, 0, 1, w - 15, w + 15);  // slight width variation perBlock
            let sh = map(n, 0, 1, h - 15, h + 15);  // slight height variation perBlock

            // fill(random(100, 200), random(50, 200), random(10, 20));
            fill(random(palett));
            rect(x * w + offset, y * h + offset, sw+random(-10,10), sh+random(-10,10), random(SquareOrCircle));
        }
    }
    noStroke();
}

function mousePressed() {
    loop();
    noLoop();
}

function keyPressed() {
    // Check if the user pressed the 's' key
    if (key === 's' || key === 'S') {
        // Save the canvas as an image file (PNG format)
        saveCanvas('my_sketch', 'png');
    }
}