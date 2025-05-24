// Declare video variable
let myVideo;
let playBtn;
let button = document.getElementById("my-play-button");
let buttonPress = 0;

function preload() {
    myVideo = createVideo(['../sample.mp4']);
}

function setup() {
    let canvas = createCanvas(350, 200);
    canvas.parent('sketch-holder');
    myVideo.size(40, 40);
    myVideo.loop();
    myVideo.hide(); 

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
  
  
  // Overlay random flickering blocks (like Paik’s layered TV screens)
  let cols = 6;
  let rows = 4;
  let w = width / cols;
  let h = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(random(255), random(255), random(255), 150);
      noStroke();
      image(myVideo, i * w, j * h, w, h);
      rect(i * w, j * h, w, h);
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

// // Declare video variable
// let myVideo;

// function preload() {
//   myVideo = createVideo(['../sample.mp4']);
// }

// function setup() {
//   createCanvas(400, 400);
//   myVideo.size(400, 400);
//   myVideo.loop();
//   myVideo.hide();
// }

// function draw() {
//   image(myVideo, 0, 0, width, height); // Base video layer
  
//   // Overlay rotating transparent ellipses to mimic visual feedback
//   noFill();
//   stroke(255, 100);
//   translate(width / 2, height / 2);

//   for (let i = 0; i < 10; i++) {
//     rotate(frameCount * 0.01);
//     ellipse(0, 0, i * 20, i * 20);
//   }
// }