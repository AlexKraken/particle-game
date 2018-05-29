let core, player
let particles = []
let totalParticles = 5
let score = 0
let gameOver = false

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.style('display', 'block')

  core = new Particle(0, 0, 20, 0)
  player = new Player(100, 0, 20, 10, 100)

  noLoop()
}

function draw() {
  background(255)
  translate(width / 2, height / 2)

  line(0, height, 0, -height)
  line(width, 0, -width, 0)

  core.display()

  if (!gameOver) {
    push()
    noFill()
    stroke(255, 0, 0, 100)
    let scalar = width < height ? width * .66 : height * .66
    ellipse(0, 0, scalar)
    pop()

    player.move()
    player.display()
  }

  if (particles.length < totalParticles) {
    let newDistance = (random(100)) + (width > height) ? width : height
    let newAngle = random(0, 2 * PI)
    if (PI / 4 <= newAngle < 3 * PI / 4 || 5 * PI / 4 <= newAngle < 7 * PI / 4) {
      newDistance = height / 2
    } else {
      newDistance = width / 2
    }
    newDistance = abs(mapCircleToRectangle(newAngle, newDistance))
    let newSize = 10
    let newSpeed = 2

    particles.push(new Particle(newDistance, newAngle, newSize, newSpeed))
  }

  for (var i = 0; i < particles.length; i++) {
    if (!particles[i].collided) {
      particles[i].display()
      particles[i].move()
    }

    if (particles[i].distance <= particles[i].radius + core.radius && !particles[i].collided) {
      core.radius += 1
      particles[i].collided = true
    }

    if (dist(particles[i].x, particles[i].y, player.x, player.y) <= particles[i].radius + player.radius && !particles[i].collided) {
      player.radius += 1
      player.speed *= -1
      particles[i].collided = true
      score++
    }
  }

  for (var i = 0; i < particles.length; i++) {
    if (particles[i].collided) {
      particles.splice(i, 1)
    }
  }


  if (!gameOver && frameCount % 250 == 0) {
    totalParticles++
  } else if (gameOver) {
    totalParticles = 100
  }

  push()
  fill(255)
  textAlign(CENTER, CENTER)
  text(score, 0, 0)
  pop()

  if (!gameOver && player.distance <= player.radius + core.radius) {
    gameOver = true
    loop()
  } else if (gameOver) {
    core.radius += 1
  }

  if (core.radius > height) {
    noLoop()
  }
}

function mapCircleToRectangle(theta, side) {
  if (PI / 4 <= theta < 3 * PI / 4 || 5 * PI / 4 <= theta < 7 * PI / 4) {
    return side / sin(theta)
  } else {
    return side / cos(theta)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}