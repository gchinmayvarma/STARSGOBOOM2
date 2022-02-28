class Barrel {
    constructor(x, y, w, h, theta, fire_rate, bullet_speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theta = radians(theta);
        this.fire_rate = fire_rate;
        this.fire_mode = true;
        this.bullet_speed = bullet_speed;
        this.bullet_size = h;
        this.particles = [];
        this.set_colors();
        this.temp_x = this.temp_y = 0;
    }
    set_colors(cr = 255, cg = 25, cb = 125, ca = 200) {
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
        this.fire_mode = t.on;
        if (this.fire_mode && frameCount % this.fire_rate === 0) {
            let h = 0;
            this.particles.push(
                new Bullet(
                    this.x + this.w * cos(this.theta) - h * sin(this.theta),
                    this.y + this.w * sin(this.theta) + h * cos(this.theta),
                    this.bullet_speed * cos(this.theta) + this.temp_x,
                    this.bullet_speed * sin(this.theta) + this.temp_y,
                    this.bullet_size,
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
            if (this.particles[i].lifetime > 100) this.particles.splice(i, 1);
        }

        this.display();
        this.temp_x = this.temp_y = 0;
    }
}
class Bullet {
    constructor(x, y, dx, dy, d, cr = 0, cg = 255, cb = 200, ca = 100) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.d = d;
        this.c = color(cr, cg, cb, ca);
        this.lifetime = 0;
    }
    display() {
        fill(this.c);
        circle(this.x, this.y, this.d);
    }
    work() {
        this.lifetime++;
        this.x += this.dx;
        this.y += this.dy;
        this.display();
    }
}
