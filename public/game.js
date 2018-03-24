function Game() {
    this.playerAssigned = false;
    this.initialRocketCount = 2;
    this.rockets = [];
    this.controls = {
        player: { ATTR_KEY: 32, OPPO_KEY: 83 },
        bot: { ATTR_KEY: 38, OPPO_KEY: 40 }
    };
    this.gravity = createVector(0, 0.2);
    this.friction = 0.99;
    this.rocketColors = [255, 127, 192, 64, 0];

    this.addRocket = function() {
        this.rockets.push(new Rocket());
        this.rockets[this.rockets.length - 1].init();
    };
}
