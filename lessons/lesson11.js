let myVideo;
let tileSize = 25;
let playBtn;
let button = document.getElementById("my-play-button");
let buttonPress = 0;


let frames = [];
let frameIndex = 0;

function preload() {
    myVideo = createVideo(['../sample3.mp4']);
}

function setup() {
    // for reverse
    // Once video metadata is loaded (duration, etc.)
  myVideo.onloadedmetadata = () => {
    myVideo.volume(0);         // Mute the video
    // myVideo.speed(0);          // Pause it by setting speed to 0
    // myVideo.play();            // Start playback briefly (needed to grab frames)
  };



    let canvas = createCanvas(640, 480);
    myVideo.size(640, 480);
    canvas.parent('sketch-holder');
    myVideo.loop();
    myVideo.hide(); 
    // myVideo.showControls();
    noStroke();
    // frameRate(3);

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
image(myVideo, 0, 0, width,height);
//     We only draw if frames have been captured.
// frameIndex counts backward through the frames.
// When frameIndex goes below 0, we loop it back to the end to repeat the reverse loop.
    // for reverse
    if (frames.length > 0) {
    image(frames[frameIndex], 0, 0, width, height);  // Draw the current frame
    frameIndex--;  // Move backwards

    // Loop back to the end when we reach the start
    if (frameIndex < 0) frameIndex = frames.length - 1;
  }
//   frames = [];
  if (frames.length < 1160) {            // Limit frames (avoid memory overload)
            frames.push(myVideo.get());            // Grab the current video frame and store it
            console.log(myVideo.get().length)
    }
    
// //   background(0);


// filter(GRAY);

//  ellipse(mouseX, mouseY, 50, 50); // Red translucent circle follows mouse

// blendMode(ADD); // Try MULTIPLY, SCREEN, etc.
//   fill(0, 0, 255, 100);
//   rect(100, 100, 200, 200);
//   blendMode(BLEND); // Reset to default

// background(0);
//   push();
//   translate(width / 2, height / 2);
//   rotate(frameCount * 0.01);
//   image(myVideo, -160, -120, 320, 240);
//   pop();

// let cropped = vid.get(100, 100, 200, 200);
//   image(cropped, 0, 0);

//  loadPixels();
//   for (let i = 0; i < pixels.length; i += 4) {
//     pixels[i] = 255 - pixels[i];     // Invert red channel
//     pixels[i+1] = 255 - pixels[i+1]; // Invert green
//     pixels[i+2] = 255 - pixels[i+2]; // Invert blue
//   }
//   updatePixels();


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

    // if(key ==='x'){
    //     // Clicking the canvas captures the current video frame using vid.get().
    //     // Each captured frame is an image stored in the frames array.
    //     // We're limiting to 60 frames here to avoid memory issues, but you can adjust this.
    //     // reverse
    //     if (frames.length < 560) {            // Limit to 60 frames (avoid memory overload)
    //         frames.push(myVideo.get());            // Grab the current video frame and store it
    //     }
    // }
}
function keyReleased() {
    if(key ==='x'){
        // Clicking the canvas captures the current video frame using vid.get().
        // Each captured frame is an image stored in the frames array.
        // We're limiting to 60 frames here to avoid memory issues, but you can adjust this.
        // reverse
        if (frames.length < 560) {            // Limit to 60 frames (avoid memory overload)
            frames.push(myVideo.get());            // Grab the current video frame and store it
        }
    }
}