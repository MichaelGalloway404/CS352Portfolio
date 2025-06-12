// Create the button element
const button = document.createElement("button");
button.textContent = "Restart";
button.classList.add("refresh-btn");

// Set the onclick behavior
button.onclick = function () {
  location.reload();
};

// Append the button to the body
document.body.appendChild(button);


let playerX = 200;
let speed = 8;

let photo_BG;
let photo_Face_Resting;
let photo_Face_Blink;
let photo_Face_Pain;
let photo_Face_Talk;
let photo_Body;
let photo_leg_R;
let photo_leg_L;
let photo_arm_r;
let photo_arm_l;
let photo_soph;
let photo_night;
let photo_TV;
let photo_ChildHood;


let blink_timer = 0;
let direction = 'L';
let interact = false;

let background_music;
let speak = false;
let speak_bubble = 0;
let thoughts = ["I'm Alive!", "Where am I?", "I don't feal quite\n like myself."];
let thought_choice = false;
let thought;

let dayTimeClock = 0;
let darknessTimer = 0;
let invert = false;
let myVideo;

let gameOver = false;

function preload() {

  myVideo = createVideo(['../me_n_em.mp4']);
  photo_BG = loadImage('../fence.jpg');
  photo_Face_Resting = loadImage('../FaceResting.png');
  photo_Face_Blink = loadImage('../FaceBlink.png');
  photo_Face_Pain = loadImage('../FacePain.png');
  photo_Face_Talk = loadImage('../Face_Talk.png');
  photo_Body = loadImage('../Body.png');
  photo_leg_R = loadImage('../Leg_facing_R.png');
  photo_leg_L = loadImage('../Leg_facing_L.png');
  photo_arm_r = loadImage('../arm_r.png');
  photo_arm_l = loadImage('../arm_l.png');
  photo_soph = loadImage('../soph.png');
  photo_night = loadImage('../night_fall.png');
  photo_TV = loadImage('../TV.png');
  photo_ChildHood = loadImage('../ChildHood.png');

  background_music = loadSound('../background_mus.wav');

  // hide here so user does not see a flash of video will song loads
  myVideo.hide();
}

function setup() {
  let canvas = createCanvas(1000, 480);
  canvas.parent('sketch-holder');
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  myVideo.hide();
  myVideo.volume(0);
}

