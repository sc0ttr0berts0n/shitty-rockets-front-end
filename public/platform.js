function Platform() {
    this.pos = createVector(width/2, height/3*2);
    this.size = createVector(600, 50);
    this.draw = function() {
        fill(40, 34, 40);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    };
}