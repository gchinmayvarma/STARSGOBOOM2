class Spaceship {
    constructor(sprite) {
        this.x = width / 2;
        this.y = height / 2;
        this.w = 64;
        this.h = 64;
        this.sprite = sprite;
        this.thrusters = [];
        this.thrusters.push(new Thruster(this.x, this.y, 40, 20, 30, 5, 1));
        // this.thrusters[this.thrusters.length-1].set_colors( 255,0,69,50) ;
        this.thrusters.push(new Thruster(this.x, this.y, 40, 20, 150, 5, 1));
        // this.thrusters[this.thrusters.length-1].set_colors( 255,0,69,50) ;

        // this.thrusters.push(new Thruster(this.x, this.y, 40, 5, 280, 2, 3));
        // this.thrusters.push(new Thruster(this.x, this.y, 40, 5, 260, 2, 3));

        this.barrels = [];
        this.barrels.push(new Barrel(this.x - 10, this.y, 40, 5, 270, 20, 7));
        this.barrels.push(new Barrel(this.x + 10, this.y, 40, 5, 270, 20, 7));
    }
    position_change(x, y) {
        if ((x < 0 && this.x < 0) || (x > 0 && this.x > width)) x = 0;
        if ((y < 0 && this.y < 0) || (y > 0 && this.y > height)) y = 0;

        for (let i = this.thrusters.length - 1; i >= 0; i--) {
            this.thrusters[i].x += x;
            this.thrusters[i].y += y;
            // for (let j = this.thrusters[i].particles.length - 1; j >= 0; j--) {
            //   this.thrusters[i].particles[j].x += x;
            //   this.thrusters[i].particles[j].y += y;
            // }
        }
        for (let i = this.barrels.length - 1; i >= 0; i--) {
            this.barrels[i].x += x;
            this.barrels[i].y += y;
            this.barrels[i].temp_x = x / 5;
            this.barrels[i].temp_y = y / 5;
        }
        this.x += x;
        this.y += y;
    }
    inside(x, y) {
        x -= this.x - this.w / 2;
        y -= this.y - this.h / 2;
        return x > 0 && x < this.w && y > 0 && y < this.h;
    }
    display() {
        image(this.sprite, this.x, this.y);
    }

    work() {
        for (let i = this.barrels.length - 1; i >= 0; i--) {
            this.barrels[i].work();
        }
        for (let i = this.thrusters.length - 1; i >= 0; i--) {
            this.thrusters[i].work();
            // this.thrusters[i].strength += random(-1,1) ;
            this.thrusters[i].strength = constrain(this.thrusters[i].strength, 2, 10);
        }
        this.display();
    }
}
class Thruster {
    constructor(x, y, w, h, theta, strength, intensity) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theta = radians(theta);
        this.strength = strength;
        this.intensity = intensity;
        this.particles = [];
        this.set_colors();
    }
    set_colors(cr = 0, cg = 255, cb = 200, ca = 100) {
        this.cr = cr;
        this.cg = cg;
        this.cb = cb;
        this.ca = ca;
    }
    display() {
        push();
        translate(this.x, this.y);
        rotate(this.theta);
        fill(45);
        rect(0, -this.h / 2, this.w, this.h);
        pop();
    }
    work() {
        if (frameCount % this.intensity === 0) {
            let h = random(this.h) - this.h / 2;
            this.particles.push(
                new Particle_Fire(
                    this.x + this.w * cos(this.theta) - h * sin(this.theta),
                    this.y + this.w * sin(this.theta) + h * cos(this.theta),
                    this.strength * cos(this.theta),
                    this.strength * sin(this.theta),
                    this.h,
                    this.strength,
                    this.cr,
                    this.cg,
                    this.cb,
                    this.ca
                )
            );
        }
        noStroke();
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].work();
            if (this.particles[i].d <= 0) this.particles.splice(i, 1);
        }

        this.display();
    }
}
class Particle_Fire {
    constructor(x, y, dx, dy, d, dd, cr = 0, cg = 255, cb = 200, ca = 100) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.d = random(d);
        this.dd = random(1, 2) / dd;
        this.c = color(cr, cg, cb, ca);
    }
    display() {
        fill(this.c);
        circle(this.x, this.y, this.d);
    }
    work() {
        this.x += this.dx;
        this.y += this.dy;
        this.d -= this.dd;
        this.display();
    }
}
