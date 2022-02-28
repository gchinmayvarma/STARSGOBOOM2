
let pivot_x,
    pivot_y,
    pivot = false,
    something_pressed = false;
function touchMoved() {
    mouseX = winMouseX / global_scale;
    mouseY = winMouseY / global_scale;

    pivot_x = mouseX;
    pivot_y = mouseY;
    if (t.inside()) t.clicked();
    pivot = !something_pressed;
}
function mousePressed() {
    mouseX = winMouseX / global_scale;
    mouseY = winMouseY / global_scale;

    pivot_x = mouseX;
    pivot_y = mouseY;
    if (t.inside()) t.clicked();
    pivot = !something_pressed;
}
function touchEnded() {
    something_pressed = pivot = false;
}
function mouseReleased() {
    something_pressed = pivot = false;
}
function touchMoved() {
    mouseX = winMouseX / global_scale;
    mouseY = winMouseY / global_scale;
}
function Joystick() {
    if (pivot) {
        let x = winMouseX / global_scale;
        let y = winMouseY / global_scale;
        let s = 1;
        push();
        translate(pivot_x, pivot_y);
        let theta = PI - atan((y - pivot_y) / (x - pivot_x));
        if (x > pivot_x) theta += PI;
        if (x == pivot_x) {
            if (y < pivot_y) theta = PI / 2;
            else theta = -PI / 2;
        }
        let start = new createVector(pivot_x, pivot_y),
            end = new createVector(x, y);
        end.sub(start);
        if (end.mag() > 100 * s) {
            end.setMag(100 * s);
        }
        noStroke();
        noFill();
        // fill(200/s, end.mag()/(5*s), end.mag()*2.55*2/s, 240/s ) ;
        ellipse(0, 0, 2 * end.mag(), 2 * end.mag());
        strokeWeight(1);
        noFill();
        stroke(200);
        ellipse(0, 0, 200 * s, 200 * s);
        stroke(240);
        ellipse(0, 0, (10 * s) / 2, (10 * s) / 2);
        fill(240);
        //line( 0, 0, end.x, end.y ) ;
        let a = s * 10;
        triangle(
            end.x + a * cos(theta),
            end.y - a * sin(theta),
            end.x - a * sin(theta),
            end.y - a * cos(theta),
            end.x + a * sin(theta),
            end.y + a * cos(theta)
        );
        end.div(s * 10);
        // m.loc.add(end) ;
        player_ship.position_change(end.x * 0.7, end.y * 0.7);
        pop();
    }
}
