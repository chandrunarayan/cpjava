// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Adapted for Bush School IDMD Class
// Chandru Narayan

// Forces (Gravity and Fluid Resistence) with Vectors

// Demonstration of multiple force acting on bodies (Mover class)
// Bodies experience gravity continuously
// Bodies experience fluid resistance when in "water"

// Five moving bodies
let movers = [];
let maxMovers = 10;

// Liquid
let liquid;

function setup() {
  createCanvas(600, 800);
  reset();
  // Create liquid object
  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);

  createP("click mouse to reset");
}

function draw() {
  background(127);

  // Draw water
  liquid.display();
  //liquid.updateSurface();

  for (let i = 0; i < movers.length; i++) {

    // Is the Mover in the liquid?
    if (liquid.contains(movers[i])) {
      // Calculate drag force
      let dragForce = liquid.calculateDrag(movers[i]);
      // Apply drag force to Mover
      movers[i].applyForce(dragForce);
    }

    // Gravity is scaled by mass here!
    let gravity = createVector(0, 0.1 * movers[i].mass);
    // Apply gravity
    movers[i].applyForce(gravity);

    // Update and display
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }

}


// Not working???
function mousePressed() {
  reset();
}

// Restart all the Mover objects randomly
function reset() {
  for (let i = 0; i < maxMovers; i++) {
    movers[i] = new Mover(40 + i * width/maxMovers, 0, random(0.5, 3));
  }
}