// Declare video variable
let myVideo;
let playBtn;
let addColors = false;
let button = document.getElementById("my-play-button");
let buttonPress = 0;

function preload() {
    // Load the video inside preload() to ensure it's ready before setup()
    myVideo = createVideo(['../sample.mp4']);
    // myVideo.volume(0); // or video.muted = true;
    // myVideo.play();
}

function setup() {
    let canvas = createCanvas(350, 200);
    canvas.parent('sketch-holder');
    


    // canvas.hide();
    myVideo.size(40, 40);
    myVideo.loop();
    myVideo.hide(); // hides default video element

    playBtn = select('#my-play-button');
    playBtn.mousePressed(() => {
        // canvas.show();
        addColors = true;
        myVideo.play();
        buttonPress++;
        if (buttonPress % 2 == 0) {
            button.innerHTML = "Play";
            addColors = false;
            pauseVideo();
        } else {
            button.innerHTML = "Pause";
            addColors = true;
            myVideo.play();
        }
    });
    

    // playButton = createButton('Play Video');
    // playButton.position(0, 0);
    // playButton.mousePressed(playVideo);
    // playButton.class('my-play-button'); // Add your custom CSS class

}

function draw() {
    // Draw the video on the canvas
    image(myVideo, 0, 0, width, height);
    drawGrid();
}

function drawGrid() {
    for (let i = 0; i < 210; i+=10) {
        for (let j = 0; j < 360; j+=10) {
            fill(0);
            rect(0, i, 350, 1);
            rect(j, 0, 1, 200);
        }
    }
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