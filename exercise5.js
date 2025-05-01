let backgroundColor;
let faceColor;
let textColor;
let wink = false;
let winkTimer = 0;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    textAlign(CENTER, CENTER);
    generateLogo();
}

function draw() {
    background(backgroundColor);
    drawFace();

    stroke(0);
    strokeWeight(2);
    fill(textColor);
    textFont('Helvetica');
    textSize(50);
    text("Big Smiles Inc.", width / 2, height / 2 + 100);

    textFont('Courier New');
    textSize(22);
    fill(textColor);
    text(": Making Smiles Happen :", width / 2, height / 2 + 140);

    // wink timing
    if (wink) {
        winkTimer--;
        // reset on mouse release
        if (winkTimer <= 0) {
            wink = false;
        }
    }
}

function drawFace() {
    push();
    translate(width / 2, height / 2 - 40);

    // Head
    fill(faceColor);
    ellipse(0, 0, 200, 200);

    // fill Eyes
    fill(0, 100);
    // Left eye
    ellipse(-40, -30, 20, 20); 

    if (wink) {
        stroke(0);
        strokeWeight(3);
        // Winking with right eye
        line(30, -30, 50, -30); 

        // mouth bottom
        // noFill();
        stroke(0, 150);
        strokeWeight(2);
        arc(0, 20, 80, 40, 0, PI);
        
        // mouth top
        noFill();
        stroke(0, 150);
        strokeWeight(2);
        arc(0, 20, 80, .5, 0, PI);

    } else {
        // default right eye
        ellipse(40, -30, 20, 20); 

        // mouth closed
        noFill();
        stroke(0, 150);
        strokeWeight(3);
        arc(0, 20, 80, 40, 0, PI);

    }
    pop();
}

function generateLogo() {
    faceColor = color(random(200, 255), random(150, 200), random(100, 255));
    textColor = color(random(200, 255), random(150, 200), random(150, 255));
    backgroundColor = color(random(100, 255), random(150, 200), random(150, 255));
}

function mousePressed() {
    // get new colors
    generateLogo();    
    wink = true;
    winkTimer = 30;
    loop();            
}

function keyPressed() {
    if (key === 's' || key === 'S') {
        saveCanvas('stylized_face_logo', 'png');
    }
    // Save a 5-second gif when the user presses the 's' key.
    if (key === 'g' || key ==='G') {
        saveGif('mySketch', 5);
    }
}
function mouseReleased() {
    if (!wink) {
        noLoop(); // Stop animation once wink is over
    }
}