function draw() {
  if (!background_music.isPlaying()) {
    background_music.loop();
  }
  if (!gameOver) {
    // background(220);
    image(photo_BG, -playerX / 2, -700);

    currentThoughts();

    // night approaching
    dayTimeClock++;
    if (dayTimeClock > 15) {
      dayTimeClock = 0;
      darknessTimer++;
    }

    blink_timer++;
    if (blink_timer > 50) {
      blink_timer = 0;
    }

    if (playerX < 5) {
      playerX = 5;
    }
    if (playerX > 3000) {
      playerX = 3000;
    }

    // Horizontal movement
    let moving = false;
    if (keyIsDown(65)) { // A
      playerX -= speed;
      moving = true;
      direction = 'L'
    }
    if (keyIsDown(68)) { // D
      playerX += speed;
      moving = true;
      direction = 'R';
    }

    // best present memories me and emma
    push();
    fill(0);
    textSize(25);
    text('Present Good Times', (1100 - playerX / 2) + 2, 142 + sin(frameCount * 0.1));
    fill(255, 255, 255);
    text('Present Good Times', 1100 - playerX / 2, 140 + sin(frameCount * 0.1));
    pop();
    image(photo_TV, 1000 - playerX / 2, 150, 200, 200);
    image(myVideo, (1000 - playerX / 2) + 43, 203, 87, 105);
    push();
    fill(0, 0, 255, 75);
    rect((1000 - playerX / 2) + 86, 255, 87, 105)
    pop();

    // orb if distractions
    push();
    fill(0);
    textSize(25);
    text('Present Distraction', (1500 - playerX / 2) + 2, 172 + sin(frameCount * 0.1));
    fill(255, 255, 255);
    text('Present Distraction', 1500 - playerX / 2, 170 + sin(frameCount * 0.1));
    let r = random(255);
    let g = random(255);
    let b = random(255);
    fill(r, g, b, 150)
    circle(1500 - playerX / 2, 300, sin(frameCount * 0.05) * 150);
    circle(1500 - playerX / 2, 300, sin(frameCount * 0.01) * 25);
    circle(1500 - playerX / 2, 300, sin(frameCount * 0.1) * 50);
    pop();

    // Past memories
    push();
    fill(0);
    textSize(25);
    text('Precious Memories', (650 - playerX / 2) + 2, 172 + sin(frameCount * 0.1));
    fill(255, 255, 255);
    text('Precious Memories', 650 - playerX / 2, 170 + sin(frameCount * 0.1));
    pop();
    image(photo_ChildHood, 550 - playerX / 2, 190, 170 + sin(frameCount * 0.1), 175 + sin(frameCount * 0.1));

    // draw player
    if (speak && interact) {
      drawPlayer(100, 330, false);
      speed = 0;
      speak_bubble++;
      noStroke();
      fill(0, 0, 0, 255 - speak_bubble * 2);
      textFont('Helvetica');
      textSize(1 + speak_bubble);
      if (!thought_choice) {
        thought = random(thoughts);
        thought_choice = true;
      }

      text(thought, 302 + speak_bubble, 252 - speak_bubble);

      fill(255, 255, 255, 255 - speak_bubble * 2);
      textFont('Helvetica');
      textSize(1 + speak_bubble);
      text(thought, 300 + speak_bubble, 250 - speak_bubble);

      if (speak_bubble >= 100) {
        speak_bubble = 0;
        speak = false;
        thought_choice = false;
      }
    } else {
      speed = 8;
      drawPlayer(100, 330, moving);
    }
    noStroke();

    // Sophia
    image(photo_soph, 560 - playerX / 2, 320, 70 + sin(frameCount * 0.1), 75 + sin(frameCount * 0.1));

    // darkness
    push();
    tint(255, darknessTimer);
    image(photo_night, 0, 0, 1000, 480);
    pop();

    if ((playerX >= 450 && playerX <= 730) ||
      (playerX >= 1260 && playerX <= 1600) ||
      (playerX >= 2250 && playerX <= 2700)) {
      showActionPrompt();
      interact = true;
    } else {
      interact = false;
    }

    // VHS effect
    rect(random(10000), 0, random(3), 1000);
    for (let i = 0; i < 10; i++) {
      rect(random(1000), random(500), random(2), random(2));
    }

    // ending
    if (darknessTimer >= 255) {
      let ran = random(500);
      if (ran >= 409) {
        blendMode(ADD);
        image(photo_Face_Pain, random(-300, 300), random(-300, 0), width, height * 2);
        blendMode(BLEND);
      }
      invert = true;
      frameRate(1900);
    }
    if (invert) {
      loadPixels();
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i];         // Invert red channel
        if (darknessTimer < 275) {
          pixels[i + 1] = 255 - pixels[i + 1]; // Invert green
        }

        if (darknessTimer < 265) {
          pixels[i + 2] = 255 - pixels[i + 2]; // Invert blue
        }

      }
      updatePixels();

      for (let i = 0; i < 10; i++) {
        push();
        fill(0);
        textSize(25);
        text('I NEED MORE TIME!', (1100 - playerX / 2) + 2, 142 + sin(frameCount * 0.1));
        fill(255, 255, 255);
        text('I NEED MORE TIME!', random(1000), random(500));
        pop();
      }
      if(darknessTimer >= 280){gameOver = true;}
    }
  }else{
    gameOverScreen();
  }
}

function keyPressed() {
  if (!background_music.isPlaying()) {
    background_music.loop();
  }
  if (key === 's' || key === 'S') {
    if (interact) {
      speak = true;
    }
    if (playerX >= 1260 && playerX <= 1500) {
      myVideo.loop();
    }
  }
}

function mousePressed() {
  if (!background_music.isPlaying()) {
    background_music.loop();
  }
  if (interact) {
    speak = true;
  }
  if (playerX >= 1260 && playerX <= 1500) {
    myVideo.loop();
  }
}

function showActionPrompt() {
  push();
  fill(255, 0, 0);
  circle(300, 190, 10);
  pop();
}

