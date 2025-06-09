let robotX = 200;
let robotY = 300;
let velocityY = 0;
let gravity = 0.5;
let jumpForce = -10;
let onGround = false;
let speed = 3;
let groundY = 350;

let photo_BG;
let photo_Face_Resting;
let photo_Face_Blink;
let photo_Face_Pain;
let photo_Body;
let photo_leg_R;
let photo_leg_L;
let photo_arm_r;
let photo_arm_l;
let blink_timer = 0;
let direction = 'L';

function preload() {
    photo_BG = loadImage('../fence.jpg');
    photo_Face_Resting = loadImage('../FaceResting.png');
    photo_Face_Blink = loadImage('../FaceBlink.png');
    photo_Face_Pain = loadImage('../FacePain.png');
    photo_Body = loadImage('../Body.png');
    photo_leg_R = loadImage('../Leg_facing_R.png');
    photo_leg_L = loadImage('../Leg_facing_L.png');
    photo_arm_r = loadImage('../arm_r.png');
    photo_arm_l = loadImage('../arm_l.png');
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  rectMode(CENTER);
}

function draw() {
  background(220);

  blink_timer++;
  if(blink_timer > 50){
    blink_timer = 0;
  }

  // // Ground
  // fill(180);
  
  image(photo_BG, -robotX/2, -700);
  image(photo_BG, -robotX/2 + photo_BG.width, -700);
  image(photo_BG, -robotX/2 + photo_BG.width + photo_BG.width, -700);
  
  // console.log(robotX);
  if(robotX < 5){
    robotX = 5;
  }
  if(robotX > 13500){
    robotX = 13500;
  }
  
  // Horizontal movement
  let moving = false;
  if (keyIsDown(65)) { // A
    robotX -= speed;
    moving = true;
    direction = 'L'
  }
  if (keyIsDown(68)) { // D
    robotX += speed;
    moving = true;
    direction = 'R';
  }

  // Apply gravity
  velocityY += gravity;
  robotY += velocityY;

  // Ground collision
  if (robotY >= groundY - 25) {
    robotY = groundY - 25;
    velocityY = 0;
    onGround = true;
  } else {
    onGround = false;
  }

  // drawRobot(robotX, robotY, moving);
  drawRobot(100, robotY, moving);
}

function keyPressed() {
  if (key === 'w' || key === 'W') {
    if (onGround) {
      velocityY = jumpForce;
      onGround = false;
    }
  }
}

function drawRobot(x, y, isMoving) {
  x+=200;
  y-=50;
  
  

  // Limb animation when moving
  let swing = isMoving ? sin(frameCount * 0.2) * 3 : 0;

  // Arms
  // right
  image(photo_arm_r,x - 38, y+5 + swing, 30, 80);
  // left
  image(photo_arm_l,x + 10, y - swing, 30, 80);
  // Legs
  if(direction == 'R'){
    image(photo_leg_R,x - 7, y + 55 + swing, 30, 40);
    image(photo_leg_R,x - 22, y + 55 - swing, 30, 40);
  }else{
    // switch wich leg overlaps
    image(photo_leg_L,x - 18, y + 55 - swing, 30, 40);
    image(photo_leg_L,x - 2.5, y + 55 + swing, 30, 40);
  }
  // Body
  image(photo_Body,x-23,y-13,50,75);

  // Head
  if(blink_timer >= 45 && onGround){
    image(photo_Face_Blink,x-35,y-75,75,75);
  }else if(blink_timer <= 45 && onGround){
    image(photo_Face_Resting,x-35,y-75,75,75);
  }else{
    image(photo_Face_Pain,x-35,y-75,75,75);
  }

  
  
  
}
