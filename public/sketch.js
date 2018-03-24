let attracter = null;
let platform = null;
let colCounter = 0;
let resumeFrame = null;

function Attractor() {
    this.pos = createVector(width / 2, height / 3);
    this.draw = function() {
        fill(40, 34, 40);
        ellipse(this.pos.x, this.pos.y, 50, 50);
    };
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    game = new Game();
    attractor = new Attractor();
    platform = new Platform();
    rectMode(CENTER);
    noStroke();
    for (let i = 0; i < game.initialRocketCount; i++) {
        game.addRocket();
    }
}

function draw() {
    clear();
    attractor.draw();
    platform.draw();
    for (let rocket of game.rockets) {
        rocket.update();
    }
}
