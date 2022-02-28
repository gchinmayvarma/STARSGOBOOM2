let mainship;

function preload() {
    mainship = loadImage("Ship.png");
    mainship.loadPixels();
}
let t;
let c;
let global_scale = 1;
function setup() {
    c = createCanvas(windowWidth / global_scale, windowHeight / global_scale);
    c.style("zoom", global_scale);
    // print(c.size())
    pixelDensity(1);
    frameRate(60);

    player_ship = new Spaceship(mainship);
    imageMode(CENTER);
    t = new ToggleButton("<LMG>", 20, height - 60, -10);
    for (let i = 0; i < 10; i++) {
        stars.push(new Particle_Star());
    }
    player_healthbar = new Bar(
        100,
        width - width / 3,
        height - 10,
        width / 3 - 1,
        10 - 1
    );
    player_healthbar.display = function () {
        push();
        translate(this.x, this.y);
        rotate(this.theta);

        let a = map(this.value, 0, this.maxvalue, 0, 100);
        noStroke();
        fill(200 - a, 0, a, 150);
        rect(map(this.value, 0, this.maxvalue, this.w, 0), 0, this.w, this.h);
        stroke(0);
        noFill();
        rect(0, 0, this.w, this.h);

        // noStroke();
        // fill(0, 22, 255, 155);
        // textAlign(LEFT, BASELINE);
        // textSize(60);
        // text(this.s, 0, 0);


        pop();
    }
}
let stars = [];
let p = [];
function draw() {
    mouseX = winMouseX / global_scale;
    mouseY = winMouseY / global_scale;
    drawingContext.shadowColor = 'purple';
    drawingContext.shadowOffsetX = random(10);
    drawingContext.shadowOffsetY = random(10);
    drawingContext.shadowBlur = 10;
    background(10);
    noStroke();

    for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].work();
        if (stars[i].y > height) stars.splice(i, 1);
    }
    if (frameCount % 2 === 0) stars.push(new Particle_Star());
    player_ship.work();
    let d = 0; //map( mouseX , 0 , width , 0 ,random(5)) ;
    t.work();
    player_ship.position_change(random(-d, d), random(-d, d));
    // if(frameCount%200===0)p.push(
    //   new Pickup(
    //     () => {
    //       player_healthbar.purevalue -= random(-70, 70);
    //       for(let i = 0 ; i < player_ship.thrusters.length ; i++ ) player_ship.thrusters[i].strength-= 1; 
    //     },
    //     random(width),
    //     random(height),
    //     10
    //   )
    // );
    for (let i = p.length - 1; i >= 0; i--) {
        p[i].work();
        if (player_ship.inside(p[i].x, p[i].y)) {
            p[i].f();
            p.splice(i, 1);
        }
    }
    Joystick();
    player_healthbar.work();
    hud();
}
function hud() {
    textAlign(RIGHT, BASELINE);
    textSize(30);
    noFill();
    stroke(255);
    text("+", player_healthbar.x, height);

    textAlign(LEFT, BASELINE);
    textSize(20);
    text(int(player_healthbar.value), player_healthbar.x, player_healthbar.y);
}
class Particle_Star {
    constructor() {
        this.setit();
    }
    setit() {
        this.x = random(width);
        this.y = -100;
        this.dx = 0;
        this.dy = random(1, 5);
        this.d = random(0.1, 5);
    }
    display() {
        fill(0, 200, 255, 100);
        circle(this.x, this.y, this.d);
    }
    work() {
        this.x += this.dx;
        this.y += this.dy;
        this.display();
    }
}
