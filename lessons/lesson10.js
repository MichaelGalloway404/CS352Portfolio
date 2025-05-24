let myVideo;
let img;
let playBtn;
let button = document.getElementById("my-play-button");
let buttonPress = 0;

function preload() {
    myVideo = createVideo(['../sample2.mp4']);
    img = loadImage('../overlayYellowFace.png'); // Load a transparent image to overlay
}

function setup() {
    let canvas = createCanvas(200, 200);
    canvas.parent('sketch-holder');
    myVideo.loop();
    myVideo.hide(); 
    frameRate(5);

    playBtn = select('#my-play-button'); // this is a css tag ID for styling
    playBtn.mousePressed(() => {
        myVideo.play();
        buttonPress++;
        if (buttonPress % 2 == 0) {
            button.innerHTML = "Play";
            pauseVideo();
        } else {
            button.innerHTML = "Pause";
            myVideo.play();
        }
    });
}

function draw() {
  image(myVideo, 0, 0, random(150,width), random(150,height));

  blendMode(ADD); // Set blend mode for light effect
    image(img, -5,-5,150,200);
  
  blendMode(BLEND); // Reset to default blend mode
  let r = random(255);
  let g = random(255);
  let b = random(255);
  fill(r,g,b,50);
  rect(0,0,200,200);
}

function pauseVideo() {
    myVideo.pause();
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