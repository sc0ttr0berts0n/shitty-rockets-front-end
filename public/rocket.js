function Rocket() {
    this.id = null;
    this.oppo = null;
    this.startColor = null;
    this.color = null;
    this.size = 32;
    this.thrustStrength = 1;
    this.controls = null;

    this.lastPos = null;
    this.pos = null;
    this.vel = createVector();
    this.acc = createVector();
}

Rocket.prototype.init = function() {
    this.pos = createVector(platform.size.x * Math.random() - platform.size.x/2 + width/2, height / 2);
    this.id = game.rockets.length - 1;
    this.startColor = game.rocketColors[this.id % game.rocketColors.length];
    this.color = this.startColor;

    // Assign controls
    if (!game.playerAssigned) {
        this.controls = game.controls.player;
        game.playerAssigned = true;
    } else {
        this.controls = game.controls.bot;
    }

    // add opponents if there are more than one rocket
    // opponent is next rocket in the chain, unless last, whos oppo is first
    if (game.rockets.length > 1) {
        for (let i = 0; i < game.rockets.length; i++) {
            if (i !== game.rockets.length - 1) {
                game.rockets[i].addOppo(game.rockets[i + 1]);
            } else {
                game.rockets[i].addOppo(game.rockets[0]);
            }
        }
    }
};

Rocket.prototype.addOppo = function(oppo) {
    this.oppo = oppo;
};

Rocket.prototype.applyForce = function(vec) {
    this.acc.add(vec);
};

Rocket.prototype.reflectVectors = function(rocket, oppo) {
    // Figure out which vec is fast and which is slow
    if (rocket.vel.mag() >= oppo.vel.mag()) {
        let originalVel = this.vel.copy();
        this.vel.mult(-0.2).sub(oppo.vel);
        this.oppo.vel.add(originalVel);
    }
};

Rocket.prototype.detectOppoCollision = function() {
    if (
        this.pos.x < this.oppo.pos.x + this.oppo.size &&
        this.pos.x + this.size > this.oppo.pos.x &&
        this.pos.y < this.oppo.pos.y + this.oppo.size &&
        this.size + this.pos.y > this.oppo.pos.y
    ) {
        this.handleOppoCollision();
    } else {
        this.color = this.startColor;
    }
};

Rocket.prototype.handleOppoCollision = function() {
    this.color = color(200, 20, 20);
    this.pos = this.lastPos;
    this.reflectVectors(this, this.oppo);
};

Rocket.prototype.handleWallCollision = function() {
    // ground collision
    if (this.pos.y > height - this.size / 2) {
        this.pos.y = height - this.size / 2;
        this.acc.y = 0;
        this.vel.y = 0;
    }

    // top collision
    if (this.pos.y < 0 + this.size / 2) {
        this.pos.y = 0 + this.size / 2;
        this.acc.y = 0;
        this.vel.y = 0;
    }

    // left collision
    if (this.pos.x < 0 + this.size / 2) {
        this.pos.x = 0 + this.size / 2;
        this.acc.x = 0;
        this.vel.x = 0;
    }

    // right collision
    if (this.pos.x > width - this.size / 2) {
        this.pos.x = width - this.size / 2;
        this.acc.x = 0;
        this.vel.x = 0;
    }

    // TODO: Cancel all insignificant floor movement
};

Rocket.prototype.handlePlatformCollision = function() {

    if (this.pos.x - this.size/2 < platform.pos.x + platform.size.x/2 &&
        this.pos.x + this.size/2 > platform.pos.x - platform.size.x/2 &&
        this.pos.y - this.size/2 < platform.pos.y + platform.size.y/2 &&
        this.pos.y + this.size/2 > platform.pos.y - platform.size.y/2
    ) {
        this.pos.y = this.lastPos.y;
        this.vel.y = 0;
    }
};

Rocket.prototype.thrustAtVector = function(vec) {
    let targetVec = vec
        .copy()
        .sub(this.pos)
        .div(vec.dist(this.pos));
    this.applyForce(targetVec.mult(this.thrustStrength));
};

Rocket.prototype.update = function() {
    // Store untouched position
    this.lastPos = this.pos.copy();
    
    // add gravity
    this.applyForce(game.gravity);

    // Simulate friction
    this.vel.mult(game.friction);

    // Thrust at attractor
    if (keyIsDown(this.controls.ATTR_KEY)) {
        this.thrustAtVector(attractor.pos);
    }

    // Thrust at oppo
    if (keyIsDown(this.controls.OPPO_KEY)) {
        this.thrustAtVector(this.oppo.pos);
    }


    // Add all forces
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Detect Wall Collision
    this.handleWallCollision();

    this.handlePlatformCollision();

    if (this.oppo) {
        this.detectOppoCollision();
    }

    this.draw();
};
Rocket.prototype.draw = function() {
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.size, this.size);
};
