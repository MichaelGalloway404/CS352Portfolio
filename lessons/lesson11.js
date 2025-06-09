let myVideo;
// let tileSize = 25;
let playBtn;
let button = document.getElementById("my-play-button");
let buttonPress = 0;
let play = false;

function preload() {
    myVideo = createVideo(['../sample3.mp4']);
}

function setup() {
    let canvas = createCanvas(500, 700);
    myVideo.size(500, 700);
    canvas.parent('sketch-holder');
    myVideo.hide();
    myVideo.volume(0);

    playBtn = select('#my-play-button'); // this is a css tag ID for styling
    playBtn.mousePressed(() => {
        myVideo.play();
        play = !play;
        buttonPress++;
        if (buttonPress % 2 == 0) {
            button.innerHTML = "Play";
            pauseVideo();
        } else {
            button.innerHTML = "Pause";
            myVideo.loop();
        }
    });
}

function draw() {
    if (play) {
        // overlay a few instances of the video
        image(myVideo, 0, 0, width, height);
        image(myVideo, 0, 0, width, height / 3);

        // have one instance rotate
        push();
        translate(width / 2, height / 2);
        rotate(frameCount * 0.01);
        image(myVideo, -250, -350, 500, 700);
        pop();

        image(myVideo, 0, 0, width / 2, height);

        filter(GRAY);

        // blend for a vibrant effect
        blendMode(ADD);
        image(myVideo, 0, 0, width, height);
        blendMode(BLEND);

        // let cropped = myVideo.get(100, 100, 200, 200);
        //   image(cropped, 0, 0);

        loadPixels();
        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = 255 - pixels[i];         // Invert red channel
            pixels[i + 1] = 255 - pixels[i + 1]; // Invert green
            pixels[i + 2] = 255 - pixels[i + 2]; // Invert blue
        }
        updatePixels();
    }



    // Useful p5.MediaElement Methods
    //     video.loop() — Loop the video
    //     video.play() / video.pause() — Control playback
    //     video.volume(0.5) — Set volume
    //     video.speed(1.5) — Playback speed
    //     video.time() — Get current time
    //     video.hide() — Hide HTML element
    //     video.show() — Show HTML element again


    //   for (let y = 0; y < height; y += tileSize) {
    //     for (let x = 0; x < width; x += tileSize) {
    //       // Random chance to apply glitch to this tile
    //         let offsetX = int(random(-tileSize, tileSize));
    //         let offsetY = int(random(-tileSize, tileSize));

    //         // Copy a tile from a random position and draw it here
    //         copy(myVideo, x , y + offsetY, tileSize, tileSize, x, y, tileSize, tileSize);
    //     }
    //   }

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
