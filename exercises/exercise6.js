let photo_me;
let photo_emma;
let photo_sophia;
let photo_sophia_small;
let fade_dog = 255;
let final_fade_dog = 0;
let walk_forward = 0;
let walk_backward = 0;
let fade_to_black = 0;
let fade_start_timer = 0;

function preload() {
    photo_me = loadImage('../me.png');
    photo_emma = loadImage('../emma.jpg');
    photo_sophia = loadImage('../soph.png');
    photo_sophia_small = loadImage('../soph.png');
}
function setup() {
    let canvas = createCanvas(1280, 720);
    canvas.parent('sketch-holder');
    textSize(50);
    frameRate(10);
}
function draw() {
    background(0);
    fade_start_timer++;

    // overall background image
    push();
    image(photo_emma, -200, -30);
    pop();

    // three instances of background offest by their width
    for (let offset = 0; offset < photo_emma.width * 3; offset += photo_emma.width) {
        push();
        // start screen shake when dog starts to fade
        if (fade_start_timer > 100) {
            scale(.3);
            image(photo_emma, 0 + offset + random(-50, 50), random(-50, 450));
        } else {
            scale(.3);
            image(photo_emma, 0 + offset, 0);
        }
        // snaking picture of myself
        for (let i = 400; i < 900; i += 10) {
            // random tint
            tint(255, random(0,200));
            if (fade_start_timer > 100) {
                // 3 instances of 50 images of me that move forward/backward, when dog starts to fade they get more random
                scale(random(.5,2)); // alter end scene scale
                image(photo_me, i + offset + random(-fade_start_timer * 5, fade_start_timer * 5), 700 + random(-fade_start_timer * 5, fade_start_timer * 5));
            } else {
                image(photo_me, i + offset + walk_forward + walk_backward, 700 + random(-50, 50));
            }
        }
        pop();
    }

    // if dog is still on screen
    if (fade_dog > 0) {
        push();
        // random colorfull border from rectangles
        for (let i = 0; i < 50; i++) {
            //   drawRect(x, y, width, height, edgeCurve, alpha, lineWeight)
            drawRect(0, 0, random(0, 155), 720, random(0, 50), random(0, fade_dog), 0);//right border
            drawRect(1200, 0, random(0, 155), 720, random(0, 50), random(0, fade_dog), 0);//left border

            drawRect(0, 0, 1280, random(0, 155), random(0, 50), random(0, fade_dog), 0);//top border
            drawRect(0, 600, 1280, random(0, 155), random(0, 50), random(0, fade_dog), 0);//bottom border
        }
        pop();

        push();
        // pulsing fade of sophia
        tint(255, fade_dog);
        photo_sophia_small.resize(130, 0);
        image(photo_sophia_small, 450, 420);
        pop();

        // waiting before fading dog and border
        if (fade_start_timer > 50) { 
            // for pulse effect always try to increment by 3
            // while bellow at intervals it will be decremented by 12
            // eventualy disappearing
            fade_dog += 3; 
        }
    } 
    else { // after dog and border are gone start fading to black
        fade_to_black += 3;
        fill(0, 0, 0, fade_to_black);
        rect(0, 0, 1280, 720);
        // when screen is fully black start fading in memorial screedn
        if (fade_to_black >= 255) {
            final_fade_dog += 1;
            fill(255, 255, 255, final_fade_dog);
            text("In Loving Memory\n    of this little\n      chunck", 100, 300);
            push();
            tint(255, final_fade_dog);
            photo_sophia.resize(600, 0);
            image(photo_sophia, 450, 50);
            pop();
            // reset after after a while
            if (final_fade_dog > 300) {
                reset();
            }
        }
    }

    if (walk_forward < 200) {
        // waiting to start dog and boreder fade
        if (fade_start_timer > 50) { 
            fade_dog -= 12; 
        }
        // move forward at random speed
        walk_forward += random(5,50);
    }
    // if image of me walks to far forward go back
    if (walk_forward >= 200) {
        // move backward at random speed
        walk_backward -= random(5,50);
    }
    // if image walks to far back reset process
    if (walk_backward < -200) {
        walk_forward = 0;
        walk_backward = 0;
    }
}

// function for easily making random rect with color strokeWeight alpha ect...
function drawRect(x, y, h, w, edge, alpha, lineWeight) {
    let r = random(155);
    let g = random(155);
    let b = random(155);
    strokeWeight(lineWeight);
    fill(r, g, b, alpha);
    rect(x, y, h, w, edge);
}

// pause on mouse press
function mousePressed() {
    noLoop();
}
function mouseReleased() {
    loop();
}

function reset() {
    fade_start_timer = 0;
    fade_to_black = 0;
    fade_dog = 255;
    final_fade_dog = 0;
}

function keyPressed() {
    // Check if the user pressed the 's' key
    if (key === 's') {
        // Save the canvas as an image file (PNG format)
        saveCanvas('my_sketch', 'png');
    }
    if (key === 'r') {
        reset();
    }
    // Save a 5-second gif when the user presses the 's' key.
    if (key === 'g') {
        saveGif('mySketch', 5);
    }
    // full screen
    if(key === 'f'){
        let fs = fullscreen();
        fullscreen(!fs); // Toggle fullscreen mode
    }
}