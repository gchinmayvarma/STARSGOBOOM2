class Pickup {
    constructor(f, x, y, r) {
        this.x = x;
        this.y = y
        this.r = r
        this.d = 2 * r
        this.f = f;
    }
    display() {
        circle(this.x, this.y, this.d);
    }
    work() {
        this.display()
    }
}