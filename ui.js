class Bar {
    constructor(maxvalue, x, y, w, h, theta = 0, s = "") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.theta = theta;
        this.s = s;
        this.purevalue = this.value = this.maxvalue = maxvalue;
    }
    display() {
        push();
        translate(this.x, this.y);
        rotate(this.theta);

        let a = map(this.value, 0, this.maxvalue, 0, 100);
        noStroke();
        fill(200 - a, 0, a, 150);
        rect(0, 0, map(this.value, 0, this.maxvalue, 0, this.w), this.h);
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
    work() {
        this.purevalue = constrain(this.purevalue, 0, this.maxvalue + 1);
        this.value = lerp(this.value, this.purevalue, 0.14);
        this.display();
    }
}
class ToggleButton {
    constructor(s = "", x = 0, y = 0, t = -10, f = () => { }, size = 20) {
        this.s = s;
        this.textSize = size;
        this.position(x, y);
        this.setit();
        this.sx = 0;
        this.on = false;
        this.theta = radians(t);
        this.coloron = color(255, 0, 100, 150);
        this.coloroff = color(85, 27, 194, 150);
        this.color = color(50, 0);
        this.f = f
    }
    position(x, y) {
        this.x = x;
        this.y = y;
    }
    setit() {
        textSize(this.textSize);
        this.w = (textWidth("ON") + this.textSize) * 1;
        this.ww = textWidth("OFF") + this.w;
        this.h = textAscent() + this.textSize / 2;
    }
    inside() {
        if (this.theta === 0)
            return (
                mouseX > this.x &&
                mouseX < this.x + this.ww &&
                mouseY > this.y &&
                mouseY < this.y + this.h
            );
        let [x, y] = translatePoint(mouseX, mouseY, this.x, this.y, this.theta);
        return x > 0 && x < this.ww && y > 0 && y < this.h;
    }
    display() {
        push();
        translate(this.x, this.y);
        rotate(this.theta);
        textSize(this.textSize);
        textAlign(LEFT, CENTER);
        if (this.inside()) {
            this.infocus();
        } else {
            this.outfocus();
        }
        textSize(15);
        fill(200);
        textAlign(LEFT, BASELINE);
        text(this.s, 0, -2);
        pop();
    }
    infocus() {
        fill(60 - map(this.sx, 0, this.w, 0, 20));
        noStroke();
        rect(0, 0, this.ww, this.h);
        fill(this.color);
        rect(this.sx, 0, this.w, this.h);
        if (this.on) {
            fill(0);
            text("ON", 0, this.h / 2);
            fill(200, 50);
            text("OFF", this.w, this.h / 2);
        } else {
            fill(205);
            text("OFF", this.w, this.h / 2);
            fill(200, 50);
            text("ON", 0, this.h / 2);
        }
    }
    outfocus() {
        fill(60 - map(this.sx, 0, this.w, 0, 20));
        noStroke();
        rect(0, 0, this.ww, this.h);
        fill(this.color);
        rect(this.sx, 0, this.w, this.h);
        if (this.on) {
            fill(0);
            text("ON", 0, this.h / 2);
        } else {
            fill(205);
            text("OFF", this.w, this.h / 2);
        }
    }

    clicked() {
        this.on = !this.on;
        this.f();
        something_pressed = true;
    }
    work() {
        this.display();
        if (this.on) {
            this.sx = lerp(this.sx, 0, 0.14);
            this.color = lerpColor(this.color, this.coloron, 0.3);
        } else {
            this.sx = lerp(this.sx, this.w, 0.14);
            this.color = lerpColor(this.color, this.coloroff, 0.05);
        }
    }
}
function translatePoint(absPointX, absPointY, centerX, centerY, theta) {
    // theta in radians
    absPointX -= centerX;
    absPointY -= centerY;
    let c = cos(theta);
    let s = sin(theta);
    return [absPointX * c + absPointY * s, -absPointX * s + absPointY * c];
}