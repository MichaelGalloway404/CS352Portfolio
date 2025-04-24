let img;

// Load the image and create a p5.Image object.
function preload() {
  img = loadImage('./my_p5_avatar.png');
}

function setup() {
    let canvas = createCanvas(90, 90);
    canvas.parent('sketch-holder');

  // Draw the image.
  image(img, 0, 0);

}
