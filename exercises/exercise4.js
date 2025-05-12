let lyrics = `Trouble, oh, trouble, set me free I have seen 
your face and it's too much, too much for me Trouble, oh, trouble, 
can't you see? You're eatin' my heart away and there's nothing much 
left of me

I've drunk your wine, you have made your world mine
So won't you be fair? So won't you be fair?
I don't want no more of you, so won't you be kind to me?
Just let me go where, I'll have to go there

Trouble, oh, trouble, move away
I have seen your face and it's too much for me today
Trouble, oh, trouble, can't you see?
You have made me a wreck, now won't you leave me in my misery

I've seen your eyes and I can see death's disguise
Hangin' on me, hangin' on me
I'm beat, I'm torn, shattered and tossed and worn
Too shocking to see, too shocking to see`

let incrementer = 19;
let fade = 255;
function setup() {
    let canvas = createCanvas(590, 550);
    canvas.parent('sketch-holder');
  
    background(0);
    fill(255, 220, 150);  
    frameRate(10);
  }
function draw(){
    let r = random(255);
    let g = random(255);
    let b = random(255);

    incrementer+=.05;
    // only change stroke color on reset
    if(incrementer > 17){
        incrementer=10;
        fill(0);
        stroke(color(r,g,b));
    }

    // spawn bubbles
    if(incrementer<18){
        for(let i = 0; i < 10; i++){
            createBubble(fade,random(width),random(height),r,g,b);
        }
    }

    // apla fade for bubbles
    fade -= 10;
    if(fade < 0 ){
        fade=255
    }
    
    // grow text
    textSize(incrementer);
    text(lyrics, 60, 60);
    strokeWeight(6);
}

// creates random bubbles
function createBubble(fade,x,y,r,g,b){
    push()
        let alpha = fade;
        noStroke();
        fill(r,g,b, alpha);
        ellipse(x, y, incrementer*random(6));
    pop();
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