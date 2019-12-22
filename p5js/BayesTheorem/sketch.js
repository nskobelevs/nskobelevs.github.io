let size;
let topLeftCorner;
let squareSize;

let ph;
let peh;
let penh;

let c;

let ratio;

function setup() {
    size = floor(sort([windowHeight, windowWidth])[0] * 0.99);
    createCanvas(windowWidth, windowHeight);

    topLeftCorner = createVector(round(windowWidth/2 - size * 0.2), round(windowHeight/2 - size * 0.2));
    squareSize = round(size * 0.2 * 2);

    c = round(size * 0.01);

    ph = createVector(topLeftCorner.x + squareSize * 0.1, topLeftCorner.y);

    peh = createVector(topLeftCorner.x, topLeftCorner.y + squareSize * 0.6);

    penh = createVector(topLeftCorner.x + squareSize, topLeftCorner.y + squareSize * 0.9);

    rectMode(CORNERS);

    let a = (ph.x - topLeftCorner.x) * (topLeftCorner.y + squareSize - peh.y);
    let b = (topLeftCorner.x + squareSize - ph.x) * (topLeftCorner.y + squareSize - penh.y);

    ratio = a / (a + b);

    noLoop();
}

function draw() {
    background(0);


    stroke(255);
    noFill();
    rect(topLeftCorner.x, topLeftCorner.y, topLeftCorner.x + squareSize, topLeftCorner.y + squareSize);

    rect(topLeftCorner.x, topLeftCorner.y + squareSize * 1.2, topLeftCorner.x + squareSize, topLeftCorner.y + squareSize * 1.4);

    fill(136);
    rect(topLeftCorner.x, topLeftCorner.y, ph.x, peh.y);

    line(ph.x, ph.y, ph.x, ph.y + squareSize);
    line(peh.x, peh.y, ph.x, peh.y);
    line(penh.x, penh.y, ph.x, penh.y);

    fill(99, 194, 220);
    rect(peh.x, peh.y, ph.x, topLeftCorner.y + squareSize);
    rect(topLeftCorner.x, topLeftCorner.y + squareSize * 1.2, topLeftCorner.x + squareSize * ratio, topLeftCorner.y + squareSize * 1.4)

    fill(67);
    rect(ph.x, ph.y, penh.x, penh.y);

    fill(40, 117, 138);
    rect(topLeftCorner.x + squareSize, topLeftCorner.y + squareSize, ph.x, penh.y);
    rect(topLeftCorner.x + squareSize * ratio, topLeftCorner.y + squareSize * 1.2, topLeftCorner.x + squareSize, topLeftCorner.y + squareSize * 1.4);

    fill(255, 235, 18);
    ellipse(ph.x, ph.y, c, c);
    ellipse(peh.x, peh.y, c, c);
    ellipse(penh.x, penh.y, c, c);

    fill(255);
    noStroke();

    textSize(c*4);
    textAlign(CENTER, TOP);
    text("Geometric Bayes Theorem", width/2, height*0.04);

    textSize(c*2);

    textAlign(CENTER, BOTTOM);
    text("P(H)\n" + round((ph.x - topLeftCorner.x)/squareSize*100) + "%", (topLeftCorner.x + ph.x)/2, topLeftCorner.y - size*0.01);

    textAlign(RIGHT, CENTER);
    text("P(E|H) " + round( (topLeftCorner.y + squareSize - peh.y)/squareSize*100) + "%", topLeftCorner.x - squareSize*0.03, (topLeftCorner.y + squareSize + peh.y)/2);

    textAlign(LEFT, CENTER);
    text("P(E|¬H) " + round( (topLeftCorner.y + squareSize - penh.y)/squareSize*100) + "%", topLeftCorner.x + squareSize*1.03, (topLeftCorner.y + squareSize + penh.y)/2);

    textAlign(CENTER, TOP);
    text(round(ratio*100) + "%\nP(H|E)", (topLeftCorner.x + topLeftCorner.x + squareSize * ratio)/2, topLeftCorner.y + squareSize * 1.45);
}

function mousePressed() {
    if (dist(mouseX, mouseY, ph.x, ph.y) < c) {
        ph.drag = true;
    } else if (dist(mouseX, mouseY, peh.x, peh.y) < c) {
        peh.drag = true;
    } else if (dist(mouseX, mouseY, penh.x, penh.y) < c) {
        penh.drag = true;
    }
}

function touchStarted() {
    if (dist(touches[0].x, touches[0].y, ph.x, ph.y) < 2*c) {
        ph.drag = true;
    } else if (dist(touches[0].x, touches[0].y, peh.x, peh.y) < 2*c) {
        peh.drag = true;
    } else if (dist(touches[0].x, touches[0].y, penh.x, penh.y) < 2*c) {
        penh.drag = true;
    }
}

function mouseDragged() {
    if (ph.drag) {
        ph.set(middlePoint(topLeftCorner.x, mouseX, topLeftCorner.x + squareSize, ph.y), ph.y);
    } else if (peh.drag) {
        peh.set(peh.x, middlePoint(topLeftCorner.y, mouseY, topLeftCorner.y + squareSize));
    } else if (penh.drag) {
        penh.set(penh.x, middlePoint(topLeftCorner.y, mouseY, topLeftCorner.y + squareSize));
    }

    let a = (ph.x - topLeftCorner.x) * (topLeftCorner.y + squareSize - peh.y);
    let b = (topLeftCorner.x + squareSize - ph.x) * (topLeftCorner.y + squareSize - penh.y);

    ratio = a / (a + b);

    redraw();
}

function touchMoved() {
    if (ph.drag) {
        ph.set(middlePoint(topLeftCorner.x, touches[0].x, topLeftCorner.x + squareSize, ph.y), ph.y);
    } else if (peh.drag) {
        peh.set(peh.x, middlePoint(topLeftCorner.y, touches[0].y, topLeftCorner.y + squareSize));
    } else if (penh.drag) {
        penh.set(penh.x, middlePoint(topLeftCorner.y, touches[0].y, topLeftCorner.y + squareSize));
    }

    let a = (ph.x - topLeftCorner.x) * (topLeftCorner.y + squareSize - peh.y);
    let b = (topLeftCorner.x + squareSize - ph.x) * (topLeftCorner.y + squareSize - penh.y);

    ratio = a / (a + b);

    redraw();
}

function mouseReleased() {
    ph.drag = false;
    peh.drag = false;
    penh.drag = false;
}

function touchEnded() {
    ph.drag = false;
    peh.drag = false;
    penh.drag = false;
}

function middlePoint(a, b, c) {
    let r = (c - a) / 100
    b = round(b/r)*r;
    let ar = [a, b, c].sort((a,b) => a-b)
    return ar[1];
}

function windowResized() {
    size = floor(sort([windowHeight, windowWidth])[0] * 0.99);
    resizeCanvas(windowWidth, windowHeight);

    topLeftCorner = createVector(round(windowWidth/2 - size * 0.2), round(windowHeight/2 - size * 0.2));
    squareSize = round(size * 0.2 * 2);

    c = round(size * 0.01);

    ph = createVector(topLeftCorner.x + squareSize * 0.1, topLeftCorner.y);

    peh = createVector(topLeftCorner.x, topLeftCorner.y + squareSize * 0.6);

    penh = createVector(topLeftCorner.x + squareSize, topLeftCorner.y + squareSize * 0.9);
}