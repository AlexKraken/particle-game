class Particle {
  constructor(initDistance, initAngle, initSize, initSpeed, initColor = 0) {
    this.angle = initAngle
    this.distance = initDistance
    this.radius = initSize / 2
    this.speed = initSpeed

    this.color = initColor

    this.x = this.distance * cos(this.angle)
    this.y = this.distance * sin(this.angle)

    this.collided = false
  }

  display() {
    fill(this.color)
    ellipse(this.x, this.y, this.radius * 2)
  }

  move() {
    if (this.distance > 0) {
      this.distance -= this.speed
      this.x = this.distance * cos(this.angle)
      this.y = this.distance * sin(this.angle)
    }
  }
}

class Player extends Particle {
  move() {
    let scalar = width < height ? width * .33 : height * .33

    this.speed = map(scalar * 4, 1000, 10, 5, 50, true)
    this.angle += this.speed / 360
    this.x = scalar * cos(this.angle)
    this.y = scalar * sin(this.angle)
    this.distance = dist(0, 0, this.x, this.y)
  }
}