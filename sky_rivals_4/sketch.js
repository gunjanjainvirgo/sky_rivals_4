var bg_img, bg_img_play;
var playbutton, aboutbutton;
var health = 300, max_health = 300;
var gameState = 'wait';
var jet, jet_img;
var bullet, bullet_img;
var bulletGroup;
var enemy, enemyGroup, enemy1img, enemy2img;
var score = 0;
var bg;

function preload() {

    bg_img = loadImage("assets/sky_rivals.gif");
    bg_img_play = loadImage("assets/sky_bg.jpg");
    jet_img = loadImage("assets/jet.png");
    enemy1img = loadImage("assets/asteroid.png");
    enemy2img = loadImage("assets/ufo.png");
    bullet_img = loadImage("assets/bullet.png");

}

function setup() {

    createCanvas(900, 700);
    //createCanvas(windowWidth, windowHeight);
    //playbutton = createButton('Play');
    playbutton = createImg("assets/play_button.png");
    playbutton.position(440, 563);
    playbutton.size(140, 140);
    //playbutton.class("customButton")
    playbutton.hide();

    aboutbutton = createImg("assets/about_button.png");
    aboutbutton.position(10, 10);
    aboutbutton.size(80, 70);
    aboutbutton.hide();

    jet = createSprite(100, 200);
    jet.addImage(jet_img);
    jet.scale = 0.5;
    jet.visible = false;


    bulletGroup = new Group()
    enemyGroup = new Group()
}

function draw() {

    if (gameState == "wait") {
        background(bg_img);
        playbutton.show()
        aboutbutton.show()
    }

    // arrow function =>
    // ()=>{write the entire task here}
    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })

    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";

    })

    if (gameState == "about") {
        aboutgame();
    }

    if (gameState == "play") {

        background(bg_img_play);
        //background("blue");

        /* bg=createSprite(400,400);
        bg.addImage(bg_img_play);
        bg.velocityX = -5;
        bg.scale=0.5; */
      
        jet.visible = true;
        
        healthlevel1();
        movement();
        spawnEnemies();

        /* if (bg.x < 0){
            bg.x = bg.width/2;
          } */

    }

    drawSprites();
    if (gameState == "play") {
        fill(255);
        textSize(25);
        text("SCORE: " + score, 50, 50);
        
    }


}


function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Fly powerful fighter jets, battle in the sky and win by shooting your enemies !!",
        textAlign: "center",
        imageUrl: "assets/sky_rivals.gif",
        imageSize: "200x200",
        confirmButtonText: "Lets Kill the Enemy!!",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "wait"
        }

    )


}


function healthlevel1() {

    stroke("lightgreen")
    strokeWeight(7)
    noFill()
    rectMode(CENTER)
    rect(755, 50, 200, 20)

    noStroke()
    fill("green")
    rectMode(CENTER)
    rect(755, 50, map(health, 0, max_health, 0, 200), 20)

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function movement() {

    if (jet.y <= 10) {
        jet.y = 10
    }


    if (jet.y >= 525) {
        jet.y = 525
    }

    if (keyDown("UP_ARROW")) {
        jet.y = jet.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        jet.y = jet.y + 5;
    }

    if (keyDown("space")) {
        spawnBullets();
    }


}

function spawnBullets() {
    bullet = createSprite(jet.x + 15, jet.y + 13, 20, 20);
    bullet.addImage(bullet_img);
    bullet.scale = 0.2;
    bullet.velocityX = 10;
    //bullet.velocityY = 10;

    bullet.depth = jet.depth;
    jet.depth = jet.depth + 1;

    bulletGroup.add(bullet);

}

function spawnEnemies() {
    if (frameCount % 100 == 0) {
        //var randy = Math.round(random(50, 530))
        //enemy = createSprite(width, randy);

        //enemy.velocityX = -4;
        //enemy.velocityY = 4;

        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:
                var randy = Math.round(random(0, 30))
                var randx = Math.round(random(400,width));
                enemy = createSprite(randx, randy);
                enemy.addImage(enemy1img)
                enemy.scale = 0.25;
                enemy.velocityX = -4;
                enemy.velocityY = 4;
                break;

            case 2:
                var randy = Math.round(random(50, 530))
                enemy = createSprite(width, randy);
                enemy.addImage(enemy2img)
                enemy.scale = 0.25;
                enemy.velocityX = -4;
                break;

            default: break;

        }


        enemyGroup.add(enemy);



    }
}