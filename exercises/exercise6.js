let photo1;
let photo2;
let photo3;
let fade_dog = 255;
let final_fade_dog = 255;
let walk_forward = 0;
let walk_backward = 0;
let fade_to_black = 0;

function preload() {
    photo1 = loadImage('../me.png');
    photo2 = loadImage('../emma.jpg');
    photo3 = loadImage('../soph.png');
}
function setup() {
    let canvas = createCanvas(1280, 720);
    canvas.parent('sketch-holder');
    // textAlign(CENTER, CENTER);
    textSize(50);
    frameRate(10);
}
function draw() {
    background(0);

    push();
        image(photo2,-200,-30);
    pop();

    for(let offset=0;offset<photo2.width*3;offset+=photo2.width){
        push();
            scale(.3)
            image(photo2,0+offset,0);
            let tint_fade = 0;
            for(let i = 400; i<900; i+=10){
                tint_fade+=2;
                tint(255,tint_fade);
                image(photo1,i+offset+walk_forward+walk_backward,700+random(-50,50));
            }
        pop();
    }

    if(fade_dog > 0){
        push();
            for(let i=0;i<50;i++){
                //   drawRect(x, y, width, height, edgeCurve, alpha, lineWeight)
                drawRect(0,0,random(0,155),720,random(0,50),random(0,fade_dog),0);//right border
                drawRect(1200,0,random(0,155),720,random(0,50),random(0,fade_dog),0);//left border

                drawRect(0,0,1280,random(0,155),random(0,50),random(0,fade_dog),0);//top border
                drawRect(0,600,1280,random(0,155),random(0,50),random(0,fade_dog),0);//bottom border
            }
        pop();

        push();
            tint(255,fade_dog);
            scale(1);
            image(photo3,0,0);
        pop();

        fade_dog +=3;
    }else{
        fade_to_black+=5;
        fill(0,0,0,fade_to_black);
        rect(0,0,1280,720);
        if(fade_to_black >= 255){
            final_fade_dog -= 2;
            fill(255,255,255,final_fade_dog);
            text("In Loving Memory",100,300);
            push();
                tint(255,final_fade_dog);
                scale(1);
                image(photo3,0,0);
            pop();
            if(final_fade_dog < -50){
                reset();
            }
        }
    }
    
    if(walk_forward < 100){
        fade_dog -=12;
        walk_forward += 10;
    }
    if(walk_forward >= 100){
        walk_backward -= 10;
    }
    if(walk_backward <= -100){
        walk_forward = 0;
        walk_backward = 0;
    }
}

function drawRect(x,y,h,w,edge,alpha,lineWeight){
    let r = random(155);
    let g = random(155);
    let b = random(155);
    strokeWeight(lineWeight);
    fill(r,g,b,alpha);
    rect(x,y,h,w,edge);
}
function mousePressed() {
    noLoop();
}
function mouseReleased() {
    loop();
}

function reset(){
    fade_to_black = 0;
    fade_dog = 255;
    final_fade_dog = 255;
}

function keyPressed() {
    // Check if the user pressed the 's' key
    if (key === 's') {
        // Save the canvas as an image file (PNG format)
        saveCanvas('my_sketch', 'png');
    }
    if(key === 'r'){
        reset();
    }
    // Save a 5-second gif when the user presses the 's' key.
    if (key === 'g') {
      saveGif('mySketch', 5);
    }
}