function gameOverScreen(){
  let endText = "Without time passing there is no experience Good or Bad,\n to appreciate or to regret both come at the same price.";
  push();
  fill(0);
  rect(0,0,1000*2,480*2);
  textSize(30);
  fill(255, 0, 0);
  text(endText, 500, 250);
  pop();
}

function currentThoughts() {
  if (playerX >= 450 && playerX <= 730) {
    thoughts = ["I Love you", "I miss you", "Wounderfull years!", "Would be nice to go back.", "Great memories", "So much Love", "Thank you",
      "Good times", "Remember the Zoo", "Remember the Aquarium", "Remember the River Walk", "Remember the Lake", "Remember the Sci-Port",
      "Ronald Mcdonald House", "Swimming!", "summer Nights", " Was wonderful"
    ];
  }
  if (playerX >= 1260 && playerX <= 1600) {
    thoughts = ["I Love this", "It's great to be present", "the years have been great", "where will we go?", "Thank you"

    ];
  }
  if (playerX >= 2250 && playerX <= 2700) {
    thoughts = ["I gotta do that thing", "Where am I?", "I'm so buisy", "Where is the time", "Love this film", "What a good book",
      "Another paper?", "I'm late!", "I'm so bored", "Coffee!", "When is my shift over?", "Time for a run", "Pick up my cat",
      "Wash car", "Call grandma", "Water plants", "Make a smoothie", "Clean out fridge", "Write a haiku", "Organize bookshelf",
      "Take a walk", "Fold laundry", "Feed the birds", "Check the mail", "Vacuum the couch", "Stretch for 10 minutes",
      "Update calendar", "Bake cookies", "Dust the shelves", "Charge my phone", "Trim the hedges", "Change bedsheets",
      "Sort recycling", "Plan meals", "Do yoga", "Clean windows", "Paint nails", "Buy groceries", "Meditate", "Declutter desk",
      "Refill water bottle", "Write a thank-you note", "Walk the dog", "Reply to emails", "Sweep the porch", "Change lightbulbs",
      "Sharpen pencils", "Make the bed", "Back up computer", "Clean the microwave", "Take out trash", "Read a chapter", "Do a puzzle",
      "Floss teeth", "Clean out wallet", "Wipe down counters", "Organize junk drawer", "Stretch legs", "Set alarm", "Drink water",
      "Feed the fish", "Check tire pressure", "Look at old photos", "Write a journal entry", "Reboot router", "Make a to-do list",
      "Donate old clothes", "Vacuum the car", "Clean glasses", "Charge laptop", "Buy stamps", "Schedule appointment"
    ];
  }
  if (invert) {
    thoughts = ["I NEED MORE TIME!"];
  }
}

function drawPlayer(x, y, isMoving) {
  x += 200;
  y -= 50;

  // Limb animation when moving
  let swing = isMoving ? sin(frameCount * 0.3) * 3 : 0;

  // Arms
  // right
  image(photo_arm_r, x - 38, y + 5 + swing, 30, 80);
  // left
  image(photo_arm_l, x + 10, y - swing, 30, 80);

  // Legs
  if (direction == 'R') {
    image(photo_leg_R, x - 7, y + 55 + swing, 30, 40);
    image(photo_leg_R, x - 22, y + 55 - swing, 30, 40);
  } else {
    // switch wich leg overlaps
    image(photo_leg_L, x - 18, y + 55 - swing, 30, 40);
    image(photo_leg_L, x - 2.5, y + 55 + swing, 30, 40);
  }
  // Body
  image(photo_Body, x - 23, y - 13, 50, 75);

  // Head
  if (blink_timer >= 45 && !speak) {
    image(photo_Face_Blink, x - 35, y - 75, 75, 75);
  } else if (blink_timer <= 45 && !speak) {
    image(photo_Face_Resting, x - 35, y - 75, 75, 75);
  } else if (blink_timer >= 45 && speak && interact) {
    image(photo_Face_Talk, x - 35, y - 75, 75, 75);
  } else {
    image(photo_Face_Pain, x - 35, y - 75, 75, 75);
  }
}
