void setup() {
  size(256, 256);
}

void draw() {

  for (int i = 0; i < 3; i++) {
    background(255);
    noFill();
    strokeWeight(8);
    color c = color(random(128), random(128), random(128));
    stroke(c);  
    translate(width/2, height/2);
    float x = random(-32, 32);
    float y = random(-32, 32);
    float r = random(24, 72);
    if (i == 0) {
      circle(x, y, r*2);
      saveFrame("data/circle####.png");
    } else if (i == 1) {
      rectMode(CENTER);
      square(x, y, r*2);
      saveFrame("data/square####.png");
    } else if (i == 2) {      
      triangle(x-r, y+r, x, y-r, x+r, y+r);
      saveFrame("data/triangle####.png");
    }
  }
}
